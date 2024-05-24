/**
 * 
 * Old way of connecting to mysql database
 */

const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node',
    password: ''
}); 

module.exports = pool.promise();  //this will allow use to promises to handle async code