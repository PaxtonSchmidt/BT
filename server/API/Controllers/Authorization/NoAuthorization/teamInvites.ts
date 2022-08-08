import * as Express from 'express'
import consumeCookie from '../../../Services/consumeCookies/consumeCookie';
import { consumeCookieFlags } from '../../../Services/consumeCookies/consumeCookieFlags';
import { userTeamRoleCombo } from '../../../Services/consumeCookies/consumeCookie'
let teams = require('../../../Queries/teamQueries')

async function getInvites(req: Express.Request, res: Express.Response){
  let userTeamRoleCombo: userTeamRoleCombo = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserTeamRoleIdFlag);
  let userInvites: any;
  try{
    let userInvitesPacket = await teams.getTeamInvites(userTeamRoleCombo.userID)
    userInvites = userInvitesPacket
  } catch(e){
    return res.status(500).send({message: 'Server couldnt get invites...'})
  }

  try{
    return res.status(200).send(userInvites)
  } catch(e){
    return res.status(500).send({message: 'Server couldnt send team invites...'})
  }
}

async function deleteInvite(req: any, res: any) {
  let currentUserID = consumeCookie(
    req.headers.cookie,
    consumeCookieFlags.tokenUserIdFlag
  );
  let invite: any = '';
  try {
    invite = await teams.getInviteById(req.body.inviteID);
  } catch (e) {
    return res.status(500).send({ message: 'Server couldnt check invite...' });
  }

  //if the user is the sender or recipient of the invite then they can delete the invite
  if (
    currentUserID === invite.recipient_id ||
    currentUserID === invite.sender_id
  ) {
    try {
      await teams.deleteTeamInvite(res, req.body.inviteID);
      return res.status(200).send({ message: 'Deleted invite' });
    } catch (e) {
      return res.status(500).send({ message: 'Could not delete invite...' });
    }
  } else {
    return res.sendStatus(403);
  }
}

async function acceptInvite(req: any, res: any) {
  let currentUserID = consumeCookie(
    req.headers.cookie,
    consumeCookieFlags.tokenUserIdFlag
  );
  let invite: any = '';
  try {
    invite = await teams.getInviteById(req.body.inviteID);
  } catch (e) {
    return res
      .status(500)
      .send({ message: 'Server couldnt find this invite...' });
  }

  //if the userID is the invite recipient id then add the user to the user_teams table
  if (currentUserID === invite.recipient_id) {
    try {
      await teams
        .addUserToTeam(
          res,
          invite.recipient_id,
          invite.team_id,
          invite.sender_id
        )
        .then(teams.deleteTeamInvite(res, req.body.inviteID));

      return res.status(200).send({ message: 'Accepted invite to team' });
    } catch (e) {
      return res
        .status(500)
        .send({ message: 'Couldnt accept invite to team...' });
    }
  } else {
    return res.status(403).send({ message: 'unauthorized...' });
  }
}

module.exports = { 
  deleteInvite,
  acceptInvite,
  getInvites
 };
