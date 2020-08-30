import { Teacher } from "../models";
import { isNewValue } from "../utils";

export interface TeacherCreated { 
	teacher: Teacher; 
	created: boolean;
}

export class TeacherService {
	public async createTeacher(name: string, email: string): Promise<TeacherCreated> {
		const [teacher, created] = await Teacher.findOrCreate({
			where: { email },
			defaults: {
				name,
			}
		});
		return { teacher, created };
	}

	public async updateTeacher(name: string, email: string): Promise<number> {
		const [updatedRows] = await Teacher.update({ name }, { where: { email } });

		return updatedRows;
	}

	public async updateOrCreateTeacher(teacherName: string, teacherEmail: string) {
		const teacherRes = await this.createTeacher(teacherName, teacherEmail);

		if (!teacherRes.created && isNewValue(teacherName, "name", teacherRes.teacher)) {
			await this.updateTeacher(teacherName, teacherEmail)
		}
		return teacherRes;
	}

}