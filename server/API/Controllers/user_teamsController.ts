import {connectionPool} from '../dbConnectionPool';

function createUserTeamsTable(req: any, res: any) {
    
    let sql ="CREATE TABLE user_teams(user_id INT(11) NOT NULL, team_id INT(11) NOT NULL, role_id INT(1) NOT NULL, date_joined DATETIME NOT NULL, enlisted_by_user_id INT(11) NOT NULL, PRIMARY KEY(user_id, team_id))";

    connectionPool.query(sql, (err: Error, result: any) => {
        if(err) throw err;
        console.log(result);
        res.send('User teams table created...');
    });
}

function addUserToTeam(req: any, res: any) {
    console.log('got here')
    let user = {user_id: req.body.invitee, team_id: '1', role_id: '1', date_joined: '2022-05-07', enlisted_by_user_id: '1'}

    let sql='INSERT INTO user_teams SET ?'

    connectionPool.query(sql, user, (err: Error, result: any) => {
        if(err) throw err;
        console.log(result);
        res.send('User added to team...');
    });
}

module.exports = { createUserTeamsTable, addUserToTeam }