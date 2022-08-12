import * as Express from 'express';
import { Teammate } from '../../Interfaces/teammate.js';
import composeMemberDetails from '../../Services/composeMemberDetails.js';
import composeProjectStatistics from '../../Services/composeProjectStatistics.js';
import consumeCookie, {
    userTeamRoleCombo,
} from '../../Services/consumeCookies/consumeCookie.js';
import { consumeCookieFlags } from '../../Services/consumeCookies/consumeCookieFlags.js';
import { consumeRowDataPacket } from '../../Services/consumeRowDataPacket.js';
import getCurrentDate from '../../Services/getCurrentDate.js';
import * as Roles from './Roles.js'
import * as tickets from '../../Queries/ticketQueries.js'
import * as projects from '../../Queries/projectQueries.js'
import * as users from '../../Queries/userQueries.js'
import * as teams from '../../Queries/teamQueries.js'

async function submitNewTicket(req: any, res: any) {
    let isUserOnProject = false;
    let isAssigneeOnProject = false;
    let userTeamRoleIds = consumeCookie(
        req.headers.cookie,
        consumeCookieFlags.tokenUserTeamRoleIdFlag
    );
    let targetUserId: any = { user_id: '' };
    let ticketPriority = req.body.priority;
    let relevant_project_id = { project_id: '' };
    try {
        relevant_project_id = await projects.getProjectIdByTeamIdAndProjectName(
            userTeamRoleIds.teamID,
            req.body.project
        );
        isUserOnProject = consumeRowDataPacket(
            await projects.isUserOnProject(
                userTeamRoleIds.userID,
                relevant_project_id.project_id
            )
        );
        //if there is an assignee, is the assigned user on the project?
        if (req.body.assignee.username === 'none') {
            isAssigneeOnProject = true;
            targetUserId = { user_id: null };
        } else {
            targetUserId = await users.getUserByNameDiscriminator(
                req.body.assignee.username,
                req.body.assignee.discriminator
            );
            isAssigneeOnProject = consumeRowDataPacket(
                await projects.isUserOnProject(
                    targetUserId.user_id,
                    relevant_project_id.project_id
                )
            );
        }
    } catch (e) {
        return res
            .status(500)
            .send({ message: 'Server couldnt find role information...' });
    }
    //if either current user or the assigned user are not on the project, throws 403
    if (isAssigneeOnProject === false) {
        return res
            .status(403)
            .send({
                message: 'The user youre assigning is not on that project...',
            });
    }
    // if they are the relevant_team_owner they can submit tickets to this project
    if (
        userTeamRoleIds.roleID === Roles.Legend.owner ||
        isUserOnProject === true
    ) {
        try {
            //now add the ticket
            let userTeamIDCombo = [
                userTeamRoleIds.userID,
                userTeamRoleIds.teamID,
            ];
            let newTicketIdPacket = await tickets.addTicket(
                req,
                res,
                userTeamIDCombo,
                targetUserId.user_id,
                ticketPriority,
                relevant_project_id.project_id
            );
            let ticket = await tickets.getNewTicket(newTicketIdPacket.insertId);
            return res
                .status(200)
                .send({ message: 'Submitted ticket', ticket: ticket[0] });
        } catch (e) {
            return res
                .status(500)
                .send({ message: 'Server couldnt submit ticket...' });
        }
    } else {
        return res
            .status(401)
            .send({ message: "You can't submit tickets to this project..." });
    }
}
async function getTickets(req: any, res: any) {
    let userTeamRoleCombo: any = [];
    try {
        userTeamRoleCombo = consumeCookie(
            req.headers.cookie,
            consumeCookieFlags.tokenUserTeamRoleIdFlag
        );
    } catch (e) {
        return res
            .status(500)
            .send({ message: 'Server couldnt find role information...' });
    }
    //if the use is the owner, send them all tickets from the team
    //if they are a dev or project lead, send them only the tickets for their assigned projects
    if (userTeamRoleCombo.roleID === Roles.Legend.owner) {
        try {
            let ticketList = await tickets.getTeamTickets(
                userTeamRoleCombo.teamID
            );
            return res.status(200).send(ticketList);
        } catch (e) {
            return res
                .status(500)
                .send({ message: 'Server couldnt get tickets...' });
        }
    } else if (
        userTeamRoleCombo.roleID === Roles.Legend.lead ||
        userTeamRoleCombo.roleID === Roles.Legend.dev
    ) {
        try {
            let ticketList = await tickets.getAssignedProjectTickets(
                userTeamRoleCombo.userID,
                userTeamRoleCombo.teamID
            );
            return res.status(200).send(ticketList);
        } catch (e) {
            return res
                .status(500)
                .send({ message: 'Server couldnt get tickets...' });
        }
    } else {
        return res.status(500).send({ mesage: 'Something went wrong...' });
    }
}
async function getProjectsStatistics(req: any, res: any) {
    let userTeamRoleCombo: any = [];
    try {
        userTeamRoleCombo = consumeCookie(
            req.headers.cookie,
            consumeCookieFlags.tokenUserTeamRoleIdFlag
        );
    } catch (e) {
        return res
            .status(500)
            .send({ message: 'Server couldnt find role information...' });
    }
    //if the use is the owner, send them all of the projects from the team
    //if they are a dev or project lead, send them only their assigned projects
    if (userTeamRoleCombo.roleID === Roles.Legend.owner) {
        try {
            let projectTicketsList = await tickets.getTeamTickets(
                userTeamRoleCombo.teamID
            );

            let stats = composeProjectStatistics(projectTicketsList);

            return res.status(200).send(stats);
        } catch (e) {
            return res
                .status(500)
                .send({ message: 'Server couldnt get Projects... ' });
        }
    } else if (
        userTeamRoleCombo.roleID === Roles.Legend.lead ||
        userTeamRoleCombo.roleID === Roles.Legend.dev
    ) {
        try {
            let projectTicketsList = await tickets.getAssignedProjectTickets(
                userTeamRoleCombo.userID,
                userTeamRoleCombo.teamID
            );

            let stats = composeProjectStatistics(projectTicketsList);

            return res.status(200).send(stats);
        } catch (e) {
            return res
                .status(500)
                .send({ message: 'Server couldnt get Projects...' });
        }
    } else {
        return res.status(500).send({ mesage: 'Something went wrong...' });
    }
}
async function getRelatedMemberDetails(req: any, res: any) {
    let userTeamRoleCombo: any = [];
    try {
        userTeamRoleCombo = consumeCookie(
            req.headers.cookie,
            consumeCookieFlags.tokenUserTeamRoleIdFlag
        );
    } catch (e) {
        return res
            .status(500)
            .send({ message: 'Server couldnt find role information...' });
    }
    //Send everyone all the project member details for projects they are in.
    //The owner needs to get the details for every user in every project
    let relatedMemberDetailsList = [];
    try {
        if (userTeamRoleCombo.roleID !== 1) {
            relatedMemberDetailsList = await projects.getRelatedMemberDetails(
                userTeamRoleCombo.userID,
                userTeamRoleCombo.teamID
            );
        } else if (userTeamRoleCombo.roleID === 1) {
            relatedMemberDetailsList = await projects.getAllMemberDetails(
                userTeamRoleCombo.teamID
            );
        }
        let details = composeMemberDetails(relatedMemberDetailsList);
        return res.status(200).send(details);
    } catch (e) {
        return res
            .status(500)
            .send({ message: 'Server couldnt get Projects...' });
    }
}
interface Role_Id {
    role_id: number;
}
async function addListOfMembersToProject(req: any, res: any) {
    let userTeamRoleCombo: userTeamRoleCombo = consumeCookie(
        req.headers.cookie,
        consumeCookieFlags.tokenUserTeamRoleIdFlag
    );
    let newMembers: Teammate[] = req.body.newMembers;
    let newMembersIds: number[] | null = null;
    let projectName: string = req.body.projectName;
    let userProjectRoleId: number | null = null;
    let targetProjectId: number | null = null;
    let allTeammates: any[] = [];
    let currentProjectMembers: Teammate[] | null = null;
    let userProjectRoleIdPacket: any = [];

    //get a list of all teammates, check that these users are on the list and if they are, add them all to the project with a dev role
    try {
        let targetProjectIdPacket =
            await projects.getProjectIdByTeamIdAndProjectName(
                userTeamRoleCombo.teamID,
                projectName
            );
        targetProjectId = targetProjectIdPacket.project_id;
        userProjectRoleIdPacket = await projects.getRoleByUserIdProjectId(
            userTeamRoleCombo.userID,
            targetProjectId!
        );
        if (userProjectRoleIdPacket.length === 0) {
            userProjectRoleIdPacket = [{ role_id: -1 }];
        }
        allTeammates = await teams.getUsersOnTeam(userTeamRoleCombo.teamID.toString());
        currentProjectMembers = await projects.getProjectMembersByProjectId(
            targetProjectId!
        );
    } catch (e) {
        return res
            .status(500)
            .send({ message: 'Server couldnt check authorization levels...' });
    }
    try {
        async function getNewMemberIds(newMembers: Teammate[]) {
            let ids: number[] = [];
            //there has to be a better way, the challenge isnt getting the sql to check for many users or for multiple conditions
            //the challenge is getting sql to check for the exact username/discriminator combo for many users
            for (let i = 0; i < newMembers.length; i++) {
                let idPacket = await users.getUserByNameDiscriminator(
                    newMembers[i].username,
                    newMembers[i].discriminator
                );
                ids?.push(idPacket.user_id);
            }
            return ids;
        }
        newMembersIds = await getNewMemberIds(newMembers);
    } catch (e) {
        return res
            .status(500)
            .send({ message: 'Server couldnt get new member information...' });
    }

    //if the user isnt a project lead, send a 403
    if (userTeamRoleCombo.roleID !== 1) {
        userProjectRoleId = userProjectRoleIdPacket[0].role_id;
        if (userProjectRoleId !== 1 && userProjectRoleId !== 2) {
            return res.status(403).send({
                message: `You are not allowed to add users to the ${req.body.projectName} project...`,
            });
        }
    }

    //if any of the users arent on the team, send a 400
    let usersNotOnTeamIdxArray: number[] = [];
    newMembers.forEach((member: Teammate) => {
        let idx: number | null = null;
        idx = allTeammates.findIndex((teammate: Teammate) => {
            return (
                member.username === teammate.username &&
                member.discriminator === teammate.discriminator
            );
        });
        if (idx === -1 || idx === null) {
            usersNotOnTeamIdxArray.push(idx);
        }
    });
    if (usersNotOnTeamIdxArray.length > 0) {
        return res
            .status(400)
            .send({
                message: 'One or more of these users are not on the team...',
            });
    }
    //if any of the users are already on the project, send a 400
    let usersOnProjectIdxArray: number[] = [];
    newMembers.forEach((member: Teammate) => {
        let idx = currentProjectMembers!.findIndex((teammate: Teammate) => {
            return (
                member.username === teammate.username &&
                member.discriminator === teammate.discriminator
            );
        });
        if (idx !== -1) {
            usersOnProjectIdxArray.push(idx);
        }
    });
    if (usersOnProjectIdxArray.length > 0) {
        return res.status(400).send({
            message: 'One or more of these users are already in the project...',
        });
    }

    try {
        await projects.addListOfUsersToProject(
            newMembersIds,
            targetProjectId!,
            userTeamRoleCombo.teamID,
            userTeamRoleCombo.userID
        );
        return res
            .status(200)
            .send({ message: 'Server added the users to the project' });
    } catch (e) {
        return res
            .status(500)
            .send({ message: 'Server couldnt add the users the project...' });
    }
}
async function updateMemberRole(req: any, res: any) {
    let userTeamRoleCombo: any = [];
    let targetUser: any = null;
    let targetProjectID: any = null;
    let currentUserProjectRolePacket: any = null;
    let currentUserProjectRole: any = null;
    let targetUserProjectRolePacket: any = null;
    let targetUserProjectRole: any = null;
    try {
        userTeamRoleCombo = consumeCookie(
            req.headers.cookie,
            consumeCookieFlags.tokenUserTeamRoleIdFlag
        );
        targetUser = await users.getUserByNameDiscriminator(
            req.body.username,
            req.body.discriminator
        );
        targetProjectID = await projects.getProjectIdByTeamIdAndProjectName(
            userTeamRoleCombo.teamID,
            req.body.targetProjectName
        );
        currentUserProjectRolePacket = await projects.getRoleByUserIdProjectId(
            userTeamRoleCombo.userID,
            targetProjectID.project_id
        );
        if (currentUserProjectRolePacket.length > 0) {
            currentUserProjectRole = currentUserProjectRolePacket[0].role_id;
        }
        targetUserProjectRolePacket = await projects.getRoleByUserIdProjectId(
            targetUser.user_id,
            targetProjectID.project_id
        );
        if (currentUserProjectRolePacket.length > 0) {
            targetUserProjectRole = targetUserProjectRolePacket[0].role_id;
        }
    } catch (e) {
        return res
            .status(500)
            .send({ message: 'Server couldnt find role information...' });
    }
    //if the currentUser has higher perms than the targetUser, then edit the target user's role as requested
    if (
        (currentUserProjectRole !== null &&
            targetUserProjectRole !== null &&
            currentUserProjectRole < targetUserProjectRole) ||
        userTeamRoleCombo.roleID === 1
    ) {
        try {
            await projects.updateMemberRole(
                targetUser.user_id,
                targetProjectID.project_id,
                req.body.newRoleId
            );
            return res.status(200).send({ message: 'Role updated' });
        } catch (e) {
            return res
                .status(500)
                .send({ message: 'Server couldnt update role...' });
        }
    } else {
        return res.status(400).send({
            message:
                'You dont have the ability to edit that users role on this project...',
        });
    }
}
async function getUsersOnTeam(req: any, res: any) {
    let userTeamRoleCombo: any = consumeCookie(
        req.headers.cookie,
        consumeCookieFlags.tokenUserTeamRoleIdFlag
    );
    try {
        let potentialProjectMembers = await teams.getUsersOnTeam(
            userTeamRoleCombo.teamID
        );
        return res.status(200).send(potentialProjectMembers);
    } catch (e) {
        return res
            .status(500)
            .send({ message: 'Couldnt get team information from database...' });
    }
}
async function removeMember(req: any, res: any) {
    let userTeamRoleCombo: userTeamRoleCombo = consumeCookie(
        req.headers.cookie,
        consumeCookieFlags.tokenUserTeamRoleIdFlag
    );
    let userProjectRoleId: number | null = null;
    let targetUserProjectRoleId: number | null = null;
    let targetProjectId: number | null = null;
    let targetUserId: number | null = null;
    try {
        let targetProjectIdPacket =
            await projects.getProjectIdByTeamIdAndProjectName(
                userTeamRoleCombo.teamID,
                req.body.project
            );
        targetProjectId = targetProjectIdPacket.project_id;
        let userProjectRoleIdPacket = await projects.getRoleByUserIdProjectId(
            userTeamRoleCombo.userID,
            targetProjectId!
        );
        if (userProjectRoleIdPacket.length > 0) {
            userProjectRoleId = userProjectRoleIdPacket[0].role_id;
        }
        let targetUserProjectRoleIdPacket =
            await projects.getRoleByUsernameDiscriminatorProjectId(
                req.body.username,
                req.body.discriminator,
                targetProjectId!
            );
        if (targetUserProjectRoleIdPacket.length > 0) {
            targetUserProjectRoleId = targetUserProjectRoleIdPacket[0].role_id;
        }
        let targetUserIdPacket = await users.getUserByNameDiscriminator(
            req.body.username,
            req.body.discriminator
        );
        targetUserId = targetUserIdPacket.user_id;
    } catch (e) {
        return res
            .status(500)
            .send({ message: 'Server couldnt check authorization levels...' });
    }
    //if the user has a role_id less than the target user, they can remove the target user as a member of the project
    if (
        (targetUserProjectRoleId !== null &&
            userProjectRoleId !== null &&
            userProjectRoleId! < targetUserProjectRoleId!) ||
        userTeamRoleCombo.roleID === 1
    ) {
        try {
            await projects.transactionRemoveTargetUserFromProject(
                targetUserId!,
                targetProjectId!
            );
            return res
                .status(200)
                .send({ message: 'Removed member from the project' });
        } catch (e) {
            return res
                .status(500)
                .send({
                    message: 'Server couldnt remove member from the project...',
                });
        }
    } else {
        return res.status(403).send({
            message: `You are not authorized to remove ${req.body.username} #${req.body.discriminator} from the ${req.body.project} project...`,
        });
    }
}
async function addProjectComment(req: Express.Request, res: Express.Response) {
  let userTeamRoleCombo: userTeamRoleCombo = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserTeamRoleIdFlag);
  let isUserOnProject = false;
  let projectId: number | null = null
  try{
    let projectIdPacket = await projects.getProjectIdByTeamIdAndProjectName(userTeamRoleCombo.teamID, req.body.project_name)
    projectId = projectIdPacket.project_id
    let isUserOnProjectPacket = await projects.isUserOnProject(userTeamRoleCombo.userID, projectId)
    isUserOnProject = consumeRowDataPacket(isUserOnProjectPacket)
  }catch(e){
    return res.status(500).send({message: 'Server couldnt check authorization...'})
  }
  if((isUserOnProject !== true) && (userTeamRoleCombo.roleID !== Roles.Legend.owner)){
    return res.status(400).send({message: 'You cannot comment on this project...'})
  } else {
    try{
      let insertIDPacket = await projects.addProjectComment(req.body.comment, projectId!, userTeamRoleCombo.userID, getCurrentDate())
      let insertId = insertIDPacket.insertId
      return res.status(200).send({insertId: insertId})
    }catch(e){
      return res.status(500).send({message: 'Server couldnt add comment...'})
    }
  }
}
async function getProjectComments(req: Express.Request, res: Express.Response){
  let userTeamRoleCombo: userTeamRoleCombo = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserTeamRoleIdFlag);
  try{
    if(userTeamRoleCombo.roleID !== Roles.Legend.owner){
      let comments = await projects.getUsersProjectsComments(userTeamRoleCombo.userID, userTeamRoleCombo.teamID)
      return res.status(200).send(comments)
    } else if(userTeamRoleCombo.roleID === Roles.Legend.owner){
      let comments = await projects.getAllTeamProjectComments(userTeamRoleCombo.teamID)
      return res.status(200).send(comments)
    }
  }catch(e){
    return res.status(500).send({message: 'Server couldnt get comments...'})
  }
  
}

export {
    submitNewTicket,
    getTickets,
    getProjectsStatistics,
    getRelatedMemberDetails,
    updateMemberRole,
    getUsersOnTeam,
    removeMember,
    addListOfMembersToProject,
    addProjectComment,
    getProjectComments
};
