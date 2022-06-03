import e from 'express';
import consumeCookie from '../../../Services/consumeCookies/consumeCookie';
import { consumeCookieFlags } from '../../../Services/consumeCookies/consumeCookieFlags';
let user = require('../../../Queries/userQueries')
let team = require('../../../Queries/teamQueries')
let project = require('../../../Queries/projectQueries')

interface sessionUser {
    username: string,
    discriminator: string,
    bio: string
}

async function getSessionState(req: any, res: any) {
    let sessionUser: sessionUser = {username: '', discriminator: '', bio: ''};
    let sessionTeam = {};
    let sessionProjectsRoles: any = [];
    let invites = [{}];
    
    let currentUserID = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserIdFlag);
    let currentTeamID = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenTeamIdFlag);
    
    //get session info from database queries 
    try{
        let currentUser = await user.getUserByID(currentUserID)
        sessionUser = Object.assign(sessionUser, currentUser)
        console.log(sessionUser)

        let currentTeam = await team.getSessionTeam(currentTeamID, currentUserID)
        sessionTeam = Object.assign(sessionTeam, currentTeam)
        console.log(sessionTeam)

        let userRoles = await project.getSessionProjectRoles(currentTeamID, currentUserID)
        userRoles = userRoles.map((project: any) => Object.assign({}, project));
        sessionProjectsRoles = Object.assign(sessionProjectsRoles, userRoles)
        console.log(sessionProjectsRoles)

    }catch(e){
        return res.status(500).send({message: 'Server couldnt fetch user information...'})
    }
    
    
    //build out sessionState object
    try{
        console.log('build it')
    }catch(e){
        console.log('catch it')
    }

    //if something is okay send sessionStateInformation
    
}

module.exports = { getSessionState }