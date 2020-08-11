import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { Teacher, Class } from '.';

export interface TeacherClassAttr {
    teacherEmail: string;
    classCode: string;
}

export class TeacherClass extends Model {
    public teacherEmail!: string;
    public classCode!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

TeacherClass.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    teacherEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    classCode: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    }
}, { sequelize, modelName: 'TeacherClass', freezeTableName: true, timestamps: true });

Teacher.belongsToMany(Class, { through: 'TeacherClass' });
Class.belongsToMany(Teacher, { through: 'TeacherClass' });

Class.hasMany(TeacherClass);
TeacherClass.belongsTo(Class);

Teacher.hasMany(TeacherClass);
TeacherClass.belongsTo(Teacher);