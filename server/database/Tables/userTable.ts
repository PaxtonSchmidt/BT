import {pool} from '../dbInit';

// function createUserTable(req: any, res: any) {
//     let sql ="CREATE TABLE users(user_id INT(11) NOT NULL AUTO_INCREMENT, username varchar(50) NOT NULL, password varchar(50) NOT NULL, date_created DATETIME NOT NULL, bio varchar(255), PRIMARY KEY(user_id))";
//     db.query(sql, (err: Error, result: any) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('Users table created...');
//     });
// }


function addUser(req: any, res: any) {
    let user = {username: 'bill', password: '1234', date_created: '2022-01-01', bio: 'dasdsad'}
    let sql = "INSERT INTO users SET ?"; 
    
  
    console.log('got to addUser');

    pool.query(sql, user, (err: any, result: any) => {
        if (err) result.send(err);
        console.log(result)
        res.send('user added...');
    })

    console.log('got past add user');
}

module.exports = {addUser};
