import { consumeCookieFlags } from "./consumeCookieFlags";

const jwt_decode = require('jwt-decode');

export default function consumeCookie(cookie: any, dataNeeded: string) {
    let lengthOfTokenKeyInCookie = 6;
    let token = ''

    try{
        token = cookie.substring(lengthOfTokenKeyInCookie);
    }catch(e){
        return null
    }
    
    if(dataNeeded === consumeCookieFlags.entireTokenFlag) {
        return token
    } else if(dataNeeded === consumeCookieFlags.tokenUserIdFlag) {
        let decoded = jwt_decode(token);
        return decoded.user_id;
    } else if(dataNeeded === consumeCookieFlags.tokenTeamIdFlag){
        let decoded = jwt_decode(token);
        return decoded.team_id;
    } else if(dataNeeded === consumeCookieFlags.tokenUserAndTeamIdFlag){
        let decoded = jwt_decode(token);
        let userTeamIDCombo = {userID: decoded.user_id, teamID: decoded.team_id}
        return userTeamIDCombo
    } else if(dataNeeded === consumeCookieFlags.tokenValidationFlag){
        let decoded = jwt_decode(token)
        let tokenValidation = { tokenV: decoded.token_v, userID: decoded.user_id, token: token}
        return tokenValidation
    }else if(dataNeeded === consumeCookieFlags.tokenUserTeamRoleIdFlag){
        let decoded = jwt_decode(token)
        let userTeamRoleId = {userID: decoded.user_id, teamID: decoded.team_id, roleID: decoded.role_id}
        return userTeamRoleId
    }
    else {
        console.log(`ERROR: Incorrect use of consumeCookie service function. Use entireTokenFlag, tokenUserIdFlag or tokenTeamIdFlag in the second argument`);
    }
}