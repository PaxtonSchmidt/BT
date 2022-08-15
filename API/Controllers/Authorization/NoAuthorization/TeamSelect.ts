import consumeCookie from '../../../Services/consumeCookies/consumeCookie.js';
import { consumeCookieFlags } from '../../../Services/consumeCookies/consumeCookieFlags.js';
import * as user_teams from '../../../Queries/user_teamsQueries.js'
import * as teams from '../../../Queries/teamQueries.js'

async function getCurrentUserTeams(req: any, res: any) {
  let userTeams = '';
  let currentUserID = consumeCookie(
    req.headers.cookie,
    consumeCookieFlags.tokenUserIdFlag
  );

  try {
    userTeams = await user_teams.getUserTeams(currentUserID);
  } catch (e) {
    return res
      .status(500)
      .send({ message: 'Server couldnt find your teams...' });
  }

  if (userTeams.length < 1) {
    return res.status(200).send({ message: 'You arent on any teams...' });
  } else {
    return res.status(200).send(userTeams);
  }
}

async function getTeamInvites(req: any, res: any) {
  let currentUserID = consumeCookie(
    req.headers.cookie,
    consumeCookieFlags.tokenUserIdFlag
  );
  let queryInvites = [];

  try {
    queryInvites = await teams.getTeamInvites(currentUserID);
  } catch (e) {
    return res
      .status(500)
      .send({ message: 'Couldnt get invites from database...' });
  }

  if (queryInvites.length < 1) {
    return res.send({ message: 'No Invites' });
  } else {
    return res.status(200).send(queryInvites);
  }
}

export { getCurrentUserTeams, getTeamInvites };
