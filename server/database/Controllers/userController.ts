import {connectionPool} from '../dbConnectionPool';
let bcrypt = require('bcrypt');



async function addUser(req: any, res: any) {
    try{
        //user is req body
        let user = {username: 'frank', password: 'test', date_created: '2022-04-24', bio: 'killin it'};
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;

        let sql = "INSERT INTO users SET ?";
        
        connectionPool.query(sql, user, (err: any, result: any) => {
            if (err) throw(err);
            console.log('Server added user to database');
            res.send(result);
        })
    } catch {
        res.status(500).send();
    }
}

async function loginUser(req: any, res: any) {
    let requestUsername = 'frank';
    let sql = "Select * from users WHERE username = ?";

    connectionPool.query(sql, requestUsername, (err: any, result: any) => {
        if (err) throw(err);
        console.log('User found in database...');
        res.send(result);
    })
}

function getUsers(req: any, res: any) {
    let sql = "SELECT * FROM users"; 

    connectionPool.query(sql, (err: any, result: any) => {
        if (err) throw(err);
        console.log('Server got users from database...');
        res.send(result);
    })
}

function getUserByID(req: any, res: any) {
    let userID=1;
    let sql = "SELECT * FROM users WHERE user_id = ?"; 
    
    connectionPool.query(sql, userID, (err: any, result: any) => {
        if (err) result.send(err);
        console.log(result)
        res.send('User retrieved...');
    })
}

// function createUsersTable(req: any, res: any) {
//     let sql ="CREATE TABLE users(user_id INT(11) NOT NULL AUTO_INCREMENT, username varchar(50) NOT NULL, password CHAR(60) NOT NULL, date_created DATETIME NOT NULL, bio varchar(255), PRIMARY KEY(user_id))";

//     connectionPool.query(sql, (err: Error, result: any) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('Users table created...');
//     });
// }



module.exports = {addUser, getUsers, getUserByID, loginUser};
