import { StudentResponse } from "StudentList";
import { fetchExternalStudentList } from "../api/externalStudentList";
import { Student } from "../models";
import { dynamicSort, isNewValue } from "../utils";

export interface StudentCreated {
	student: Student;
	created: boolean;
}
export class StudentService {
	public async createStudent(name: string, email: string, classCode: string): Promise<StudentCreated> {
		const [student, created] = await Student.findOrCreate({
			where: { email },
			defaults: {
				name,
				classCode,
			}
		});
		return { student, created };
	}

	public async updateStudent(name: string, email: string): Promise<number> {
		const [updatedRows, student] = await Student.update({ name }, { where: { email } });
		return updatedRows;
	}

	public async updateStudentClass(classCode: string, email: string): Promise<number> {
		const [updatedRows, student] = await Student.update({ classCode }, { where: { email } });
		return updatedRows;
	}

	public async updateOrCreateStudent(studentName: string, studentEmail: string, classCode: string) {
		const studentRes = await this.createStudent(studentName, studentEmail, classCode);

		if (!studentRes.created && isNewValue(studentName, "name", studentRes.student)) {
			await this.updateStudent(studentName, studentEmail)
		}
		if (!studentRes.created && isNewValue(classCode, "classCode", studentRes.student)) {
			await this.updateStudentClass(classCode, studentEmail)
		}
		return studentRes;
	}

	public async fetchStudentList(classCode: string, offset: number, limit: number): Promise<{ count: number, students: StudentResponse[] }> {
		const { students } = await fetchExternalStudentList(classCode);
		const internalStudents = await Student.findAll({ where: { classCode }, attributes: ["id", "name", "email"] });

		const mergeStudentList = students.concat(internalStudents.map(s => (s.get())));
		const sortedStudentList = mergeStudentList.sort(dynamicSort("name", "asc"))
			.slice(offset, limit);

		return {
			count: mergeStudentList.length,
			students: sortedStudentList
		};
	}
}