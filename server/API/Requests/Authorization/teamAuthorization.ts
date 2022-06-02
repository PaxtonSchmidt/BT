import consumeCookie from '../../Services/consumeCookies/consumeCookie';
import { consumeCookieFlags } from "../../Services/consumeCookies/consumeCookieFlags";
import { consumeRowDataPacket } from "../../Services/consumeRowDataPacket";
let authorizationController = require('../../Queries/AuthQueries/authorizationQueries')
let teamController = require('../../Queries/teamQueries')
let Roles = require('./Roles')
let users = require('../../Queries/userQueries')
let teams = require('../../Queries/teamQueries')

async function inviteUserToTeam(req: any, res: any) {
    let isAlreadyOnTeam = true;
    let isInviteExisting = true; 
    let userTeamIDCombo: any = [];
    let currentUserRoleID = ''; 
    let recipientID = ''; 
    
    try{
        userTeamIDCombo = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserAndTeamIdFlag);
        currentUserRoleID = await authorizationController.fetchUserTeamRoleID(req, userTeamIDCombo);
    }catch(e){
        return res.status(500).send({message: 'Server couldnt find role information...'})
    }

    try{
        recipientID = await users.getUserByNameDiscriminator(req.body.invitee, req.body.discriminator, res)
        isInviteExisting = consumeRowDataPacket(await teams.getInviteBySenderIDRecipientIDTeamID(userTeamIDCombo.userID, recipientID, userTeamIDCombo.teamID, res))
        isAlreadyOnTeam = consumeRowDataPacket(await teams.fetchIsOnTeam(recipientID, userTeamIDCombo.teamID))
    }catch(e){
        return res.status(500).send({message: 'Server couldnt check invite information...'})
    }

    //if user is the owner they can invite others to the team if the recipient isnt already on the 
    //team and the invite doesnt already exist
    if(currentUserRoleID !== Roles.Legend.owner){
        return res.status(401).send({message: "You can't invite people to this team..."})
    } else if(isAlreadyOnTeam === true){
        return res.status(409).send({message: "That user is already on this team..."})
    } else if(isInviteExisting === true){
        return res.status(400).send({message: 'Invite already exists...'});
    } else {
        try{
            //now add the invite
            await teamController.addTeamInvite(req, res, userTeamIDCombo, recipientID)
            return res.status(200).send({message: 'Invited user'})
        } catch(e) {
            return res.status(500).send({message: 'Server couldnt invite user...'})
        }
    }
}



module.exports = { inviteUserToTeam }