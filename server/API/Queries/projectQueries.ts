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

function getSessionProjectRoles(teamID: string, userID: string){
    let values = [teamID, userID]
    let sql ='SELECT p.project_id AS project_id, p.name AS name, up.role_id AS role_id FROM projects p LEFT JOIN user_projects up ON up.project_id = p.project_id WHERE p.team_id= ? AND up.user_id= ?'

    return new Promise<any>((resolve, reject) => {
        connectionPool.query(sql, values, (err: any, result: any) => {
            return err ? reject(err) : resolve(result)
        })
    })
}

function getProjectMembers(userID: any, teamID: any){
    let values = [userID, teamID]
    let sql = 'SELECT up.project_id, up.role_id, u.username, u.discriminator FROM user_projects up LEFT JOIN users u ON u.user_id = up.user_id WHERE up.project_id IN (SELECT project_id from user_projects WHERE user_id= ? AND relevant_team_id= ?)'

    return new Promise<any>((resolve, reject) => {
        connectionPool.query(sql, values, (err: any, result: any) => {
            return err ? reject(err) : resolve(result)
        })
    })
}

function isUserOnProject(userID: any, projectID: any){
    let values = [userID, projectID]
    let sql = 'SELECT EXISTS(SELECT * FROM user_projects WHERE user_id= ? AND project_id= ?)'

    return new Promise<any>((resolve, reject) => {
        connectionPool.query(sql, values, (err: any, result: any) => {
            return err ? reject(err) : resolve(result)
        })
    })
}

module.exports = { 
    addProject,
    getSessionProjectRoles,
    getProjectMembers,
    isUserOnProject
}

