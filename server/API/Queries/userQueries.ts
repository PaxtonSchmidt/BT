import {connectionPool} from '../dbConnectionPool';
import getCurrentDate from '../Services/getCurrentDate';
const bcrypt = require('bcrypt');


async function addUser(req: any, res: any) {
    try{
        console.log(req.body)
        let user = {username: req.body.username, discriminator: req.body.discriminator, password: req.body.password, email: req.body.email, date_created: getCurrentDate(), bio: req.body.bio};
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

function getUsers(req: any, res: any) {
    let sql = "SELECT * FROM users"; 

    connectionPool.query(sql, (err: any, result: any) => {
        if (err) throw(err);
        res.send(result);
    })
}

function getUserByID(userID: string) {
    let sql = "SELECT username, discriminator, bio FROM users WHERE user_id = ?"; 
    
    return new Promise<any>((resolve, reject) => {
        connectionPool.query(sql, userID, (err: any, result: any) => {
            return err ? reject(err) : resolve(result[0])
        })
    })
}

function getUserByNameDiscriminator(name: string, discriminator: string, res: any){
    let values = [name, discriminator]
    let sql = "SELECT user_id FROM users WHERE username= ? AND discriminator= ?"
    return new Promise<any>((resolve, reject) => {
        connectionPool.query(sql, values, (err: any, result: any) => {
            return err ? reject(err) : resolve(result[0])
        })
    })
}


// function createUsersTable(req: any, res: any) {
//     let sql ="CREATE TABLE users(user_id INT(11) NOT NULL AUTO_INCREMENT, username varchar(50) NOT NULL, discriminator INT(4) NOT NULL, password CHAR(60) NOT NULL, date_created DATETIME NOT NULL, bio varchar(255), PRIMARY KEY(user_id))";

//     connectionPool.query(sql, (err: Error, result: any) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('Users table created...');
//     });
// }



module.exports = {addUser, getUsers, getUserByID, getUserByNameDiscriminator };

