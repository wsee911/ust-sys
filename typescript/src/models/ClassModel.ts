import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { TeacherModel } from './TeacherModel';
import { ClassroomModel } from './ClassroomModel';
import { StudentModel } from './StudentModel';
import { SubjectModel } from './SubjectModel';

export interface ClassAttr {
    name: string;
    code: string;
}

export class ClassModel extends Model {
    public name!: string;
    public code!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ClassModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { sequelize, modelName: 'class', tableName: 'class', freezeTableName: true, timestamps: true });