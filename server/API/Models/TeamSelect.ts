import consumeCookie from "../Services/consumeCookie"
const userTeamsController = require('../Controllers/user_teamsController')

async function getCurrentUserTeams(req: any, res: any) {
    let currentUserID = consumeCookie(req.headers.cookie, 'needTokenUser_id');
    let userTeams = await userTeamsController.getUserTeams(currentUserID);
    if(userTeams.length < 1){
        return res.sendStatus(404)
    } else {
        res.send(userTeams)
    }
}

module.exports =  { getCurrentUserTeams }