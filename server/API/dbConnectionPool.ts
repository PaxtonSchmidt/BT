const mysql = require('mysql');
require('dotenv').config();

function createConnectionPool() {
    return mysql.createPool({
    connectionLimit : '10',
    host : process.env.host,
    port : process.env.port,
    user : process.env.user,
    password : process.env.password,
    database : process.env.database
    });
}

export const connectionPool = createConnectionPool();
