import {connectionPool} from '../dbConnectionPool';
import getCurrentDate from '../Services/getCurrentDate';

function addProject(creatorId: any, teamID: any, name: string, description: string) {
    let date = getCurrentDate()
    console.log('got to add project endpoint')
    let project = {team_id: teamID, creator_user_id: creatorId, name: name, description: description, date_created: date}
    let sql = "INSERT INTO projects SET ?"; 
    connectionPool.query(sql, project, (err: any, result: any) => {
        if (err) result.send(err);
        let user_projectValues = {user_id: creatorId, project_id: result.insertId, role_id: 1, relevant_team_id: teamID, enlisted_by_user_id: creatorId, date_joined: date}
        let user_projectSQL = "INSERT INTO user_projects SET ?"
        connectionPool.query(user_projectSQL, user_projectValues, (err: any, result: any) => {
            if(err) result.send(err)
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
function getProjectIdByTeamIdAndProjectName(teamID: any, projectName: any){
    let values = [teamID, projectName]
    console.log(values)
    let sql = 'SELECT project_id FROM projects WHERE team_id= ? AND name= ?'
    return new Promise<any>((resolve, reject) => {
        connectionPool.query(sql, values, (err: any, result: any) => {
            console.log(result)
            return err ? reject(err) : resolve(result[0])
        })
    })
}
function getRelatedMemberDetails(userId: string, teamID: any){
    let values = [userId, teamID]
    let sql = 'SELECT uA.username, uA.discriminator, up.project_id, up.role_id, up.date_joined AS dateAssigned, uB.username AS assignedByUsername, uB.discriminator AS assignedByUserDiscriminator, p.name AS project_name FROM user_projects up LEFT JOIN users uA ON up.user_id = uA.user_id LEFT JOIN users uB ON up.enlisted_by_user_id = uB.user_id LEFT JOIN projects p ON up.project_id = p.project_id WHERE up.project_id IN (SELECT project_id from user_projects WHERE user_id= ? AND relevant_team_id= ?) '
    return new Promise<any>((resolve, reject) => {
        connectionPool.query(sql, values, (err: any, result: any) => {
            return err ? reject(err) : resolve(result)
        })
    })
}
function getRoleByUserIdProjectId(userID: any, projectID: any){
    let values = [userID, projectID]
    let sql = 'SELECT role_id FROM user_projects WHERE user_id= ? AND project_id= ?'
    return new Promise<any>((resolve, reject) => {
        connectionPool.query(sql, values, (err: any, result: any) => {
            if(err) throw err
            return err ? reject(err) : resolve(result)
        })
    })
}
function updateMemberRole(targetUserID: any, projectID: any, newRoleId: any){
    let values = [newRoleId, targetUserID, projectID ]
    let sql = 'UPDATE user_projects SET role_id= ? WHERE user_id= ? AND project_id= ?'
    return new Promise<any>((resolve, reject) => {
        connectionPool.query(sql, values, (err: any, result: any) => {
            return err ? reject(err) : resolve(result)
        })
    })
}

// function getTeamMembersNotOnTargetProject(team_id: any, project_id: any){
//     let values = [team_id, project_id]
//     let sql = 'SELECT u.user_id FROM users u LEFT JOIN user_teams ut ON ut.user_id = u.user_id WHERE ut.team_id= ? AND u.user_id NOT IN (SELECT u.user_id FROM users u LEFT JOIN user_projects up ON up.user_id = u.user_id WHERE up.project_id= ?)'
//     return new Promise<any>((resolve, reject) => {
//         connectionPool.query(sql, values, (err: any, result: any) => {
//             console.log(result)
//             return err ? reject(err) : resolve(result)
//         })
//     })
// } DOESNT WORK BECAUSE YOU CANT PASS DATA IN A GET REQUEST FOR WHATEVER REASON

module.exports = { 
    addProject,
    getSessionProjectRoles,
    getProjectMembers,
    isUserOnProject,
    getProjectIdByTeamIdAndProjectName,
    getRelatedMemberDetails,
    getRoleByUserIdProjectId,
    updateMemberRole
}

