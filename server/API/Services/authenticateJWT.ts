import consumeCookie from "./consumeCookie";

const jwt = require('jsonwebtoken');

export default function authenticateJWT(cookie: any) {
    let token = consumeCookie(cookie, 'needEntireToken');
    console.log(`jwt is ${token}`)
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        let isValidJWT: boolean = true;
        console.log(isValidJWT)
        return isValidJWT
    } 
    catch {
        let isValidJWT: boolean = false;
        console.log('b')
        return isValidJWT
    }
    
    
    
}