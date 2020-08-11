import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { Teacher } from '.';

export interface ClassAttr {
    name: string;
    code: string;
}

export class Class extends Model {
    public name!: string;
    public code!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Class.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  }
}, { sequelize, modelName: 'class', freezeTableName: true, timestamps: true });
