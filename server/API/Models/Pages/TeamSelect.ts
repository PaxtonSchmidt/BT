import consumeCookie from "../../Services/consumeCookies/consumeCookie";
import { consumeCookieFlags } from "../../Services/consumeCookies/consumeCookieFlags";
const userTeamsController = require('../../Controllers/user_teamsController')

async function getCurrentUserTeams(req: any, res: any) {
    console.log('wait')
    let currentUserID = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserIdFlag);
    let userTeams = await userTeamsController.getUserTeams(currentUserID);
    if(userTeams.length < 1){
        return res.sendStatus(404)
    } else {
        res.send(userTeams)
    }
}

module.exports =  { getCurrentUserTeams }