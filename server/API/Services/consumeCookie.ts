const jwt_decode = require('jwt-decode');

export default function consumeCookie(cookie: any) {
    let lengthOfTokenKeyInCookie = 6;
    let token = cookie.substring(lengthOfTokenKeyInCookie);

    let decoded = jwt_decode(token);
    
    return decoded.user_id;
}