import {connectionPool} from '../dbConnectionPool';
import authenticateJWT from '../Services/authenticateJWT';
import consumeCookie from '../Services/consumeCookie';

function createTeamsTable(req: any, res: any) {
    let sql ="CREATE TABLE teams(team_id INT(11) NOT NULL AUTO_INCREMENT, name varchar(50) NOT NULL, date_created DATETIME NOT NULL, creator_user_id INT(11), PRIMARY KEY(team_id))";

    connectionPool.query(sql, (err: Error, result: any) => {
        if(err) throw err;
        console.log(result);
        res.send('Teams table created...');
    });
}

function addTeam(req: any, res: any) {
    let ownerUserId = consumeCookie(req.headers.cookie, 'needTokenUser_id')
    let team = {name: req.body.name, date_created: '2022-05-19', owner_user_id: ownerUserId}
 
    //THIS MAY BE CREATING A NEW TEAM FIELD, BUT IT ALSO MUST CREATE A NEW FIELD OF USER_TEAMS 
    //FOR THE THE OWNER

    let sql = "INSERT INTO teams SET ?"; 

    connectionPool.query(sql, team, (err: any, result: any) => {
        if (err) result.send(err);
        res.send(result.status);
    })
}



module.exports = { addTeam }