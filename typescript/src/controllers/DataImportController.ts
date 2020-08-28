import Express, { RequestHandler } from 'express';
import { NO_CONTENT } from 'http-status-codes';
import Logger from '../config/logger';
import upload from '../config/multer';
import { TeacherStudent, Workload } from '../models';
import { ClassService, StudentService, SubjectService, TeacherService } from '../service';
import { convertCsvToJson, isNewValue } from '../utils';

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

		for (const val of data) {
			if (val.toDelete === "1") {
				const teacherStudentQuery = {
					where: {
						teacherEmail: val.teacherEmail,
						studentEmail: val.studentEmail
					}
				}
				const teacherStudent = await TeacherStudent.findOne(teacherStudentQuery);
				console.log(teacherStudent);
				if (teacherStudent !== null) {
					await TeacherStudent.destroy(teacherStudentQuery);
				}
				continue;
			}
			const subjectRes = await subjectService.createSubject(val.subjectName, val.subjectCode);

			if (!subjectRes.created && isNewValue(val.subjectName, "code", subjectRes.subject)) {
				await subjectService.updateSubject(val.subjectName, val.subjectCode)
			}
			const classRes = await classService.createClass(val.className, val.classCode);

			if (!classRes.created && isNewValue(val.className, "code", classRes.classModel)) {
				await classService.updateClass(val.className, val.classCode)
			}
			const teacherRes = await teacherService.createTeacher(val.teacherName, val.teacherEmail);

			if (!teacherRes.created && isNewValue(val.teacherName, "name", teacherRes.teacher)) {
				await teacherService.updateTeacher(val.teacherName, val.teacherEmail)
			}
			const studentRes = await studentService.createStudent(val.studentName, val.studentEmail, val.classCode);

			if (!studentRes.created && isNewValue(val.studentName, "name", studentRes.student)) {
				await studentService.updateStudent(val.studentName, val.studentEmail)
			}
			if (!studentRes.created && isNewValue(val.classCode, "classCode", studentRes.student)) {
				await studentService.updateStudentClass(val.classCode, val.studentEmail)
			}

			await TeacherStudent.findOrCreate({
				where: {
					teacherId: teacherRes.teacher.getDataValue('id'),
					studentId: studentRes.student.getDataValue('id'),
				}
			});

			await Workload.findOrCreate({
				where: {
					teacherId: teacherRes.teacher.getDataValue('id'),
					subjectId: subjectRes.subject.getDataValue('id'),
					classId: classRes.classModel.getDataValue('id'),
				}
			});
		};

	} catch (err) {
		// LOG.error(err)
		console.log(">>>>>>", err)
		return next(err);
	}

	return res.sendStatus(NO_CONTENT);
}

DataImportController.post('/upload', upload.single('data'), dataImportHandler);

export default DataImportController;
