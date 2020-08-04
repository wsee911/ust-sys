import Express, { RequestHandler } from 'express';
import { NO_CONTENT } from 'http-status-codes';
import Logger from '../config/logger';
import upload from '../config/multer';
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

		data.map(async (val) => {
			const teacherRes = await teacherService.createTeacher(val.teacherName, val.teacherEmail);

			if (!teacherRes.created && isNewValue(val.teacherName, teacherRes.teacher)) {
				teacherService.updateTeacher(val.teacherName, val.teacherEmail)
			}
			const studentRes = await studentService.createStudent(val.studentName, val.studentEmail);

			if (!studentRes.created && isNewValue(val.studentName, studentRes.student)) {
				studentService.updateStudent(val.studentName, val.studentEmail)
			}
			const subjectRes = await subjectService.createSubject(val.subjectName, val.subjectCode);

			if (!subjectRes.created && isNewValue(val.subjectName, subjectRes.subject)) {
				subjectService.updateSubject(val.subjectName, val.subjectCode)
			}
			const classRes = await classService.createClass(val.className, val.classCode);

			if (!classRes.created && isNewValue(val.className, classRes.classModel)) {
				classService.updateClass(val.className, val.classCode)
			}

			// await Classroom.create({
			//   teacherEmail: teacherModel.getDataValue('email'),
			//   studentEmail: studentModel.getDataValue('email'),
			//   classCode: classModel.getDataValue('code'),
			//   subjectCode: subjectModel.getDataValue('code')
			// })

		})

	} catch (err) {
		LOG.error(err)
		return next(err);
	}

	return res.sendStatus(NO_CONTENT);
}

DataImportController.post('/upload', upload.single('data'), dataImportHandler);

export default DataImportController;
