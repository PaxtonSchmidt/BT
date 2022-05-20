import consumeCookie from "./consumeCookie";

const jwt = require('jsonwebtoken');

export default function authenticateJWT(cookie: any) {
    let token = consumeCookie(cookie, 'needEntireToken');
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        let isValidJWT: boolean = true;
        return isValidJWT
    } 
    catch {
        let isValidJWT: boolean = false;
        return isValidJWT
    }
    
    
    
}