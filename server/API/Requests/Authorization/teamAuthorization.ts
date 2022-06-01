import consumeCookie from '../../Services/consumeCookies/consumeCookie';
import { consumeCookieFlags } from "../../Services/consumeCookies/consumeCookieFlags";
import { consumeRowDataPacket } from "../../Services/consumeRowDataPacket";
let authorizationController = require('../../Controllers/AuthControllers/authorizationController')
let teamController = require('../../Controllers/teamController')
let Roles = require('./Roles')
let users = require('../../Controllers/userController')
let teams = require('../../Controllers/teamController')

async function inviteUserToTeam(req: any, res: any) {
    let userTeamIDCombo = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserAndTeamIdFlag);
    let currentUserRoleID = await authorizationController.fetchUserTeamRoleID(req, userTeamIDCombo);

    let recipientID = await users.getUserByNameDiscriminator(req.body.invitee, req.body.discriminator, res)
    let isInviteExisting = consumeRowDataPacket(await teams.getInviteBySenderIDRecipientIDTeamID(userTeamIDCombo.userID, recipientID, userTeamIDCombo.teamID, res))

    //if user is the owner they can invite others to the team if the invite doesnt already exist
    if(currentUserRoleID !== Roles.Legend.owner){
        return res.status(401).send({message: "You can't invite people to this team..."})
    } if(isInviteExisting){
        return res.status(400).send({message: 'Invite already exists...'});
    } else {
        teamController.addTeamInvite(req, res, userTeamIDCombo, recipientID)
    }
}



module.exports = { inviteUserToTeam }