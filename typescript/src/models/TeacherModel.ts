import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export interface TeacherAttr {
    name: string;
    email: string;
}

export class Teacher extends Model {
    public name!: string;
    public email!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Teacher.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  }
}, { sequelize, modelName: 'teacher', freezeTableName: true, timestamps: true });

