import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { Class } from './ClassModel';

export interface StudentAttr {
	id: number;
	name: string;
	email: string;
}

export class Student extends Model {
	public id: number;
	public name!: string;
	public email!: string;
	public classCode: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Student.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	}
}, { sequelize, modelName: 'student', freezeTableName: true, timestamps: true });

Class.hasMany(Student, { foreignKey: "classCode", sourceKey: "code" });