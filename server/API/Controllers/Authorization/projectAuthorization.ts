import composeMemberDetails from '../../Services/composeMemberDetails';
import composeProjectStatistics from '../../Services/composeProjectStatistics';
import consumeCookie from '../../Services/consumeCookies/consumeCookie';
import { consumeCookieFlags } from "../../Services/consumeCookies/consumeCookieFlags";
import { consumeRowDataPacket } from '../../Services/consumeRowDataPacket';
import {translateTicketPriority} from '../../Services/translateTicketPriority';
let Roles = require('./Roles')
let tickets = require('../../Queries/ticketQueries')
let projects = require('../../Queries/projectQueries')
let users = require('../../Queries/userQueries')
let teams = require('../../Queries/teamQueries')

async function submitNewTicket(req: any, res: any) {
    console.log(req.body.project)
    let isUserOnProject = false;
    let isAssigneeOnProject = false;
    let userTeamRoleIds = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserTeamRoleIdFlag);
    let targetProjectID = req.body.assignee.project_id;
    let targetUserId = {user_id: ''}
    let ticketPriority = translateTicketPriority(req.body.priority);
    let relevant_project_id = {project_id: ''}    
    try{
        isUserOnProject = consumeRowDataPacket(await projects.isUserOnProject(userTeamRoleIds.userID, targetProjectID ));
        relevant_project_id = await projects.getProjectIdByTeamIdAndProjectName(userTeamRoleIds.teamID, req.body.project);
        //if there is an assignee, is the assigned user on the project?
        if(req.body.assignee === ''){
            isAssigneeOnProject = true
        } else {
            targetUserId = await users.getUserByNameDiscriminator(req.body.assignee.username, req.body.assignee.discriminator, res)
            isAssigneeOnProject = consumeRowDataPacket(await projects.isUserOnProject(targetUserId.user_id, targetProjectID))
        }    

    }catch(e){
        return res.status(500).send({message: 'Server couldnt find role information...'})
    }

    //if either current user or the assigned user are not on the project, throws 403
    if(isAssigneeOnProject === false){
        return res.status(403).send({message: 'The user youre assigning is not on that project...'})
    }

    // if they are the relevant_team_owner they can submit tickets to this project 
    if(userTeamRoleIds.roleID === Roles.Legend.owner || isUserOnProject === true){
        try{
            //now add the ticket
            let userTeamIDCombo = [userTeamRoleIds.userID, userTeamRoleIds.teamID]
            await tickets.addTicket(req, res, userTeamIDCombo, targetUserId.user_id, ticketPriority, relevant_project_id.project_id)
            return res.status(200).send({message: 'Submitted ticket'})
        } catch(e) {
            return res.status(500).send({message: 'Server couldnt submit ticket...'})
        }
    } else {
        return res.status(401).send({message: "You can't submit tickets to this project..."})
    }
}

async function getTickets(req: any, res: any){
    let userTeamRoleCombo: any = [];
    try{
        userTeamRoleCombo = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserTeamRoleIdFlag);
    }catch(e){
        return res.status(500).send({message: 'Server couldnt find role information...'})
    }

    //if the use is the owner, send them all tickets from the team
    //if they are a dev or project lead, send them only the tickets for their assigned projects
    if(userTeamRoleCombo.roleID === Roles.Legend.owner){
        try{
            let ticketList = await tickets.getTeamTickets(userTeamRoleCombo.teamID)
            return res.status(200).send(ticketList)
        }catch(e){
            return res.status(500).send({message: 'Server couldnt get tickets...'})
        }
    } else if(userTeamRoleCombo.roleID === Roles.Legend.lead || userTeamRoleCombo.roleID === Roles.Legend.dev){
        try{
            let ticketList = await tickets.getAssignedProjectTickets(userTeamRoleCombo.userID, userTeamRoleCombo.teamID)
            return res.status(200).send(ticketList)
        }catch(e){
            return res.status(500).send({message: 'Server couldnt get tickets...'})
        }
    } else{
        return res.status(500).send({mesage:  'Something went wrong...'})
    }
}

