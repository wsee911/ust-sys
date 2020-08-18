import { Student } from "../models";

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

	public async fetchStudentList(classCode: string): Promise<Student[]> {
		const students = await Student.findAll({ where: { classCode }, attributes: ["id", "name", "email"] });
		return students;
	}
}