import { DataTypes, Model } from 'sequelize';
import { Class, Teacher, Subject } from '.';
import sequelize from '../config/database';

export interface SubjectClassAttr {
    subjectId: number;
    classId: number;
}

export class SubjectClass extends Model {
    public subjectId!: number;
    public classId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

SubjectClass.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
}, { sequelize, modelName: 'SubjectClass', freezeTableName: true, timestamps: true });

Subject.belongsToMany(Class, { through: 'SubjectClass' });
Class.belongsToMany(Subject, { through: 'SubjectClass' });

Subject.hasMany(SubjectClass);
SubjectClass.belongsTo(Subject);

Class.hasMany(SubjectClass);
SubjectClass.belongsTo(Class);