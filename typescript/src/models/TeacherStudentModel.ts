import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { Teacher, Student } from '.';

export interface TeacherStudentAttr {
    teacherId: number;
    studentId: number;
}

export class TeacherStudent extends Model {
    public teacherId!: number;
    public studentId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

TeacherStudent.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }
}, { sequelize, modelName: 'TeacherStudent', freezeTableName: true, timestamps: true });

Teacher.belongsToMany(Student, { through: 'TeacherStudent' });
Student.belongsToMany(Teacher, { through: 'TeacherStudent' });


Student.hasMany(TeacherStudent);
TeacherStudent.belongsTo(Student);

Teacher.hasMany(TeacherStudent);
TeacherStudent.belongsTo(Teacher);