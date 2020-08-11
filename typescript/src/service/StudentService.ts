import { Student } from "../models";
import { Transaction } from "sequelize/types";

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

	public async updateStudent(name: string, email: string): Promise<number> {
		const [updatedRows, student] = await Student.update({ name }, { where: { email } });
		return updatedRows;
	}

}