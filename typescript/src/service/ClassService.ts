import { Class } from "../models";
import { isNewValue } from "../utils";

export interface ClassCreated { 
	classModel: Class; 
	created: boolean;
}
export class ClassService {
	public async createClass(name: string, code: string): Promise<ClassCreated> {
		const [classModel, created] = await Class.findOrCreate({
			where: { code },
			defaults: {
				name,
			}
		});
		return { classModel, created };
	}

	public async updateClass(name: string, code: string): Promise<number> {
		const [updatedRows] = await Class.update({ name }, { where: { code } });
		return updatedRows;
	}

	public async updateOrCreateClass(className: string, classCode: string) {
		const classRes = await this.createClass(className, classCode);

		if (!classRes.created && isNewValue(className, "code", classRes.classModel)) {
			await this.updateClass(className, classCode)
		}
		return classRes;
	}
}
