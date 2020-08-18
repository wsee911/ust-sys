import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export interface ClassAttr {
  id: number;
  name: string;
  code: string;
}

export class Class extends Model {
  public id: number;
  public name!: string;
  public code!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Class.init({
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
    unique: true
  }
}, { sequelize, modelName: 'class', freezeTableName: true, timestamps: true });
