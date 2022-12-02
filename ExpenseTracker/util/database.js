const Sequelize = require('sequelize');
require('dotenv').config();
const db_pass = process.env.DB_PASS;
const sequelize = new Sequelize('expense-tracker','root', db_pass , {dialect: 'mysql', host:'localhost'});

module.exports = sequelize;