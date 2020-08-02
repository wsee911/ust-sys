import Express, { RequestHandler } from 'express';
import { NO_CONTENT } from 'http-status-codes';
import Logger from '../config/logger';
import upload from '../config/multer';
import { convertCsvToJson } from '../utils';
import { TeacherModel } from '../models/TeacherModel';
import { StudentModel } from '../models/StudentModel';
import { ClassModel } from '../models/ClassModel';
import { SubjectModel } from '../models/SubjectModel';
import { ClassroomModel } from '../models/ClassroomModel';

const DataImportController = Express.Router();
const LOG = new Logger('DataImportController.js');

// TODO: Please implement Question 1 requirement here
const dataImportHandler: RequestHandler = async (req, res, next) => {
  const { file } = req;

  try {
    const data = await convertCsvToJson(file.path);
    LOG.info(JSON.stringify(data, null, 2));
    data.map((val) => {
      TeacherModel.create({
        name: val.teacherName,
        email: val.teacherEmail
      })
      StudentModel.create({
        name: val.studentName,
        email: val.studentEmail
      })
      ClassModel.create({
        name: val.classname,
        code: val.classCode
      })
      SubjectModel.create({
        name: val.subjectName,
        code: val.subjectCode
      })
    })
  } catch (err) {
    LOG.error(err)
    return next(err);
  }

  return res.sendStatus(NO_CONTENT);
}

DataImportController.post('/upload', upload.single('data'), dataImportHandler);

export default DataImportController;
