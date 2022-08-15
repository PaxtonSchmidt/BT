import consumeCookie from '../../Services/consumeCookies/consumeCookie.js';
import { consumeCookieFlags } from '../../Services/consumeCookies/consumeCookieFlags.js';
import { checkUserTeam, getValidTokenVersion, incrementTokenVersion} from '../../Queries/userQueries.js'
import jwt from 'jsonwebtoken'
import { fetchUserTeamRoleID } from '../../Queries/AuthQueries/authorizationQueries.js'

//Selecting a team now invalidates original JWT and gives the user and updated token
//this token has a longer expiry and contains the team information of the session
function selectTeam(req: any, res: any) {
  console.log(res.locals)
  async function addTeamToJWT() {
    try {
      let user_id = consumeCookie(
        req.headers.cookie,
        consumeCookieFlags.tokenUserIdFlag
      );
      let targetTeam_id = req.body.team;
      let role_id = '';
      let token_v: number = 0;
      let isUserOnTeam: any = false;

      try {
        let checkTeamResponse = await checkUserTeam(
          user_id,
          targetTeam_id
        );
        isUserOnTeam = Object.values(checkTeamResponse[0]);
        if (isUserOnTeam[0] === 1) {
          isUserOnTeam = true;
        } else {
          isUserOnTeam = false;
        }

        let IDcombo = [user_id, targetTeam_id];
        role_id = await fetchUserTeamRoleID(req, IDcombo);
        if(res.locals.isDemo === true){//dont increment if it is a demo account 
          token_v = -1; //gets incremented to 0 in the jwt signing function 
        } else {
          let response = await getValidTokenVersion(user_id)
            .then(await incrementTokenVersion(user_id));
            token_v = response.token_v;
        }

      } catch (e) {
        return e;
      }
      
      if (isUserOnTeam === true) {
        let secret: string = process.env.ACCESS_TOKEN_SECRET!
        let accessToken = await jwt.sign(
          {
            user_id: user_id,
            team_id: targetTeam_id,
            role_id: role_id,
            token_v: token_v + 1,
          },
          secret,
          { expiresIn: '600s' }
        );

        return res
          .cookie('token', accessToken, {
            httpOnly: true,
          })
          .status(200)
          .send({ message: 'Welcome to your team' });
      } else {
        return res.status(400).send({ message: 'You are not on that team...' });
      }
    } catch {
      res
        .status(500)
        .send({ message: 'Server couldnt sign you into your team...' });
    }
  }
  addTeamToJWT();
}

export { selectTeam };
