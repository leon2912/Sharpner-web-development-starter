const Sequelize = require('sequelize');
const sequelize = require('../util/database');

//id, name , password, phone number, role

const downloadedFiles = sequelize.define('Files', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    url: Sequelize.STRING,
})

module.exports = downloadedFiles;