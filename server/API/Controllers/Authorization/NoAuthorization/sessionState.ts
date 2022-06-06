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
interface Project {
    project_id: number,
    name: string,
    role_id: number,
    project_members: any[]
}

async function getSessionState(req: any, res: any) {
    let sessionUser: sessionUser = {username: '', discriminator: '', bio: ''};
    let sessionTeam = {name: '', date_joined: '', team_role: '', projects: [{}]};
    let sessionInvites = [{}];
    let sessionState: any = {};
    let currentUserID = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserIdFlag);
    let currentTeamID = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenTeamIdFlag);
    
    //get session info from database queries 
    try{
        let currentUser = await user.getUserByID(currentUserID)
        sessionUser = Object.assign(sessionUser, currentUser)

        let userInvites = await team.getTeamInvites(currentUserID);
        sessionInvites = userInvites.map((invite: any) => Object.assign({}, invite));
 
        let currentTeam = await team.getSessionTeam(currentTeamID, currentUserID)
        sessionTeam = Object.assign(sessionTeam, currentTeam)

        let userProjects = await project.getSessionProjectRoles(currentTeamID, currentUserID)
        userProjects = userProjects.map((project: any) => Object.assign({}, project));

        let projectMembers = await project.getProjectMembers(currentUserID, currentTeamID) ;projectMembers.map((project: any) => Object.assign({}, project))
        projectMembers = projectMembers.map((project: any) => Object.assign({}, project));

        userProjects.forEach((project: any) => {
            let projectInstance = 
            {
                project_id: project.project_id,
                name: project.name,
                role_id: project.role_id,
                project_members: projectMembers.filter((projectMember: any) => projectMember.project_id === project.project_id)
            }
            sessionTeam.projects.push(projectInstance as Project);
        })      

        sessionTeam.projects.shift();

        sessionState = {currentUser: sessionUser, currentTeam: sessionTeam, invites: sessionInvites}
        
    }catch(e){
        return res.status(500).send({message: 'Server couldnt fetch user information...'})
    }

    
    try{
        return res.status(200).send(sessionState)
    }catch(e){
        return res.status(500).send({message: 'Server couldnt retrieve user details...'})
    }
    
}

module.exports = { getSessionState }