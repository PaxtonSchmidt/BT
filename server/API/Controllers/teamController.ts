import {connectionPool} from '../dbConnectionPool';
import authenticateJWT from '../Services/authenticateJWT';
import consumeCookie from '../Services/consumeCookie';
import getCurrentTime from '../Services/getCurrentTime';

function createTeamsTable(req: any, res: any) {
    let sql ="CREATE TABLE teams(team_id INT(11) NOT NULL AUTO_INCREMENT, name varchar(50) NOT NULL, date_created DATETIME NOT NULL, creator_user_id INT(11), PRIMARY KEY(team_id))";

    connectionPool.query(sql, (err: Error, result: any) => {
        if(err) throw err;
        console.log(result);
        res.send('Teams table created...');
    });
}

function addTeam(req: any, res: any) {
    let dateTime = getCurrentTime();
    let creatorUserId = consumeCookie(req.headers.cookie, 'needTokenUser_id');
    let newTeamId = ''

    //THIS NOW ADDS A FIELD IN USER TEAMS FOR THE OWNER OF THE NEWLY CREATED TEAM
    let team = {name: req.body.name, date_created: dateTime, owner_user_id: creatorUserId}
    let insertTeamSql = "INSERT INTO teams SET ?;"; 
    connectionPool.query(insertTeamSql, team, (err: any, result: any) => {
        if (err) result.send(err);

        let user_teamValues = {user_id: creatorUserId, team_id: result.insertId, role_id: '1', date_joined: dateTime, enlisted_by_user_id: creatorUserId }
        let user_teamSQL = "INSERT INTO user_teams SET ?"
        connectionPool.query(user_teamSQL, user_teamValues, (err: any, result: any) => {
            if (err) result.send(err);
            res.send(result.status)
        })
        res.send(result.status);
    })

    console.log(newTeamId)
}



module.exports = { addTeam }