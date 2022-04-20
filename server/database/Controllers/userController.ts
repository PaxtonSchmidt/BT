import {connectionPool} from '../dbConnectionPool';

function createUsersTable(req: any, res: any) {
    let sql ="CREATE TABLE users(user_id INT(11) NOT NULL AUTO_INCREMENT, username varchar(50) NOT NULL, password varchar(50) NOT NULL, date_created DATETIME NOT NULL, bio varchar(255), PRIMARY KEY(user_id))";

    connectionPool.query(sql, (err: Error, result: any) => {
        if(err) throw err;
        console.log(result);
        res.send('Users table created...');
    });
}

function addUser(req: any, res: any) {
    let user = {username: 'tom', password: '981623712', date_created: '2022-04-14', bio: 'loves bill'}
    let sql = "INSERT INTO users SET ?"; 
    
    connectionPool.query(sql, user, (err: any, result: any) => {
        if (err) result.send(err);
        console.log(result)
        res.send('User added...');
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
    let userID=7;
    let sql = "SELECT * FROM users WHERE user_id = ?"; 
    
    connectionPool.query(sql, userID, (err: any, result: any) => {
        if (err) result.send(err);
        console.log(result)
        res.send('User retrieved...');
    })
}

//function updateUser

module.exports = {createUsersTable, addUser, getUsers, getUserByID};
