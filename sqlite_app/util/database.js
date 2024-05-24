/*
* this file is used to connect to the database eith sequelize
*  
*/
// try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }

// const mysql2 = require('mysql2');

// const Sequelize = require ('sequelize');
// const sequelize = new Sequelize('node', 'root', '', {
//     dialect: 'mysql',
//     host: 'localhost',
//     dialectModule: mysql2,
// })

// module.exports = sequelize; //export the connection to the database


// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('node', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql',
//     port: 4306,
//     logging: console.log
// });


// module.exports = sequelize;


const { Sequelize } = require('sequelize');
const path = require('path');

// Define the path to the SQLite file
const dbPath = path.join(__dirname, 'data', 'database.sqlite');

// Create a Sequelize instance for SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
 // logging: console.log // Log SQL queries to the console
});

module.exports = sequelize;
