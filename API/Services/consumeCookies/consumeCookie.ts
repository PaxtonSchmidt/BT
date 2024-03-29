import { consumeCookieFlags } from './consumeCookieFlags.js';
import jwt_decode from 'jwt-decode';

export default function consumeCookie(cookie: any, dataNeeded: string) {
  let lengthOfTokenKeyInCookie = 6;
  let token = '';

  try {
    token = cookie.substring(lengthOfTokenKeyInCookie);
  } catch (e) {
    return null;
  }

  if (dataNeeded === consumeCookieFlags.entireTokenFlag) {
    return token;
  } else if (dataNeeded === consumeCookieFlags.tokenUserIdFlag) {
    let decoded: any = jwt_decode(token);
    return decoded.user_id;
  } else if (dataNeeded === consumeCookieFlags.tokenTeamIdFlag) {
    let decoded: any = jwt_decode(token);
    return decoded.team_id;
  } else if (dataNeeded === consumeCookieFlags.tokenUserAndTeamIdFlag) {
    let decoded: any = jwt_decode(token);
    let userTeamIDCombo = { userID: decoded.user_id, teamID: decoded.team_id };
    return userTeamIDCombo;
  } else if (dataNeeded === consumeCookieFlags.tokenValidationFlag) {
    let decoded: any = jwt_decode(token);
    let tokenValidation = {
      tokenV: decoded.token_v,
      userID: decoded.user_id,
      token: token,
    };
    return tokenValidation;
  } else if (dataNeeded === consumeCookieFlags.tokenUserTeamRoleIdFlag) {
    let decoded: any = jwt_decode(token);
    let userTeamRoleId = {
      userID: decoded.user_id,
      teamID: decoded.team_id,
      roleID: decoded.role_id,
    };
    return userTeamRoleId;
  } else if (dataNeeded === consumeCookieFlags.tokenSocketIoFlag) {
    let decoded: any = jwt_decode(token);
    let allData = {
      userID: decoded.user_id,
      teamID: decoded.team_id,
      roleID: decoded.role_id,
      token: token,
      tokenV: decoded.token_v,
    };
    return allData;
  } else {
    return
  }
}
export interface userTeamRoleCombo {
  userID: number;
  teamID: number;
  roleID: number;
}
