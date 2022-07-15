import {connectionPool} from '../dbConnectionPool';
import consumeCookie from '../Services/consumeCookies/consumeCookie';
import { consumeCookieFlags } from '../Services/consumeCookies/consumeCookieFlags';
import getCurrentDate from '../Services/getCurrentDate';

// function createTeamsTable(req: any, res: any) {
//     let sql ="CREATE TABLE teams(team_id INT(11) NOT NULL AUTO_INCREMENT, name varchar(50) NOT NULL, date_created DATETIME NOT NULL, creator_user_id INT(11), PRIMARY KEY(team_id))";

//     connectionPool.query(sql, (err: Error, result: any) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('Teams table created...');
//     });
// }

function addTeam(req: any, res: any) {
    let dateTime = getCurrentDate();
    let creatorUserId = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserIdFlag);

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
    })
}
async function addTeamInvite(req: any, res: any, userTeamIDCombo: any, recipientID: any){
    let invite = {recipient_id: recipientID, sender_id: userTeamIDCombo.userID, team_id: userTeamIDCombo.teamID, date_sent: getCurrentDate()}
    let sql = 'INSERT INTO team_invites SET ?'

    connectionPool.query(sql, invite, (err: any) => {
        return res.ok;
    })
}
async function deleteTeamInvite(res: any, invite_id: string){
     let sql = 'DELETE FROM team_invites WHERE invite_id= ?'

     return new Promise<any>((resolve, reject) => {
        connectionPool.query(sql, invite_id, (err: any, result: any) => {
            return err ? reject(err) : resolve(result);
        })
    })
}
function getTeamInvites(currentUserID: number){
    let sql = 'SELECT ti.invite_id, ti.date_sent AS date_sent, t.name AS team_name, u.username AS sender_name, u.discriminator AS sender_discriminator FROM team_invites ti LEFT JOIN teams t ON ti.team_id = t.team_id LEFT JOIN users u ON ti.sender_id = u.user_id WHERE ti.recipient_id= ?'

    return new Promise<any>((resolve, reject) => {
        connectionPool.query(sql, currentUserID, (err: any, result: any) => {
            return err ? reject(err) : resolve(result);
        })
    })
}
async function getInviteById(invite_id: any){
    let sql = "SELECT * FROM team_invites WHERE invite_id= ?"
    return new Promise<any>((resolve, reject) => {
        connectionPool.query(sql, invite_id, (err: any, result: any) => {
            return err ? reject(err) : resolve(result[0]);
        })
    })
}
async function fetchIsOnTeam(recipientID: string, teamID: string){
    let values = [recipientID, teamID]
    let sql = 'SELECT EXISTS(SELECT * FROM user_teams WHERE user_id= ? AND team_id= ?)'
    return new Promise<any>((resolve, reject) => {
        connectionPool.query(sql, values, (err: any, result: any) => {
            return err ? reject(err) : resolve(result)
        })
    })
}
function getInviteBySenderIDRecipientIDTeamID(senderID: string, recipientID: string, teamID: string, res: any){
    let values = [senderID, recipientID, teamID]
    let sql = 'SELECT EXISTS(SELECT * FROM team_invites WHERE sender_id= ? AND recipient_id= ? AND team_id= ?)'
    
    return new Promise<any>((resolve, reject) => {
        connectionPool.query(sql, values, (err: any, result: any) => {
            return err ? reject(err) : resolve(result)
        })
    })
}
function addUserToTeam(res: any, currentUserID: string, teamID: string, enlistedByUserID: string) {
    let defaultRole: string = '3' //defaults to dev
    let user = {user_id: currentUserID, team_id: teamID, role_id: defaultRole, date_joined: getCurrentDate(), enlisted_by_user_id: enlistedByUserID}
    let sql='INSERT INTO user_teams SET ?'

    return new Promise<any>((resolve, reject) => {
        connectionPool.query(sql, user, (err: any, result: any) => {
            return err ? reject(err) : resolve(result)
        })
    })
}
function getSessionTeam(teamID: string, userID: string){
    let sql = 'SELECT t.name AS name, ut.date_joined AS date_joined, ut.role_id AS team_role FROM user_teams ut LEFT JOIN teams t ON t.team_id = ut.team_id WHERE t.team_id= ? AND ut.user_id= ?'
    let values = [teamID, userID]
    
    return new Promise<any>((resolve, reject) => {
        connectionPool.query(sql, values, (err: any, result: any) => {
            return err ? reject(err) : resolve(result[0])
        })
    })
}
function getUsersOnTeam(teamID: string){
    let sql = 'SELECT u.username, u.discriminator, ut.role_id AS team_role FROM users u LEFT JOIN user_teams ut ON u.user_id = ut.user_id WHERE ut.team_id= ?'
    let values = [teamID]
    
    return new Promise<any>((resolve, reject) => {
        connectionPool.query(sql, values, (err: any, result: any) => {
            return err ? reject(err) : resolve(result)
        })
    })
}
function getUserDetailsOnTeam(teamID: string){
    let sql = 'SELECT u.username, u.discriminator, u.email, ut.role_id AS team_role FROM users u LEFT JOIN user_teams ut ON u.user_id = ut.user_id WHERE ut.team_id= ?'
    let values = [teamID]
    
    return new Promise<any>((resolve, reject) => {
        connectionPool.query(sql, values, (err: any, result: any) => {
            return err ? reject(err) : resolve(result)
        })
    })
}
function getTeammatesInfo(teamID: number){
    let sql='SELECT uA.username, uA.discriminator, ut.role_id, ut.date_joined, uB.username AS enlisted_by_username, uB.discriminator AS enlisted_by_discriminator FROM user_teams ut LEFT JOIN users uA ON ut.user_id = uA.user_id LEFT JOIN users uB ON ut.enlisted_by_user_id = uB.user_id WHERE team_id= ?;'
    return new Promise<any>((resolve, reject) => {
        connectionPool.query(sql, teamID, (err: any, result: any) => {
            return err ? reject(err) : resolve(result)
        })
    })
}
function getTeammatesAssignedProjects(teamID: number){
    let sql='SELECT u.username, u.discriminator, p.name, up.role_id FROM users u LEFT JOIN user_projects up ON u.user_id = up.user_id LEFT JOIN projects p ON up.project_id = p.project_id WHERE up.project_id IN (SELECT project_id FROM projects WHERE team_id= ?)'
    return new Promise<any>((resolve, reject) => {
        connectionPool.query(sql, teamID, (err: any, result: any) => {
            return err ? reject(err) : resolve(result)
        })
    })
} 
function getTicketCount(teamID: number){
    let sql='SELECT COUNT(*) FROM tickets WHERE relevant_project_id IN (SELECT project_id FROM projects WHERE team_id= ?)'
    return new Promise<any>((resolve, reject) => {
        connectionPool.query(sql, teamID, (err: any, result: any) => {
            return err ? reject(err) : resolve(result)
        })
    })
}
function getTeamDetailsPacket(team_id: number){
    let sql = 'SELECT u.username AS owner_username, u.discriminator AS owner_discriminator, t.date_created FROM teams t LEFT JOIN users u ON t.owner_user_id = u.user_id where t.team_id= ?;'
    return new Promise<any>((resolve, reject) => {
        connectionPool.query(sql, team_id, (err: any, result: any) => {
            return err ? reject(err) : resolve(result)
        })
    })
}
function getTeammateCount(teamID: number){
    let sql='SELECT COUNT(*) FROM user_teams WHERE team_id= ?'
    return new Promise<any>((resolve, reject) => {
        connectionPool.query(sql, teamID, (err: any, result: any) => {
            return err ? reject(err) : resolve(result)
        })
    })
}



module.exports = 
{   
    addTeam, 
    addTeamInvite, 
    deleteTeamInvite, 
    getTeamInvites, 
    getInviteBySenderIDRecipientIDTeamID, 
    fetchIsOnTeam, 
    getInviteById, 
    addUserToTeam,
    getSessionTeam,
    getUsersOnTeam,
    getUserDetailsOnTeam,
    getTeammatesInfo,
    getTeammatesAssignedProjects,
    getTicketCount,
    getTeamDetailsPacket,
    getTeammateCount
}