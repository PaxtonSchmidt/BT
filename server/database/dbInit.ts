const mysql = require('mysql');
const env = require('dotenv').config();
console.log(env);

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

export const pool = createConnectionPool();

// function createdb(req: any, res: any) {
//     let sql = "CREATE DATABASE bug_tracker_db";
//     db.query(sql, (err: Error, result: any) => {
//         if (err) throw err;
//         console.log(result)
//         res.send('Database created...');
//     })
// }


