import { currentUser } from "./currentUser";
import { Invite } from "./invites";

export interface Project{
    name: string,
    role: string
}

export interface currentTeam{
    name: string, 
    date_joined: string,
    team_role: string, 
    project_roles: Project[]
}

export interface Session {
    currentUser: currentUser,
    currentTeam: currentTeam,
    invites: Invite[]    
}