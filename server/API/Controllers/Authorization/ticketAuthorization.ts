import * as Express from 'express'
import consumeCookie, { userTeamRoleCombo } from '../../Services/consumeCookies/consumeCookie';
import { consumeCookieFlags } from '../../Services/consumeCookies/consumeCookieFlags';
let tickets = require('../../Queries/ticketQueries')
let projects = require('../../Queries/projectQueries')

async function getTicketNotes(req: Express.Request, res: Express.Response){
    let userTeamRoleCombo: userTeamRoleCombo = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserTeamRoleIdFlag);
    let allNotes: [] = []
    //if the use is the owner, send them all ticket notes from the team
    //if they are a dev or project lead, send them only the ticket notes for their assigned projects
    if(userTeamRoleCombo.roleID === 1){
        try{
            allNotes = await tickets.getAllTicketNotes(userTeamRoleCombo.teamID)
            return res.status(200).send(allNotes)
        } catch(e){
            return res.status(500).send({message: 'Server couldnt fetch the notes...'})
        }
    } else if(userTeamRoleCombo.roleID === 2 || userTeamRoleCombo.roleID === 3){
        try{
            allNotes = await tickets.getAssignedProjectTicketNotes(userTeamRoleCombo.userID, userTeamRoleCombo.teamID)
            return res.status(200).send(allNotes)
        } catch(e){
            return res.status(500).send({message: 'Server couldnt fetch the notes...'})
        }
    }
}

async function submitTicketComment(req: Express.Request, res: Express.Response){
    let userTeamRoleCombo: userTeamRoleCombo = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserTeamRoleIdFlag);
    let newComment: string = req.body.comment;
    let ticket: any = null;
    let projectMembersIds: number[] | null = null;
    let isUserAllowedToComment: boolean = false;

    try{
        let ticketPacket = await tickets.getTicketByID(req.body.ticketID)
        ticket = ticketPacket[0]
        projectMembersIds = await projects.projectMembersIdsByProjectId(req.body.projectID)
        let isUserIDInMembersList = projectMembersIds?.findIndex((member: any)=>{if(member.user_id === userTeamRoleCombo.userID){return true}}) !== -1
        isUserAllowedToComment = isUserIDInMembersList || userTeamRoleCombo.roleID === 1
    }catch(e){
        return res.status(500).send({message: 'Server couldnt get the ticket information...'})
    }

    if(ticket.relevant_project_id !== req.body.projectID){
        return res.status(400).send({message: 'That ticket isnt for this project...'})
    }else if(isUserAllowedToComment === true){
        let result = await tickets.addTicketComment(ticket.ticket_id, userTeamRoleCombo.userID, newComment)
        return res.status(200).send({insertID: result.insertId})
    }else{
        return res.status(403).send({message: 'You are not allowed to comment on this ticket...'})
    }
}




module.exports = {
    submitTicketComment,
    getTicketNotes
}