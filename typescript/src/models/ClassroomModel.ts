import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { Teacher } from './TeacherModel';
import { Student } from './StudentModel';
import { Class } from './ClassModel';
import { Subject } from './SubjectModel';

export interface ClassroomAttr {
  teacherId: String;
  studentId: String;
  classCode: String;
  subjectCode: String;
}

export class Classroom extends Model {
    public teacherId!: String;
    public studentId!: String;
    public classCode!: String;
    public subjectCode!: String;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Classroom.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  teacherEmail: {
    type: DataTypes.STRING,
    references: {
      model: Teacher,
      key: 'email'
    }
  },
  studentEmail: {
    type: DataTypes.STRING,
    references: {
        model: Student,
        key: 'email'
      }
  },
  classCode: {
    type: DataTypes.STRING,
    references: {
        model: Class,
        key: 'code'
      }
  },
  subjectCode: {
    type: DataTypes.STRING,
    references: {
        model: Subject,
        key: 'code'
      }
  }
}, { sequelize, modelName: 'classroom', tableName: 'classroom', freezeTableName: true });
