import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { StudentModel } from './StudentModel';
import { ClassroomModel } from './ClassroomModel';
import { SubjectModel } from './SubjectModel';
import { ClassModel } from './ClassModel';

export interface TeacherAttr {
    name: string;
    email: string;
}

export class TeacherModel extends Model {
    public name!: string;
    public email!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

TeacherModel.init({
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
    allowNull: false
  }
}, { sequelize, modelName: 'teacher', tableName: 'teacher', freezeTableName: true, timestamps: true });
