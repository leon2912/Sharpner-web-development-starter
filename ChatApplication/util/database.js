const Sequelize = require('sequelize');
const db_pass = process.env.DB_PASS;
const db_name = process.env.DB_NAME;
const db_username = process.env.DB_USERNAME;
const db_host = process.env.DB_HOST;
const sequelize = new Sequelize(db_name,db_username,db_pass, {dialect: 'mysql', host:db_host});
module.exports = sequelize;