import e from 'express';
import consumeCookie from '../../Services/consumeCookies/consumeCookie';
import { consumeCookieFlags } from "../../Services/consumeCookies/consumeCookieFlags";
import { consumeRowDataPacket } from "../../Services/consumeRowDataPacket";
let authorizationQueries = require('../../Queries/AuthQueries/authorizationQueries')
let teamQueries = require('../../Queries/teamQueries')
let Roles = require('./Roles')
let users = require('../../Queries/userQueries')
let teams = require('../../Queries/teamQueries')
let projects = require('../../Queries/projectQueries')

async function inviteUserToTeam(req: any, res: any) {
    let isAlreadyOnTeam = true;
    let isInviteExisting = true; 
    let userTeamIDCombo: any = [];
    let currentUserRoleID = ''; 
    let recipientID = ''; 
    
    try{
        userTeamIDCombo = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserAndTeamIdFlag);
        currentUserRoleID = await authorizationQueries.fetchUserTeamRoleID(req, userTeamIDCombo);
    }catch(e){
        return res.status(500).send({message: 'Server couldnt find role information...'})
    }

    try{
        let recipient = await users.getUserByNameDiscriminator(req.body.invitee, req.body.discriminator, res)
        recipientID = recipient.user_id
        if(recipientID === undefined){
            throw e
        }
    }catch(e){
        return res.status(400).send({message: 'That user doesnt exist...'})
    }

    try{
        isInviteExisting = consumeRowDataPacket(await teams.getInviteBySenderIDRecipientIDTeamID(userTeamIDCombo.userID, recipientID, userTeamIDCombo.teamID, res))
        isAlreadyOnTeam = consumeRowDataPacket(await teams.fetchIsOnTeam(recipientID, userTeamIDCombo.teamID));
    }catch(e){
        return res.status(500).send({message: 'Server couldnt check invite information...'})
    }

    //if user is the owner they can invite others to the team if the recipient isnt already on the 
    //team, the recipient exists and the invite doesnt already exist
    if(currentUserRoleID !== Roles.Legend.owner){
        return res.status(401).send({message: "You can't invite people to this team..."})
    } else if(isAlreadyOnTeam === true){
        return res.status(409).send({message: "That user is already on this team..."})
    } else if(isInviteExisting === true){
        return res.status(400).send({message: 'Invite already exists...'});
    } else {
        try{
            //now add the invite
            await teamQueries.addTeamInvite(req, res, userTeamIDCombo, recipientID)
            return res.status(200).send({message: 'Invited user'})
        } catch(e) {
            return res.status(500).send({message: 'Server couldnt invite user...'})
        }
    }
}

async function addProject(req: any, res: any){
    let projectIdAtAttemptedProjectName = {project_id: ''};
    let userTeamRoleCombo: any = [];
    let projectName = req.body.name; 
    let isProjectNameTakenOnTeam = true;
        
    try{
        userTeamRoleCombo = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserTeamRoleIdFlag);
        projectIdAtAttemptedProjectName = await projects.getProjectIdByTeamIdAndProjectName(userTeamRoleCombo.teamID, projectName)
    }catch(e){
        return res.status(500).send({message: 'Server couldnt check invite information...'})
    }

    projectIdAtAttemptedProjectName ? isProjectNameTakenOnTeam = true : isProjectNameTakenOnTeam = false
    let currentUserRoleID = userTeamRoleCombo.roleID; 
    //if the user is the owner of the team and there isnt a project for this team with this name already
    //then add project
    if(currentUserRoleID !== Roles.Legend.owner){
        return res.status(403).send({message: 'You are not allowed to create projects for this team...'})
    } else if(isProjectNameTakenOnTeam === true){
        return res.status(400).send({message: 'That name is already used by a project in this team...'})
    } else{
        try{
            await projects.addProject(userTeamRoleCombo.userID, userTeamRoleCombo.teamID, req.body.name, req.body.description)
        }catch(e){
            return res.status(500).send({message: 'Server couldnt add the project to this team...'})
        }
        return res.status(200).send({message: 'Added Project'})
    }
}

module.exports = { inviteUserToTeam, addProject }