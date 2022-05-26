import consumeCookie from "../../Services/consumeCookies/consumeCookie";
import { consumeCookieFlags } from "../../Services/consumeCookies/consumeCookieFlags";

let authorizationController = require('../../Controllers/AuthControllers/authorizationController')
let teamController = require('../../Controllers/teamController')
let Roles = require('./Roles')

async function inviteUserToTeam(req: any, res: any) {
    let userTeamIDCombo = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserAndTeamIdFlag);
    let currentUserRoleID = await authorizationController.fetchUserTeamRoleID(req, res, userTeamIDCombo);

    console.log(userTeamIDCombo)
    console.log(currentUserRoleID)
    if(currentUserRoleID === Roles.Legend.owner){
        await teamController.addTeamInvite(req, res, userTeamIDCombo)
    } else {
        res.sendStatus(401)
    }
}

module.exports = { inviteUserToTeam }