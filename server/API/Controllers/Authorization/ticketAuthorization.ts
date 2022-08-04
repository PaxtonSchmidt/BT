import * as Express from 'express';
import consumeCookie, {
  userTeamRoleCombo,
} from '../../Services/consumeCookies/consumeCookie';
import { consumeCookieFlags } from '../../Services/consumeCookies/consumeCookieFlags';
import { consumeRowDataPacket } from '../../Services/consumeRowDataPacket';
import {
  translateTicketPriority,
  translateTicketPriorityBack,
} from '../../Services/translateTicketPriority';
let tickets = require('../../Queries/ticketQueries');
let projects = require('../../Queries/projectQueries');
let users = require('../../Queries/userQueries');

async function getTicketNotes(req: Express.Request, res: Express.Response) {
  let userTeamRoleCombo: userTeamRoleCombo = consumeCookie(
    req.headers.cookie,
    consumeCookieFlags.tokenUserTeamRoleIdFlag
  );
  let allNotes: [] = [];
  //if the use is the owner, send them all ticket notes from the team
  //if they are a dev or project lead, send them only the ticket notes for their assigned projects
  if (userTeamRoleCombo.roleID === 1) {
    try {
      allNotes = await tickets.getAllTicketNotes(userTeamRoleCombo.teamID);
      return res.status(200).send(allNotes);
    } catch (e) {
      return res
        .status(500)
        .send({ message: 'Server couldnt fetch the notes...' });
    }
  } else if (userTeamRoleCombo.roleID === 2 || userTeamRoleCombo.roleID === 3) {
    try {
      allNotes = await tickets.getAssignedProjectTicketNotes(
        userTeamRoleCombo.userID,
        userTeamRoleCombo.teamID
      );
      return res.status(200).send(allNotes);
    } catch (e) {
      return res
        .status(500)
        .send({ message: 'Server couldnt fetch the notes...' });
    }
  }
}

async function submitTicketComment( req: Express.Request,  res: Express.Response) {
  let userTeamRoleCombo: userTeamRoleCombo = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserTeamRoleIdFlag);
  let newComment: string = req.body.comment;
  let ticket: any = null;
  let projectMembersIds: number[] | null = null;
  let isUserAllowedToComment: boolean = false;

  try {
    let ticketPacket = await tickets.getTicketByID(req.body.ticketID);
    ticket = ticketPacket[0];
    projectMembersIds = await projects.projectMembersIdsByProjectId(
      req.body.projectID
    );
    let isUserIDInMembersList =
      projectMembersIds?.findIndex((member: any) => {
        if (member.user_id === userTeamRoleCombo.userID) {
          return true;
        }
      }) !== -1;
    isUserAllowedToComment = isUserIDInMembersList;
  } catch (e) {
    return res
      .status(500)
      .send({ message: 'Server couldnt get the ticket information...' });
  }

  if (ticket.relevant_project_id !== req.body.projectID) {
    return res
      .status(400)
      .send({ message: 'That ticket isnt for this project...' });
  } else if (isUserAllowedToComment === true) {
    let result = await tickets.addTicketComment(
      ticket.ticket_id,
      userTeamRoleCombo.userID,
      newComment
    );
    return res.status(200).send({ insertID: result.insertId });
  } else {
    return res
      .status(403)
      .send({ message: 'You are not allowed to comment on this ticket...' });
  }
}

async function putEditTicket(req: Express.Request, res: Express.Response) {
  let userTeamRoleCombo: userTeamRoleCombo = consumeCookie(
    req.headers.cookie,
    consumeCookieFlags.tokenUserTeamRoleIdFlag
  );
  let isTargetUserOnProject: boolean = false;
  let targetUserID: number | null = null;
  let isUserProjectLead: boolean = false;
  try {
    if (req.body.assignee_discriminator !== null) {
      let targetUserIDPacket = await users
        .getUserByNameDiscriminator(
          req.body.assignee_username,
          req.body.assignee_discriminator,
          res
        )
        .catch();
      targetUserID = targetUserIDPacket.user_id;
      let isTargetUserOnProjectPacket = await projects
        .isUserOnProjectByNameDiscriminator(
          req.body.assignee_username,
          req.body.assignee_discriminator,
          req.body.project_id
        )
        .catch();
      isTargetUserOnProject = consumeRowDataPacket(isTargetUserOnProjectPacket);
    } else {
      targetUserID = null;
      isTargetUserOnProject = true;
    }

    if (userTeamRoleCombo.roleID !== 1) {
      let isUserProjectLeadPacket = await projects
        .getRoleByUserIdProjectId(userTeamRoleCombo.userID, req.body.project_id)
        .catch();
      isUserProjectLead =
        isUserProjectLeadPacket[0].role_id === 1 ||
        isUserProjectLeadPacket[0].role_id === 2;
    }
  } catch (e) {
    return res
      .status(500)
      .send({ message: 'Server couldnt check authorization information...' });
  }
  //if the user is a lead on the project or team_owner, they can edit the ticket
  //if the assignee is on the project, they can be added as the assignee
  if (isTargetUserOnProject === false) {
    return res
      .status(400)
      .send({ message: 'That user cannot be assigned to this ticket...' });
  }
  if (userTeamRoleCombo.roleID === 1 || isUserProjectLead) {
    try {
      console.log(req.body);
      // ticket_id: number, assigned_user_id: number , description: string, resolution_status: number
      console.log(req.body.priority);
      let updateResult = await tickets
        .putEditTicket(
          req.body.target_ticket_id,
          targetUserID,
          req.body.description,
          req.body.resolution_status,
          req.body.priority
        )
        .catch();
      console.log(updateResult);
      return res.status(200).send({ message: 'Updated ticket' });
    } catch (e) {
      return res
        .status(500)
        .send({ message: 'Server couldnt update ticket...' });
    }
  } else {
    return res
      .status(403)
      .send({ message: 'You are not allowed to edit this ticket...' });
  }
}

module.exports = {
  submitTicketComment,
  getTicketNotes,
  putEditTicket,
};
