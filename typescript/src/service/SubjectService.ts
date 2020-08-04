import { Subject } from "../models";

export class SubjectService {
	public async createSubject(name: string, code: string): Promise<{ subject: Subject, created: boolean }> {
		const [subject, created] = await Subject.findOrCreate({
			where: { code },
			defaults: {
				name,
			}
		});
		return { subject, created };
	}

	public async updateSubject(name: string, code: string): Promise<Subject[]> {
		const [updatedRows, subject] = await Subject.update({ name }, { where: { code } });
		return subject;
	}

}