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

Class.belongsToMany(Student, {through: Classroom, foreignKey: 'classCode'});
Class.belongsToMany(Teacher, {through: Classroom, foreignKey: 'classCode'});
Class.belongsToMany(Subject, {through: Classroom, foreignKey: 'classCode'});

Student.belongsToMany(Class, {through: Classroom, foreignKey: 'studentEmail'});
Student.belongsToMany(Teacher, {through: Classroom, foreignKey: 'studentEmail'});
Student.belongsToMany(Subject, {through: Classroom, foreignKey: 'studentEmail'});

Teacher.belongsToMany(Class, {through: Classroom, foreignKey: 'teacherEmail'});
Teacher.belongsToMany(Subject, {through: Classroom, foreignKey: 'teacherEmail'});
Teacher.belongsToMany(Student, {through: Classroom, foreignKey: 'teacherEmail'});

Subject.belongsToMany(Class, {through: Classroom, foreignKey: 'subjectCode'});
Subject.belongsToMany(Student, {through: Classroom, foreignKey: 'subjectCode'});
Subject.belongsToMany(Teacher, {through: Classroom, foreignKey: 'subjectCode'});

Class.hasMany(Classroom);
Subject.hasMany(Classroom);
Student.hasMany(Classroom);
Teacher.hasMany(Classroom);

Classroom.belongsTo(Class);
Classroom.belongsTo(Subject);
Classroom.belongsTo(Student);
Classroom.belongsTo(Teacher);