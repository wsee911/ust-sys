import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export interface SubjectAttr {
  id: number;
  name: string;
  code: string;
}

export class Subject extends Model {
  public id: number;
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
    allowNull: false,
    unique: true,
  }
}, { sequelize, modelName: 'subject', freezeTableName: true, timestamps: true });
