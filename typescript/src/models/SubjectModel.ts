import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

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
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  }
}, { sequelize, modelName: 'subject', freezeTableName: true, timestamps: true });
