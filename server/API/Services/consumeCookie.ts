const jwt_decode = require('jwt-decode');

export default function consumeCookie(cookie: any, dataNeeded: string) {
    let lengthOfTokenKeyInCookie = 6;
    let token = cookie.substring(lengthOfTokenKeyInCookie);

    let entireTokenFlag = 'needEntireToken';
    let tokenUserIdFlag = 'needTokenUser_id';
    if(dataNeeded === entireTokenFlag) {
        return token
    } else if(dataNeeded === tokenUserIdFlag) {
        let decoded = jwt_decode(token);
        return decoded.user_id;
    } else {
        console.log(`ERROR: Incorrect use of consumeCookie service function. Use ${entireTokenFlag} or ${tokenUserIdFlag} in the second argument`);
    }
}