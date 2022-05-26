import getTeamRole from "./getRoles"

let Role = require('./Legend')

async function inviteUserToTeam(req: any, res: any) {
    let teamRole = await getTeamRole(req, res);

    console.log(req.root)
    console.log(`${req.body} tatsasara`)
    if(teamRole.role_id = Role.owner){
        console.log(req.teamRole.role_id)
        res.sendStatus(200)
    } else {
        res.sendStatus(401)
    }
}

module.exports = { inviteUserToTeam }