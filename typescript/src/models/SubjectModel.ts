import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { Classroom } from './ClassroomModel';
import { Class } from './ClassModel';

export interface SubjectAttr {
    name: string;
    code: string;
}

export class Subject extends Model {
    public name!: string;
    public code!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Subject.init({
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
}, { sequelize, modelName: 'subject', freezeTableName: true, timestamps: true });
