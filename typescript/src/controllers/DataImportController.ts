import Express, { RequestHandler } from 'express';
import { NO_CONTENT } from 'http-status-codes';
import Logger from '../config/logger';
import upload from '../config/multer';
import { ClassService, StudentService, SubjectService, TeacherService } from '../service';
import { convertCsvToJson, isNewValue } from '../utils';
import { TeacherClass, TeacherStudent, TeacherSubject } from '../models';
import sequelize from '../config/database';

const DataImportController = Express.Router();
const LOG = new Logger('DataImportController.js');

// TODO: Please implement Question 1 requirement here
const dataImportHandler: RequestHandler = async (req, res, next) => {
	const { file } = req;
	const teacherService = new TeacherService();
	const studentService = new StudentService();
	const subjectService = new SubjectService();
	const classService = new ClassService();


	try {
		const data = await convertCsvToJson(file.path);
		LOG.info(JSON.stringify(data, null, 2));

		data.map(async (val) => {
			const teacherRes = await teacherService.createTeacher(val.teacherName, val.teacherEmail);

			if (!teacherRes.created && isNewValue(val.teacherName, teacherRes.teacher)) {
				await teacherService.updateTeacher(val.teacherName, val.teacherEmail)
			}
			const studentRes = await studentService.createStudent(val.studentName, val.studentEmail);

			if (!studentRes.created && isNewValue(val.studentName, studentRes.student)) {
				await studentService.updateStudent(val.studentName, val.studentEmail)
			}
			const subjectRes = await subjectService.createSubject(val.subjectName, val.subjectCode);

			if (!subjectRes.created && isNewValue(val.subjectName, subjectRes.subject)) {
				await subjectService.updateSubject(val.subjectName, val.subjectCode)
			}
			const classRes = await classService.createClass(val.className, val.classCode);

			if (!classRes.created && isNewValue(val.className, classRes.classModel)) {
				await classService.updateClass(val.className, val.classCode)
			}

			await TeacherStudent.findOrCreate({
				where: {
					teacherEmail: teacherRes.teacher.getDataValue('email'),
					studentEmail: studentRes.student.getDataValue('email'),
				}
			});

			await TeacherClass.findOrCreate({
				where: {
					teacherEmail: teacherRes.teacher.getDataValue('email'),
					classCode: classRes.classModel.getDataValue('code'),
				}
			});
			await TeacherSubject.findOrCreate({
				where: {
					teacherEmail: teacherRes.teacher.getDataValue('email'),
					subjectCode: subjectRes.subject.getDataValue('code'),
				}
			});
		});

	} catch (err) {
		// LOG.error(err)
		console.log(">>>>>>", err)
		return next(err);
	}

	console.log("test", await TeacherClass.findOne({ where: { teacherEmail: 'teacher1@gmail.com' } }))

	return res.sendStatus(NO_CONTENT);
}

DataImportController.post('/upload', upload.single('data'), dataImportHandler);

export default DataImportController;
