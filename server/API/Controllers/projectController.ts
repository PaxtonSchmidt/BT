import {connectionPool} from '../dbConnectionPool';

function addProject(req: any, res: any) {
    console.log('got to add project endpoint')
    let project = {team_id: '1', name: 'Good Dev Company', description: 'test', date_created: '2022-05-07', creator_user_id: '1'}

    //eventually these queries will be parameterized 
    let sql = "INSERT INTO projects SET ?"; 
    
    connectionPool.query(sql, project, (err: any, result: any) => {
        if (err) result.send(err);
        res.send(result.status);
    })
}

module.exports = { addProject }