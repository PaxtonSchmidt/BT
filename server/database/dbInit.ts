const mysql = require('mysql');

function createConnectionPool() {
    return mysql.createPool({
    connectLimit : '',
    host : '',
    port : '',
    user : '',
    password : '',
    database : ''
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


