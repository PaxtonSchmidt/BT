import {connectionPool} from '../dbConnectionPool';

function createUserTeamsTable(req: any, res: any) {
    let sql ="CREATE TABLE user_teams(user_id INT(11) NOT NULL, team_id INT(11) NOT NULL, role_id INT(1) NOT NULL, date_joined DATETIME NOT NULL, enlisted_by_user_id INT(11) NOT NULL, PRIMARY KEY(user_id, team_id))";

    connectionPool.query(sql, (err: Error, result: any) => {
        if(err) throw err;
        console.log(result);
        res.send('User teams table created...');
    });
}

module.exports = {createUserTeamsTable}