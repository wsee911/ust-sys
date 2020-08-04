import { Student } from "../models";

export class StudentService {
	public async createStudent(name: string, email: string): Promise<{ student: Student, created: boolean }> {
		const [student, created] = await Student.findOrCreate({
			where: { email },
			defaults: {
				name,
			}
		});
		return { student, created };
	}

	public async updateStudent(name: string, email: string): Promise<Student[]> {
		const [updatedRows, student] = await Student.update({ name }, { where: { email } });
		return student;
	}

}