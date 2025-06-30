import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Assistence = sequelize.define('Assistence', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    course_id: { type: DataTypes.INTEGER, allowNull: false },
    hour: { type: DataTypes.STRING, allowNull: false },
    day: { type: DataTypes.DATE, allowNull: false },
    assisted: { type: DataTypes.ENUM('yes', 'unjustified', 'justified', 'not selected', 'late'), defaultValue: 'unjustified' },
    createdAt: { field: 'created_at', type: DataTypes.DATE },
    updatedAt: { field: 'updated_at', type: DataTypes.DATE },
}, {
    tableName: 'Assistence',
    timestamps: true,
});

export default Assistence;