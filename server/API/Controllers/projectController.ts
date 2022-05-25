import {connectionPool} from '../dbConnectionPool';
import consumeCookie from '../Services/consumeCookies/consumeCookie';
import { consumeCookieFlags } from '../Services/consumeCookies/consumeCookieFlags';
import getCurrentDate from '../Services/getCurrentDate';

function addProject(req: any, res: any) {
    let creatorUserId = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserIdFlag);
    let team_id = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenTeamIdFlag)
    let date = getCurrentDate()
    console.log('got to add project endpoint')
    let project = {team_id: team_id, creator_user_id: creatorUserId, name: req.body.name, description: req.body.description, date_created: date}

    //eventually these queries will be parameterized 
    let sql = "INSERT INTO projects SET ?"; 
    
    connectionPool.query(sql, project, (err: any, result: any) => {
        console.log('project add')
        if (err) result.send(err);
        console.log(result.insertId)
        let user_projectValues = {user_id: creatorUserId, project_id: result.insertId, role_id: 1, relevant_team_id: team_id, enlisted_by_user_id: creatorUserId, date_joined: date}
        let user_projectSQL = "INSERT INTO user_projects SET ?"
        connectionPool.query(user_projectSQL, user_projectValues, (err: any, result: any) => {
            console.log('user_project add')
            if(err) result.send(err)
            res.send(result.status)
        })
    })
}

module.exports = { addProject }

