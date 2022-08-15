import e from 'express';
import * as Express from 'express';
import consumeCookie, {
  userTeamRoleCombo,
} from '../../Services/consumeCookies/consumeCookie.js';
import { consumeCookieFlags } from '../../Services/consumeCookies/consumeCookieFlags.js';
import { consumeRowDataPacket } from '../../Services/consumeRowDataPacket.js';
import composeTeammateInfo, {
  TeammatesInformation,
} from '../../Services/composeTeammateInfo.js';
import composeTeamDetails from '../../Services/composeTeamDetails.js';
import * as teamQueries from '../../Queries/teamQueries.js'
import * as Roles from './Roles.js'
import * as users from '../../Queries/userQueries.js'
import * as teams from '../../Queries/teamQueries.js'
import * as projects from '../../Queries/projectQueries.js'

async function inviteUserToTeam(req: any, res: any) {
  let userTeamRoleCombo: userTeamRoleCombo = consumeCookie(
    req.headers.cookie,
    consumeCookieFlags.tokenUserTeamRoleIdFlag
  );
  let isAlreadyOnTeam = true;
  let isInviteExisting = true;
  let recipientID = '';

  try {
    let recipient = await users.getUserByNameDiscriminator(
      req.body.invitee,
      req.body.discriminator
    );
    recipientID = recipient.user_id;
    if (recipientID === undefined) {
      throw e;
    }
  } catch (e) {
    return res.status(400).send({ message: 'That user doesnt exist...' });
  }
  try {
    isInviteExisting = consumeRowDataPacket(
      await teams.getInviteByRecipientIDTeamID(
        recipientID,
        userTeamRoleCombo.teamID.toString(),
        res
      )
    );
    isAlreadyOnTeam = consumeRowDataPacket(
      await teams.fetchIsOnTeam(recipientID, userTeamRoleCombo.teamID.toString())
    );
  } catch (e) {
    return res
      .status(500)
      .send({ message: 'Server couldnt check invite information...' });
  }
  //if user is the owner they can invite others to the team if the recipient isnt already on the
  //team, the recipient exists and the invite doesnt already exist
  if (
    userTeamRoleCombo.roleID !== Roles.Legend.owner &&
    userTeamRoleCombo.roleID !== Roles.Legend.lead
  ) {
    return res
      .status(401)
      .send({ message: "You can't invite people to this team..." });
  } else if (isAlreadyOnTeam === true) {
    return res
      .status(409)
      .send({
        message: `${req.body.invitee}#${req.body.discriminator} is already on this team...`,
      });
  } else if (isInviteExisting === true) {
    return res.status(400).send({ message: 'Invite already exists...' });
  } else {
    try {
      let userTeamIDCombo = {
        userID: userTeamRoleCombo.userID,
        teamID: userTeamRoleCombo.teamID,
      };
      //now add the invite
      await teamQueries.addTeamInvite(req, res, userTeamIDCombo, recipientID);
      return res.status(200).send({ message: 'Invited user' });
    } catch (e) {
      return res.status(500).send({ message: 'Server couldnt invite user...' });
    }
  }
}
async function addProject(req: any, res: any) {
  let userTeamRoleCombo = consumeCookie(
    req.headers.cookie,
    consumeCookieFlags.tokenUserTeamRoleIdFlag
  );
  let projectIdAtAttemptedProjectName = { project_id: '' };
  let projectName = req.body.name;
  let isProjectNameTakenOnTeam = true;
  let amountOfTeamProjects: number | null = null

  try {
    projectIdAtAttemptedProjectName =
    await projects.getProjectIdByTeamIdAndProjectName(
      userTeamRoleCombo.teamID,
      projectName
    );
    let amountOfTeamProjectsPacket = await teams.getProjectCount(userTeamRoleCombo.teamID)
    amountOfTeamProjects = Object.values<number>(amountOfTeamProjectsPacket[0])[0]
  } catch (e) {
    return res
      .status(500)
      .send({ message: 'Server couldnt check invite information...' });
  }
  let projectLimit = 10
  if(amountOfTeamProjects !== null && (amountOfTeamProjects >= projectLimit)){
    return res.status(400).send({message: `There is a maximum of ${projectLimit} projects per team...`})
  }

  projectIdAtAttemptedProjectName
    ? (isProjectNameTakenOnTeam = true)
    : (isProjectNameTakenOnTeam = false);
  let currentUserRoleID = userTeamRoleCombo.roleID;
  //if the user is the owner of the team and there isnt a project for this team with this name already
  //then add project
  if (
    currentUserRoleID !== Roles.Legend.owner &&
    currentUserRoleID !== Roles.Legend.lead
  ) {
    return res
      .status(403)
      .send({
        message: 'You are not allowed to create projects for this team...',
      });
  } else if (isProjectNameTakenOnTeam === true) {
    return res
      .status(400)
      .send({
        message: 'There is already a project with that name on this team...',
      });
  } else {
    let role: number = -1;
    if (userTeamRoleCombo.roleID === 1) {
      role = 1; //project role for people who are TEAM OWNER and make the project
    } else {
      role = 2; //project role for people who are a TEAM LEAD and make the project
    }
    try {
      let project_id = await projects.addProject(
        userTeamRoleCombo.userID,
        userTeamRoleCombo.teamID,
        req.body.name,
        req.body.description,
        role
      );
      return res
        .status(200)
        .send({ message: 'Added Project', project_id: project_id });
    } catch (e) {
      return res
        .status(500)
        .send({ message: 'Server couldnt add the project to this team...' });
    }
  }
}
async function getTeammatesInformation(
  req: Express.Request,
  res: Express.Response
) {
  let userTeamRoleCombo: userTeamRoleCombo = consumeCookie(
    req.headers.cookie,
    consumeCookieFlags.tokenUserTeamRoleIdFlag
  );
  let teammatesInformation: TeammatesInformation[] = [];
  if (userTeamRoleCombo.roleID === 1 || userTeamRoleCombo.roleID === 2) {
    try {
      let teammateInfoPacket: any = await teams.getTeammatesInfo(
        userTeamRoleCombo.teamID
      );
      let teammateAssignedProjectsPacket: any =
        await teams.getTeammatesAssignedProjects(userTeamRoleCombo.teamID);
      teammatesInformation = composeTeammateInfo(
        teammateInfoPacket,
        teammateAssignedProjectsPacket
      );
      return res.status(200).send(teammatesInformation);
    } catch (e) {
      return res
        .status(500)
        .send({ message: 'Server couldnt get teammates information...' });
    }
  } else {
    return res
      .status(403)
      .send({
        message:
          "You do not have the ability to see all of your teammates' information...",
      });
  }
}
async function getTeamDetails(req: Express.Request, res: Express.Response) {
  let userTeamRoleCombo: userTeamRoleCombo = consumeCookie(
    req.headers.cookie,
    consumeCookieFlags.tokenUserTeamRoleIdFlag
  );
  if (userTeamRoleCombo.roleID === 1 || userTeamRoleCombo.roleID === 2) {
    try {
      let ticketCount = await teams.getTicketCount(userTeamRoleCombo.teamID);
      let teamDetailsPacket = await teams.getTeamDetailsPacket(
        userTeamRoleCombo.teamID
      );
      let teamMemberCount = await teams.getTeammateCount(
        userTeamRoleCombo.teamID
      );
      let teamDetails = composeTeamDetails(
        ticketCount[0],
        teamMemberCount[0],
        teamDetailsPacket[0]
      );
      return res.status(200).send(teamDetails);
    } catch (e) {
      return res
        .status(500)
        .send({ message: 'Server couldnt get team details...' });
    }
  } else {
    return res
      .status(403)
      .send({
        message: 'You do not have permission to acccess this information...',
      });
  }
}
async function putUpdateTeammateRole(
  req: Express.Request,
  res: Express.Response
) {
  let userTeamRoleCombo: userTeamRoleCombo = consumeCookie(
    req.headers.cookie,
    consumeCookieFlags.tokenUserTeamRoleIdFlag
  );
  let isTargetUserOnTeam: boolean = false;
  let isTargetUserValidRole: boolean = false;
  async function checkIsTargetUserOnTeam(
    targetUsername: string,
    targetDiscriminator: number,
    teamID: number
  ): Promise<boolean> {
    try {
      let responsePacket =
        await teams.fetchIsOnTeamByUsernameDiscriminatorTeamID(
          targetUsername,
          targetDiscriminator,
          teamID.toString()
        );
      if (Object.values(responsePacket[0])[0] === 1) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  async function getTargetUserID() {
    try {
      let targetUserIdPacket: any = await users.getUserByNameDiscriminator(
        req.body.username,
        req.body.discriminator
      );
      return targetUserIdPacket.user_id;
    } catch (e) {
      return e;
    }
  }
  async function updateUserTeamRole(targetUserId: number) {
    try {
      let result = await teams.putUpdateTeammateRole(
        targetUserId,
        req.body.newRole,
        userTeamRoleCombo.teamID
      );
      return result;
    } catch (e) {
      return e;
    }
  }
  async function getTargetUserRoleID() {
    try {
      let targetRolePacket: any = await teams
        .getRoleIDByUsernameDiscriminatorTeamID(
          req.body.username,
          req.body.discriminator,
          userTeamRoleCombo.teamID
        )
        .catch(e);
      return targetRolePacket[0].role_id;
    } catch (e) {
      return e;
    }
  }
  let targetRoleId = await getTargetUserRoleID();
  if (targetRoleId === 2 || targetRoleId === 3) {
    isTargetUserValidRole = true;
  }
  isTargetUserOnTeam = await checkIsTargetUserOnTeam(
    req.body.username,
    req.body.discriminator,
    userTeamRoleCombo.teamID
  );
  if (
    isTargetUserOnTeam === true &&
    userTeamRoleCombo.roleID === 1 &&
    isTargetUserValidRole
  ) {
    try {
      let targetUserId: any = await getTargetUserID();
      updateUserTeamRole(targetUserId);
      return res
        .status(200)
        .send({ message: 'Server updated target users role' });
    } catch (e) {
      return res
        .status(500)
        .send({ message: 'Server couldnt update the users role...' });
    }
  } else {
    return res
      .status(403)
      .send({
        message: 'You do not have permission to edit this users role...',
      });
  }
}

async function RemoveTeammateFromTeam(
  req: Express.Request,
  res: Express.Response
) {
  let userTeamRoleCombo: userTeamRoleCombo = consumeCookie(
    req.headers.cookie,
    consumeCookieFlags.tokenUserTeamRoleIdFlag
  );
  let targetUserId: number | null = null;
  try {
    let userIDpacket = await users.getUserByNameDiscriminator(
      req.body.username,
      req.body.discriminator
    );
    targetUserId = userIDpacket.user_id;
  } catch (e) {
    return res
      .status(500)
      .send({ message: 'Server couldnt check role information...' });
  }

  async function executeRemoveTeammateTransaction(
    user_id: number,
    team_id: number
  ) {
    try {
      await teams
        .transactionRemoveTargetUserFromTeam(user_id, team_id)
        .catch(e);
      return res.status(200).send({ message: 'Teammate removed' });
    } catch (e) {
      return res
        .status(500)
        .send({
          message:
            'Server couldnt execute the action to remove the teammate from the team...',
        });
    }
  }

  //a user can remove another from a team only if the current user is the team owner
  //will have to add a way to grant other users team owner status
  if (userTeamRoleCombo.roleID !== 1) {
    return res
      .status(403)
      .send({
        message: 'You dont have permission to remove users from this team...',
      });
  } else {
    if (targetUserId) {
      return executeRemoveTeammateTransaction(
        targetUserId,
        userTeamRoleCombo.teamID
      ).catch(e);
    } else {
      return res
        .status(500)
        .send({ message: 'Server couldnt get target user information...' });
    }
  }
}

export {
  inviteUserToTeam,
  addProject,
  getTeammatesInformation,
  getTeamDetails,
  putUpdateTeammateRole,
  RemoveTeammateFromTeam,
};
