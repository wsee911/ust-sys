import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { Teacher, Subject } from '.';

export interface TeacherSubjectAttr {
    teacherEmail: string;
    subjectCode: string;
}

export class TeacherSubject extends Model {
    public teacherEmail!: string;
    public subjectCode!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

TeacherSubject.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    teacherEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subjectCode: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    }
}, { sequelize, modelName: 'TeacherSubject', freezeTableName: true, timestamps: true });

Teacher.belongsToMany(Subject, { through: 'TeacherSubject' });
Subject.belongsToMany(Teacher, { through: 'TeacherSubject' });

Teacher.hasMany(TeacherSubject);
TeacherSubject.belongsTo(Teacher);

Subject.hasMany(TeacherSubject);
TeacherSubject.belongsTo(Subject);