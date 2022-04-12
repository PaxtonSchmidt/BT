
const express = require('express');
const mysql = require('mysql');

//using dotenv and exporting connection variables is throwing "er_unsupported_auth"
const db = mysql.createConnection({
    host     : '*****',
    port     : '*****',
    user     : '*****',
    password : '*****',
    database : '*****'
});

db.connect((err: Error) => {
    if(err){
        throw err;
    } 
    console.log('MySQL Connected...');
});

const app = express();

// app.get('/createdb', (req: any, res: any) => {
//     let sql = "CREATE DATABASE bug_tracker_db";
//     db.query(sql, (err: Error, result: any) => {
//         if (err) throw err;
//         console.log(result)
//         res.send('Database created...');
//     })
// })

app.get('/createUserTable'), (req: any, res: any) => {
    let sql ="CREATE TABLE users(user_id INT(11) NOT NULL AUTO_INCREMENT, username varchar(50) NOT NULL, password varchar(50) NOT NULL, date_created DATETIME NOT NULL, bio varchar(255), PRIMARY KEY(user_id))";
    db.query(sql, (err: Error, result: any) => {
        if(err) throw err;
        console.log(result);
        res.send('Users table created...');
    });
}

app.get('/addUser', (req: any, res: any) => {
    let user = {username: 'jim', password: '1234', date_created: '2022-01-01', bio: 'I LOVE COOKIES IN MY MOUTH'}
    let sql = "INSERT INTO users SET ?";
    db.query(sql, user, (err: any, result: any) => {
        if (err) throw err;
        console.log(result)
        res.send('user added...');
    })
})


app.listen('4000', () => {
    console.log('server started on port 4000');
})