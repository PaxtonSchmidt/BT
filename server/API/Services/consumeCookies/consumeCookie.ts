import { consumeCookieFlags } from "./consumeCookieFlags";

const jwt_decode = require('jwt-decode');

export default function consumeCookie(cookie: any, dataNeeded: string) {
    let lengthOfTokenKeyInCookie = 6;
    let token = cookie.substring(lengthOfTokenKeyInCookie);
    
    console.log(jwt_decode(token))
    
    if(dataNeeded === consumeCookieFlags.entireTokenFlag) {
        return token
    } else if(dataNeeded === consumeCookieFlags.tokenUserIdFlag) {
        let decoded = jwt_decode(token);
        return decoded.user_id;
    } else if(dataNeeded === consumeCookieFlags.tokenTeamIdFlag){
        let decoded = jwt_decode(token);
        console.log('yaya')
        return decoded.team_id;
    }
    else {
        console.log(dataNeeded)
        console.log(`ERROR: Incorrect use of consumeCookie service function. Use entireTokenFlag, tokenUserIdFlag or tokenTeamIdFlag in the second argument`);
    }
}