import {connectionPool} from '../dbConnectionPool';
import consumeCookie from '../Services/consumeCookies/consumeCookie';
import { consumeCookieFlags } from '../Services/consumeCookies/consumeCookieFlags';
import getCurrentDate from '../Services/getCurrentDate';

function addProject(req: any, res: any) {
    let creatorUserId = consumeCookie(req.headers.cookie, consumeCookieFlags.needTokenUser_id);
    let team_id = consumeCookie(req.headers.cookie, consumeCookieFlags.needTokenTeam_id)
    console.log('got to add project endpoint')
    let project = {team_id: team_id, creator_user_id: creatorUserId, name: req.body.name, description: req.body.description, date_created: getCurrentDate()}

    //eventually these queries will be parameterized 
    let sql = "INSERT INTO projects SET ?"; 
    
    connectionPool.query(sql, project, (err: any, result: any) => {
        if (err) result.send(err);
        res.send(result.status);
    })
}

module.exports = { addProject }