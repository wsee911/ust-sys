import { TeacherStudent, Teacher, Student } from "../models";
import { Model } from "sequelize/types";


export class TeacherStudentService {

    public async deleteTeacherStudentRelationship(teacherEmail: string, studentEmail: string) {
        const teacherStudentQuery = {
            where: {
                teacherEmail,
                studentEmail
            }
        }
        const teacherStudent = await TeacherStudent.findOne(teacherStudentQuery);
        if (teacherStudent !== null) {
            await TeacherStudent.destroy(teacherStudentQuery);
        }
    }

    public async createTeacherStudentRelationship(teacher: Teacher, student: Student) {
        await TeacherStudent.findOrCreate({
            where: {
                teacherId: teacher.getDataValue('id'),
                studentId: student.getDataValue('id'),
            }
        });
    }
}