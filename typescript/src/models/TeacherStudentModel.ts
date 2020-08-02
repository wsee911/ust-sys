import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { TeacherModel } from './TeacherModel';
import { StudentModel } from './StudentModel';

export interface TeacherStudentAttr {
    teacherId: number;
    studentId: number;
}

export class TeacherStudentModel extends Model {
    public teacherId!: number;
    public studentId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

TeacherStudentModel.init({
    teacherId: {
    type: DataTypes.INTEGER,
    references: {
      model: TeacherModel,
      key: 'id'
    }
  },
  studentId: {
    type: DataTypes.INTEGER,
    references: {
        model: StudentModel,
        key: 'id'
      }
  }
}, { sequelize, tableName: 'teacherstudent', freezeTableName: true });
