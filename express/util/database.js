/*
* this file is used to connect to the database eith sequelize
*  
*/

const mysql2 = require('mysql2');

const Sequelize = require ('sequelize');
const sequelize = new Sequelize('node', 'root', null, {
    dialect: 'mysql',
    host: '127.0.0.1',
    dialectModule: mysql2,
})

module.exports = sequelize; //export the connection to the database

