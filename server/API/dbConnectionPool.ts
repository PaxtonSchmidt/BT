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

// function createdb(req: any, res: any) {
//     let sql = "CREATE DATABASE bug_tracker_db";
//     db.query(sql, (err: Error, result: any) => {
//         if (err) throw err;
//         console.log(result)
//         res.send('Database created...');
//     })
// }


