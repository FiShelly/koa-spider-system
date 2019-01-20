import mysql from './db';
import Sequelize from 'sequelize';

const WorkConfig = mysql.define('spider_work_config', {
    id: {type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true},
    config: {type: Sequelize.TEXT, allowNull: true},
}, {
    tableName: 'spider_work_config',
    timestamps: true,
    freezeTableName: true
});

export default WorkConfig;