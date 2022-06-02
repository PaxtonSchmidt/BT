import consumeCookie from "../../../Services/consumeCookies/consumeCookie";
import { consumeCookieFlags } from "../../../Services/consumeCookies/consumeCookieFlags";
const user_teams = require('../../../Queries/user_teamsQueries')
let teams = require('../../../Queries/teamQueries')

async function getCurrentUserTeams(req: any, res: any) {
    let userTeams = ''
    let currentUserID = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserIdFlag);


    try{
        userTeams = await user_teams.getUserTeams(currentUserID);
    } catch(e){
        return res.status(500).send({message: 'Server couldnt find your teams...'})
    }

    if(userTeams.length < 1){
        return res.status(404).send({message: 'You arent on any teams...'})
    } else {
        return res.status(200).send(userTeams)
    }
}

async function getTeamInvites(req: any, res: any) {
    let currentUserID = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserIdFlag)
    
    async function fetchInvites(user_id: string){
        try{
            let queryInvites = await teams.getTeamInvites(currentUserID);
            return queryInvites
        } catch(e) {
            console.log(e)
            return res.status(500).send({message: 'Couldnt get invites from database...'})
        }
    }
    
    let invites = await fetchInvites(currentUserID)

    if(invites < 1){
        return res.sendStatus(404)
    } else {
        return res.status(200).send(invites)
    }
}

module.exports =  { getCurrentUserTeams, getTeamInvites }