async function getProjectsStatistics(req: any, res: any){
    let userTeamRoleCombo: any = []
    try{
        userTeamRoleCombo = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserTeamRoleIdFlag);
    }catch(e){
        return res.status(500).send({message: 'Server couldnt find role information...'})
    }

    //if the use is the owner, send them all of the projects from the team
    //if they are a dev or project lead, send them only their assigned projects
    if(userTeamRoleCombo.roleID === Roles.Legend.owner){
        try{
            let projectTicketsList = await tickets.getTeamTickets(userTeamRoleCombo.teamID)   
           
            let stats = composeProjectStatistics(projectTicketsList);

            return res.status(200).send(stats)
        }catch(e){
            return res.status(500).send({message: 'Server couldnt get Projects... '})
        }
    } else if(userTeamRoleCombo.roleID === Roles.Legend.lead || userTeamRoleCombo.roleID === Roles.Legend.dev){
        try{
            let projectTicketsList = await tickets.getAssignedProjectTickets(userTeamRoleCombo.userID, userTeamRoleCombo.teamID)

            let stats = composeProjectStatistics(projectTicketsList);

            return res.status(200).send(stats)
        }catch(e){
            return res.status(500).send({message: 'Server couldnt get Projects...'})
        }
    } else{
        return res.status(500).send({mesage:  'Something went wrong...'})
    }
}

async function getRelatedMemberDetails(req: any, res: any){
    let userTeamRoleCombo: any = []
    try{
        userTeamRoleCombo = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserTeamRoleIdFlag);
    }catch(e){
        return res.status(500).send({message: 'Server couldnt find role information...'})
    }

    //Send everyone all the project member details for projects they are in. 
    //The owner is already in every project so additional logic is not needed
    try{
        let relatedMemberDetailsList = await projects.getRelatedMemberDetails(userTeamRoleCombo.userID, userTeamRoleCombo.teamID)
        let details = composeMemberDetails(relatedMemberDetailsList)
        return res.status(200).send(details)
    }catch(e){
        return res.status(500).send({message: 'Server couldnt get Projects...'})
    }
}

async function updateMemberRole(req: any, res: any){
    let userTeamRoleCombo: any = []
    let targetUser: any = null;
    let targetProjectID: any = null;
    let currentUserProjectRole: any = null;
    let targetUserProjectRole: any = null;

    try{
        userTeamRoleCombo = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserTeamRoleIdFlag);
        targetUser = await users.getUserByNameDiscriminator(req.body.username, req.body.discriminator)
        targetProjectID = await projects.getProjectIdByTeamIdAndProjectName(userTeamRoleCombo.teamID, req.body.targetProjectName)
        currentUserProjectRole = await projects.getRoleByUserIdProjectId(userTeamRoleCombo.userID, targetProjectID.project_id)
        targetUserProjectRole = await projects.getRoleByUserIdProjectId(targetUser.user_id, targetProjectID.project_id)
    }catch(e){
        return res.status(500).send({message: 'Server couldnt find role information...'})
    }

    //if the currentUser has higher perms than the targetUser, then edit the target user's role as requested
    if(currentUserProjectRole[0].role_id < targetUserProjectRole[0].role_id){
        try{
            await projects.updateMemberRole(targetUser.user_id, targetProjectID.project_id, req.body.newRoleId)
            return res.status(200).send({message: 'Role updated'})
        }catch(e){
            return res.status(500).send({message: 'Server couldnt update role...'})
        }
    } else {
        return res.status(400).send({message: 'You dont have the ability to edit that users role on this project'})
    }
}
async function getUsersOnTeam(req: any, res: any){
    let userTeamRoleCombo: any = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserTeamRoleIdFlag);
    try{
        let potentialProjectMembers = await teams.getUsersOnTeam(userTeamRoleCombo.teamID)
        return res.status(200).send(potentialProjectMembers)
    } catch(e){
        return res.status(500).send({message: 'Couldnt get team information from database...'})
    }
}
async function removeMember(req: any, res: any) {
    console.log(req.body)

    //if the user is 
}


module.exports = { 
    submitNewTicket,
    getTickets, 
    getProjectsStatistics, 
    getRelatedMemberDetails,
    updateMemberRole,
    getUsersOnTeam,
    removeMember
}