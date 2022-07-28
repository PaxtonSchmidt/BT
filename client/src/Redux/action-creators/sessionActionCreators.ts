import { Dispatch } from "redux"
import { sessionActionType } from "../action-types/sessionActionType"
import { Action } from "../actions/sessionAction"
import { ProjectMember } from "../interfaces/member"
import { Session } from "../interfaces/session"

export const updateSession = (session: Session) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: sessionActionType.UPDATE,
            payload: session
        })
    }
}
export const addMembersToAProjectInSession = (members: ProjectMember[]) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: sessionActionType.ADD_MEMBERS_TO_PROJECT,
            payload: members
        })
    }
}
export const removeMemberFromProjectInSession = (member: ProjectMember) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: sessionActionType.REMOVE_MEMBER_FROM_PROJECT,
            payload: member
        })
    }
}
export const updateProjectMemberRoleInSession = (member: ProjectMember) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: sessionActionType.UPDATE_PROJECT_MEMBER_ROLE,
            payload: member
        })
    }
}