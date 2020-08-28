import { DataTypes, Model } from 'sequelize';
import { Subject, Teacher, Class } from '.';
import sequelize from '../config/database';

export interface WorkloadAttr {
    teacherId: number;
    subjectId: number;
    classId: number;
}

export class Workload extends Model {
    public teacherId!: number;
    public subjectId!: number;
    public classId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Workload.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }
}, { sequelize, modelName: 'Workload', freezeTableName: true, timestamps: true });

Teacher.belongsToMany(Subject, { through: { model: 'Workload', unique: false } });
Subject.belongsToMany(Teacher, { through: { model: 'Workload', unique: false } });

Teacher.hasMany(Workload);
Workload.belongsTo(Teacher);

Subject.hasMany(Workload);
Workload.belongsTo(Subject);

Class.hasMany(Workload);
Workload.belongsTo(Class);