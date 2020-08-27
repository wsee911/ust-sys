import Express, { RequestHandler } from 'express';
import { CREATED } from 'http-status-codes';
import Logger from '../config/logger';
import { TeacherSubject, Subject, Class, Teacher } from '../models';
import { fn, col, QueryTypes } from 'sequelize';
import { group } from 'console';
import sequelize from '../config/database';

const WorkloadReportController = Express.Router();
const LOG = new Logger('UpdateClassNameController.js');

interface workloadDBResult {
    teacherId: number;
    subjectId: number;
    classCount: number;
    subjectName: string;
    subjectCode: string;
    teacherName: string;
}

interface workload {
    [key: string]: workloadReport[];
}

interface workloadReport {
    classCount: number;
    subjectName: string;
    subjectCode: string;
}

const getWorkloadReportHandler: RequestHandler = async (req, res, next) => {
    const teachers = await sequelize.query(
        "SELECT `TeacherSubject`.`teacherId`, `TeacherSubject`.`subjectId`, COUNT(`TeacherSubject`.`classId`) AS `classCount`, `subject`.`name` AS `subjectName`, `subject`.`code` AS `subjectCode`, `teacher`.`name` AS `teacherName` FROM `TeacherSubject` LEFT OUTER JOIN `subject` ON `TeacherSubject`.`subjectId` = `subject`.`id` LEFT OUTER JOIN `teacher` ON `TeacherSubject`.`teacherId` = `teacher`.`id` LEFT OUTER JOIN `class` ON `TeacherSubject`.`classId` = `class`.`id` GROUP BY `TeacherSubject`.`teacherId`, `TeacherSubject`.`subjectId`",
        { type: QueryTypes.SELECT }
    ) as workloadDBResult[];

    let workload = {} as workload;
    teachers.map((teacher) => {
        const { teacherName, subjectName, subjectCode, classCount } = teacher;
        if (!!!workload[teacherName]) {
            workload[teacherName] = [];
        }
        workload[teacherName].push({
            classCount,
            subjectName,
            subjectCode,
        });
    });
    res.send(workload);
}

WorkloadReportController.get('/reports/workload', getWorkloadReportHandler);

export default WorkloadReportController;