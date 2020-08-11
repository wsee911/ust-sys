import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { Teacher } from '.';

export interface StudentAttr {
		name: string;
		email: string;
}

export class Student extends Model {
		public name!: string;
		public email!: string;

		public readonly createdAt!: Date;
		public readonly updatedAt!: Date;
}

Student.init({
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true,
	}
}, { sequelize, modelName: 'student', freezeTableName: true, timestamps: true });
