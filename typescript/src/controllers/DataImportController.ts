import Express, { RequestHandler } from 'express';
import { CREATED, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import Logger from '../config/logger';
import upload from '../config/multer';
import { ClassService, StudentService, SubjectService, TeacherService, TeacherStudentService, WorkloadService } from '../service';
import { convertCsvToJson } from '../utils';


const DataImportController = Express.Router();
const LOG = new Logger('DataImportController.js');

// TODO: Please implement Question 1 requirement here
const dataImportHandler: RequestHandler = async (req, res, next) => {
	const { file } = req;

	const teacherService = new TeacherService();
	const studentService = new StudentService();
	const subjectService = new SubjectService();
	const classService = new ClassService();
	const teacherStudentService = new TeacherStudentService();
	const workloadService = new WorkloadService();


	try {
		const data = await convertCsvToJson(file.path);
		LOG.info(JSON.stringify(data, null, 2));

		for (const val of data) {
			if (val.toDelete === "1") {
				await teacherStudentService.deleteTeacherStudentRelationship(val.teacherEmail, val.studentEmail);
				continue;
			}
			const subjectRes = await subjectService.updateOrCreateSubject(val.subjectName, val.subjectCode);
			const classRes = await classService.updateOrCreateClass(val.className, val.classCode);
			const teacherRes = await teacherService.updateOrCreateTeacher(val.teacherName, val.teacherEmail);
			const studentRes = await studentService.updateOrCreateStudent(val.studentName, val.studentEmail, val.classCode);

			await teacherStudentService.createTeacherStudentRelationship(teacherRes.teacher, studentRes.student);

			await workloadService.createWorkload(teacherRes.teacher, subjectRes.subject, classRes.classModel);
		};

	} catch (err) {
		LOG.error(err)
		return res.sendStatus(INTERNAL_SERVER_ERROR);
	}

	return res.sendStatus(CREATED);
}

DataImportController.post('/upload', upload.single('data'), dataImportHandler);

export default DataImportController;
