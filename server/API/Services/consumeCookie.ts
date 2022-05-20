const jwt_decode = require('jwt-decode');

export default function consumeCookie(cookie: any, dataNeeded: string) {
    let lengthOfTokenKeyInCookie = 6;
    let token = cookie.substring(lengthOfTokenKeyInCookie);
    if(dataNeeded === 'needEntireToken') {
        return token
    } else if(dataNeeded === 'needTokenUser_id') {
        let decoded = jwt_decode(token);
        return decoded.user_id;
    }
}