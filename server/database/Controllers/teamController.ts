import {connectionPool} from '../dbConnectionPool';

function createTeamsTable(req: any, res: any) {
    let sql ="CREATE TABLE teams(team_id INT(11) NOT NULL AUTO_INCREMENT, name varchar(50) NOT NULL, date_created DATETIME NOT NULL, creator_user_id INT(11), PRIMARY KEY(team_id))";

    connectionPool.query(sql, (err: Error, result: any) => {
        if(err) throw err;
        console.log(result);
        res.send('Teams table created...');
    });
}

module.exports = {createTeamsTable}