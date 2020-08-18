import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export interface TeacherAttr {
  id: number;
  name: string;
  email: string;
}

export class Teacher extends Model {
  public id: number;
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
    allowNull: false,
    unique: true,
  }
}, { sequelize, modelName: 'teacher', freezeTableName: true, timestamps: true });
