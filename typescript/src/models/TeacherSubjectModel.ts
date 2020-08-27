import { DataTypes, Model } from 'sequelize';
import { Subject, Teacher, Class } from '.';
import sequelize from '../config/database';

export interface TeacherSubjectAttr {
    teacherId: string;
    subjectId: string;
}

export class TeacherSubject extends Model {
    public teacherId!: string;
    public subjectId!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

TeacherSubject.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }
}, { sequelize, modelName: 'TeacherSubject', freezeTableName: true, timestamps: true });

Teacher.belongsToMany(Subject, { through: { model: 'TeacherSubject', unique: false } });
Subject.belongsToMany(Teacher, { through: { model: 'TeacherSubject', unique: false } });

Teacher.hasMany(TeacherSubject);
TeacherSubject.belongsTo(Teacher);

Subject.hasMany(TeacherSubject);
TeacherSubject.belongsTo(Subject);

Class.hasMany(TeacherSubject);
TeacherSubject.belongsTo(Class);