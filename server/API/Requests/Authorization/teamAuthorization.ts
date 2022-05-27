import consumeCookie from "../../Services/consumeCookies/consumeCookie";
import { consumeCookieFlags } from "../../Services/consumeCookies/consumeCookieFlags";

let authorizationController = require('../../Controllers/AuthControllers/authorizationController')
let teamController = require('../../Controllers/teamController')
let Roles = require('./Roles')

async function inviteUserToTeam(req: any, res: any) {
    let userTeamIDCombo = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserAndTeamIdFlag);
    let currentUserRoleID = await authorizationController.fetchUserTeamRoleID(req, res, userTeamIDCombo);

    if(currentUserRoleID === Roles.Legend.owner){
        await teamController.addTeamInvite(req, res, userTeamIDCombo)
    } else {
        res.sendStatus(401)
    }
}

async function acceptInviteToTeam(req: any, res: any){
    let currentUserID = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserIdFlag)
    let targetInvite = await teamController.getInvite(req, res, currentUserID)
    console.log(targetInvite)
}

module.exports = { inviteUserToTeam, acceptInviteToTeam }