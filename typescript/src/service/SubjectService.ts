import { Subject } from "../models";
import { isNewValue } from "../utils";

export interface StudentCreated { 
	subject: Subject; 
	created: boolean;
}

export class SubjectService {
	public async createSubject(name: string, code: string): Promise<StudentCreated> {
		const [subject, created] = await Subject.findOrCreate({
			where: { code },
			defaults: {
				name,
			}
		});
		return { subject, created };
	}

	public async updateSubject(name: string, code: string): Promise<number> {
		const [updatedRows, subject] = await Subject.update({ name }, { where: { code } });
		return updatedRows;
	}

	public async updateOrCreateSubject(subjectName: string, subjectCode: string) {
		const subjectRes = await this.createSubject(subjectName, subjectCode);

		if (!subjectRes.created && isNewValue(subjectName, "code", subjectRes.subject)) {
			await this.updateSubject(subjectName, subjectCode)
		}
		return subjectRes;
	}
}