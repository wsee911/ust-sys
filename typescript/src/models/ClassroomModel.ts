import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { TeacherModel } from './TeacherModel';
import { StudentModel } from './StudentModel';
import { ClassModel } from './ClassModel';
import { SubjectModel } from './SubjectModel';

export interface ClassroomAttr {
    teacherId: number;
    studentId: number;
}

export class ClassroomModel extends Model {
    public teacherId!: number;
    public studentId!: number;
    public classId!: number;
    public subjectId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ClassroomModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
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
  },
  classId: {
    type: DataTypes.INTEGER,
    references: {
        model: ClassModel,
        key: 'id'
      }
  },
  subjectId: {
    type: DataTypes.INTEGER,
    references: {
        model: SubjectModel,
        key: 'id'
      }
  }
}, { sequelize, modelName: 'classroom', tableName: 'classroom', freezeTableName: true });

TeacherModel.belongsToMany(StudentModel, {through: ClassroomModel, foreignKey: 'teacherId'});
TeacherModel.belongsToMany(SubjectModel, {through: ClassroomModel, foreignKey: 'teacherId'});
TeacherModel.belongsToMany(ClassModel, {through: ClassroomModel, foreignKey: 'teacherId'});

StudentModel.belongsToMany(TeacherModel, {through: ClassroomModel, foreignKey: 'studentId'});
SubjectModel.belongsToMany(TeacherModel, {through: ClassroomModel, foreignKey: 'subjectId'});
ClassModel.belongsToMany(TeacherModel, {through: ClassroomModel, foreignKey: 'classId'});