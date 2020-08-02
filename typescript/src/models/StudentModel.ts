import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { TeacherModel } from './TeacherModel';
import { ClassroomModel } from './ClassroomModel';
import { SubjectModel } from './SubjectModel';
import { ClassModel } from './ClassModel';

export interface StudentAttr {
    name: string;
    email: string;
}

export class StudentModel extends Model {
    public name!: string;
    public email!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

StudentModel.init({
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
}, { sequelize, modelName: 'student', tableName: 'student', freezeTableName: true, timestamps: true });


