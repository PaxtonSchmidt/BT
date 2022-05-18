import consumeCookie from "../Services/consumeCookie"
// const userTeamsController = require('../Controllers/user_teamsController')

async function getCurrentUserTeams(req: any, res: any) {
    let currentUserID = consumeCookie(req.headers.cookie);
    console.log(currentUserID)
    res.send('ok')
}

module.exports =  { getCurrentUserTeams }