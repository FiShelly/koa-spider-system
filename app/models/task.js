import mysql from './db';
import Sequelize from 'sequelize';

const WorkConfig = mysql.define('spider_work_config', {
    id: {type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true},
    config: {type: Sequelize.TEXT, allowNull: false},
    cnt:{type: Sequelize.INTEGER, allowNull: true}
}, {
    tableName: 'spider_task',
    timestamps: true,
    freezeTableName: true
});

export default WorkConfig;