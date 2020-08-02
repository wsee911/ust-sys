import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { Teacher } from './TeacherModel';
import { Student } from './StudentModel';
import { Class } from './ClassModel';
import { Subject } from './SubjectModel';

export interface ClassroomAttr {
    teacherId: number;
    studentId: number;
}

export class Classroom extends Model {
    public teacherId!: number;
    public studentId!: number;
    public classId!: number;
    public subjectId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Classroom.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  teacherId: {
    type: DataTypes.INTEGER,
    references: {
      model: Teacher,
      key: 'id'
    }
  },
  studentId: {
    type: DataTypes.INTEGER,
    references: {
        model: Student,
        key: 'id'
      }
  },
  classId: {
    type: DataTypes.INTEGER,
    references: {
        model: Class,
        key: 'id'
      }
  },
  subjectId: {
    type: DataTypes.INTEGER,
    references: {
        model: Subject,
        key: 'id'
      }
  }
}, { sequelize, modelName: 'classroom', tableName: 'classroom', freezeTableName: true });

Class.belongsToMany(Student, {through: Classroom, foreignKey: 'classId'});
Class.belongsToMany(Subject, {through: Classroom, foreignKey: 'classId'});
Class.belongsToMany(Teacher, {through: Classroom, foreignKey: 'classId'});

Student.belongsToMany(Class, {through: Classroom, foreignKey: 'studentId'});
Subject.belongsToMany(Class, {through: Classroom, foreignKey: 'subjectId'});
Teacher.belongsToMany(Class, {through: Classroom, foreignKey: 'teacherId'});