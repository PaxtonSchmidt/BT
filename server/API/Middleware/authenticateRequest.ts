import authenticateJWT from "../Services/authenticateJWT";
import consumeCookie from "../Services/consumeCookies/consumeCookie";
import { consumeCookieFlags } from "../Services/consumeCookies/consumeCookieFlags";
let users = require('../Queries/userQueries')

export default async function authenticateRequest(req: any, res: any, next: any) {
    if(req.headers.cookie === undefined){
        console.log('got here')
        return res.send({message: 'Please sign in...'})
    }


    let tokenInformation = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenValidationFlag);
    let tokenVersion = tokenInformation.tokenV;
    let userId = tokenInformation.userID;
    let token = tokenInformation.token;
    let validTokenVersion = {token_v: ''}

    try{
        validTokenVersion = await users.getValidTokenVersion(userId)
    } catch(e){
        return res.status(500).send({message: 'Couldnt validate request...'})
    }

    if(tokenVersion !== validTokenVersion.token_v || authenticateJWT(token) !== true){
        return res.status(400).send({message: 'Your session is invalid...'})
    } else{
        next();
    }
}