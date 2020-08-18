import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { Teacher, Student, Class } from '.';

export interface TeacherStudentAttr {
    teacherEmail: string;
    studentEmail: string;
}

export class TeacherStudent extends Model {
    public teacherEmail!: string;
    public studentEmail!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

TeacherStudent.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    teacherEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    studentEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    }
}, { sequelize, modelName: 'TeacherStudent', freezeTableName: true, timestamps: true });

Teacher.belongsToMany(Student, { through: 'TeacherStudent' });
Student.belongsToMany(Teacher, { through: 'TeacherStudent' });


Student.hasMany(TeacherStudent);
TeacherStudent.belongsTo(Student);

Teacher.hasMany(TeacherStudent);
TeacherStudent.belongsTo(Teacher);

Class.hasMany(Student, { foreignKey: "classCode", sourceKey: "code" });