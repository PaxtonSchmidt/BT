import {connectionPool} from '../dbConnectionPool';

function createTeamsTable(req: any, res: any) {
    let sql ="CREATE TABLE teams(team_id INT(11) NOT NULL AUTO_INCREMENT, name varchar(50) NOT NULL, date_created DATETIME NOT NULL, creator_user_id INT(11), PRIMARY KEY(team_id))";

    connectionPool.query(sql, (err: Error, result: any) => {
        if(err) throw err;
        console.log(result);
        res.send('Teams table created...');
    });
}

function addTeam(req: any, res: any) {
    console.log('got to add team endpoint')
    let team = {name: 'Good Dev Company', date_created: '2022-05-07', creator_user_id: '1'}

    //eventually these queries will be parameterized 
    let sql = "INSERT INTO teams SET ?"; 
    
    connectionPool.query(sql, team, (err: any, result: any) => {
        if (err) result.send(err);
        res.send(result.status);
    })
}

module.exports = { addTeam }