import config from '../../config/database.config';
import Sequelize from 'sequelize';

const mysql = new Sequelize(
    config.dbname,
    config.username,
    config.password, config.options
);

export default mysql;