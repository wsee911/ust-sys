import sequelize from "../config/database";
import { QueryTypes } from "sequelize";
import { WorkloadDBResult, WorkloadReports } from "Workload";

export class WorkloadService {
    public async fetchWorkload() {
        const teachers = await sequelize.query(
            "SELECT `Workload`.`teacherId`, `Workload`.`subjectId`, COUNT(`Workload`.`classId`) AS `classCount`, `subject`.`name` AS `subjectName`, `subject`.`code` AS `subjectCode`, `teacher`.`name` AS `teacherName` FROM `Workload` LEFT OUTER JOIN `subject` ON `Workload`.`subjectId` = `subject`.`id` LEFT OUTER JOIN `teacher` ON `Workload`.`teacherId` = `teacher`.`id` LEFT OUTER JOIN `class` ON `Workload`.`classId` = `class`.`id` GROUP BY `Workload`.`teacherId`, `Workload`.`subjectId`",
            { type: QueryTypes.SELECT }
        ) as WorkloadDBResult[];

        let workload = {} as WorkloadReports;
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
        return workload;
    }

}