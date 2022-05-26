import consumeCookie from "../../../Services/consumeCookies/consumeCookie";
import { consumeCookieFlags } from "../../../Services/consumeCookies/consumeCookieFlags";
let authorizationController = require('../../../Controllers/AuthControllers/authorizationController')


export default async function getTeamRole(req: any, res: any) {
    let userID = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserIdFlag);
    let teamID = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenTeamIdFlag);

    let teamRole = await authorizationController.fetchUserTeamRole(userID, teamID, res)
    console.log(teamRole)
    return teamRole
}
