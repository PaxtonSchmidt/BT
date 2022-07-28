import { currentUser } from "./currentUser";
import { Invite } from "./invites";
import { ProjectMember } from "./member";

export interface Project{
    name: string,
    role: string,
    project_members: ProjectMember[]
}

export interface currentTeam{
    name: string, 
    date_joined: string,
    team_role: string, 
    projects: Project[]
}

export interface Session {
    currentUser: currentUser,
    currentTeam: currentTeam,
    invites: Invite[]    
}