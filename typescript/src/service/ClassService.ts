import { Class } from "../models";

export class ClassService {
	public async createClass(name: string, code: string): Promise<{ classModel: Class, created: boolean }> {
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

}
