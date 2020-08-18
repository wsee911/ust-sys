import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export interface TeacherClassAttr {
    teacherEmail: string;
    classCode: string;
}

export class StudentClass extends Model {
    public studentEmail!: string;
    public classCode!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

StudentClass.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    studentEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    classCode: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    }
}, { sequelize, modelName: 'StudentClass', freezeTableName: true, timestamps: true });

