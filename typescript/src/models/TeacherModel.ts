import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { Class } from './ClassModel';
import { Subject } from './SubjectModel';
import { Classroom } from './ClassroomModel';

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
}, { sequelize, modelName: 'teacher', freezeTableName: true, timestamps: true });

