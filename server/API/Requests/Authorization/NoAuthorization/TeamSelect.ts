import consumeCookie from "../../../Services/consumeCookies/consumeCookie";
import { consumeCookieFlags } from "../../../Services/consumeCookies/consumeCookieFlags";
const user_teams = require('../../../Controllers/user_teamsController')
let teams = require('../../../Controllers/teamController')

async function getCurrentUserTeams(req: any, res: any) {
    let currentUserID = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserIdFlag);
    let userTeams = await user_teams.getUserTeams(currentUserID);
    if(userTeams.length < 1){
        return res.sendStatus(404)
    } else {
        return res.send(userTeams)
    }
}

async function getTeamInvites(req: any, res: any) {
    let currentUserID = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserIdFlag)
    
    let invites = await teams.getTeamInvites(currentUserID);

    if(invites.length < 1){
        return res.sendStatus(404)
    } else {
        return res.send(invites)
    }
}

module.exports =  { getCurrentUserTeams, getTeamInvites }