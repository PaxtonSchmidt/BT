import consumeCookie from "../../../Services/consumeCookies/consumeCookie";
import { consumeCookieFlags } from "../../../Services/consumeCookies/consumeCookieFlags";
let teams = require('../../../Controllers/teamController');

async function deleteInviteToTeam(req: any, res: any) {
    let currentUserID = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserIdFlag)
    let invite = await teams.getInviteById(req.body.inviteID);

    //if the user is the sender or recipient of the invite then they can delete the invite
    if(currentUserID === invite.recipient_id || currentUserID === invite.sender_id){
        teams.deleteTeamInvite(res, req.body.inviteID)
    } else {
        return res.sendStatus(403)
    }
}

async function acceptInviteToTeam(req: any, res: any){
    let currentUserID = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserIdFlag)
    let targetInvite = await teams.getInviteById(req.body.InviteID)
    console.log(targetInvite)
}

module.exports =  { deleteInviteToTeam, acceptInviteToTeam }