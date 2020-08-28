import { Student } from "../models";
import { fetchExternalStudentList } from "../api/externalStudentList";
import { dynamicSort } from "../utils";
import { StudentResponse } from "StudentList";

export class StudentService {
	public async createStudent(name: string, email: string, classCode: string): Promise<{ student: Student, created: boolean }> {
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

	public async fetchStudentList(classCode: string, offset: number, limit: number): Promise<{count: number, students: StudentResponse[]}> {
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