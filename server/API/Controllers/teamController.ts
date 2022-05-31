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
    let newTeamId = ''

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

    console.log(newTeamId)
}

async function addTeamInvite(req: any, res: any, userTeamIDCombo: any, recipientID: any){
    let invite = {recipient_id: recipientID, sender_id: userTeamIDCombo.userID, team_id: userTeamIDCombo.teamID, date_sent: getCurrentDate()}
    let sql = 'INSERT INTO team_invites SET ?'

    connectionPool.query(sql, invite, (err: any) => {
        if (err) throw err
        return res.status(200).send({message: 'User Invited...'});
    })
}

async function getTeamInvites(req: any, res: any){
    let recipient_id = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserIdFlag)
    let sql = 'SELECT * FROM team_invites WHERE recipient_id= ?)'

    connectionPool.query(sql, recipient_id, (err: any, result: any) => {
        if(err) throw err
        return result
    })
}

async function getInvite(req: any, res: any, currentUserId: any){
    let targetInvite = {recipient_id: currentUserId, team_id: req.body.team_id}
    let sql = 'SELECT FROM team_invites WHERE recipient_id= ? AND team_id= ?'
    connectionPool.query(sql, targetInvite, (err: any, result:any) => {
        if(err) throw err
        console.log(result)
        return result
    })
}

function getInviteByUserIDRecipientIDTeamID(senderID: string, recipientID: string, teamID: string, res: any){
    let values = [senderID, recipientID, teamID]
    let sql = 'SELECT EXISTS(SELECT * FROM team_invites WHERE sender_id= ? AND recipient_id= ? AND team_id= ?)'
    
    return new Promise<any>((resolve, reject) => {
        connectionPool.query(sql, values, (err: any, result: any) => {
            if (err) throw err;
            return err ? reject(err) : resolve(result)
        })
    })
}


module.exports = { addTeam, addTeamInvite, getTeamInvites, getInviteByUserIDRecipientIDTeamID }