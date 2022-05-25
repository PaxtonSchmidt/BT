import consumeCookie from "../Services/consumeCookies/consumeCookie";
import { consumeCookieFlags } from "../Services/consumeCookies/consumeCookieFlags";
let authorizationController = require('../../Controllers/AuthControllers/authorizationController')

export default function getRoles(req: any, res: any, next: any) {
    let userID = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserIdFlag);
    let teamID = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenTeamIdFlag);

    let roles = authorizationController.fetchUserTeamRoles(res, userID, teamID)
    
    console.log(roles)

    if(true === true){
        next()
    } else{
        res.sendStatus(404);
    }
}