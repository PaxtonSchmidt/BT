import { sessionActionType } from "../action-types/sessionActionType"
import { ProjectMember } from "../interfaces/member"
import { Project, Session } from "../interfaces/session"
import { Teammate } from "../interfaces/teammate"

interface UpdateAction {
    type: sessionActionType.UPDATE,
    payload: Session
}

interface addMembersToAProjectAction {
    type: sessionActionType.ADD_MEMBERS_TO_PROJECT,
    payload: ProjectMember[]
}

interface removeMemberFromProjectInSession{
    type: sessionActionType.REMOVE_MEMBER_FROM_PROJECT,
    payload: ProjectMember
}

interface updatedProjectMemberRole{
    type: sessionActionType.UPDATE_PROJECT_MEMBER_ROLE,
    payload: ProjectMember
}

interface addProjectToSession{
    type: sessionActionType.ADD_PROJECT_TO_SESSION,
    payload: Project
}

interface removeTeammateFromSessionProjects{
    type: sessionActionType.REMOVE_TEAMMATE_FROM_SESSION_PROJECTS
    payload: Teammate
}

export type Action = UpdateAction | addMembersToAProjectAction | removeMemberFromProjectInSession | updatedProjectMemberRole | addProjectToSession | removeTeammateFromSessionProjects



