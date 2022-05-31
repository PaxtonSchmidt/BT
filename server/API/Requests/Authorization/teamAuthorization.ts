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
    let isInviteExisting = consumeRowDataPacket(await teams.getInviteByUserIDRecipientIDTeamID(userTeamIDCombo.userID, recipientID, userTeamIDCombo.teamID, res))


    if(currentUserRoleID !== Roles.Legend.owner){
        return res.status(401).send({message: "You can't invite people to this team..."})
    } if(isInviteExisting){
        return res.status(400).send({message: 'Invite already exists...'});
    } else {
        teamController.addTeamInvite(req, res, userTeamIDCombo, recipientID)
    }
}

async function acceptInviteToTeam(req: any, res: any){
    let currentUserID = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserIdFlag)
    let targetInvite = await teamController.getInvite(req, res, currentUserID)
    console.log(targetInvite)
}

module.exports = { inviteUserToTeam, acceptInviteToTeam }