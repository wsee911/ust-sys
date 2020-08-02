import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { TeacherModel } from './TeacherModel';
import { ClassroomModel } from './ClassroomModel';
import { StudentModel } from './StudentModel';
import { ClassModel } from './ClassModel';

export interface SubjectAttr {
    name: string;
    code: string;
}

export class SubjectModel extends Model {
    public name!: string;
    public code!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

SubjectModel.init({
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
}, { sequelize, modelName: 'subject', tableName: 'subject', freezeTableName: true, timestamps: true });

