import { Teacher } from "../models";

export class TeacherService {
	public async createTeacher(name: string, email: string): Promise<{ teacher: Teacher, created: boolean }> {
		const [teacher, created] = await Teacher.findOrCreate({
			where: { email },
			defaults: {
				name,
			}
		});
		return { teacher, created };
	}

	public async updateTeacher(name: string, email: string): Promise<Teacher[]> {
		const [updatedRows, teacher] = await Teacher.update({ name }, { where: { email } });
		return teacher;
	}

}