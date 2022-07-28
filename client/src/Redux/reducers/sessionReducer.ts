
import { sessionActionType } from '../action-types/sessionActionType';
import { Action } from '../actions/sessionAction';
import { ProjectMember } from '../interfaces/member';
import { Session } from '../interfaces/session';

const initialState = {session: {}}; 

const sessionReducer = (state: any = initialState, action: Action) => {
    let targetProjectId: number | null = null
    let targetProjectIndex: number | null = null
    let newSessionState: Session | null = null
    let targetMemberOfTargetProjectIdx: number | null = null
    switch(action.type){
        case sessionActionType.UPDATE:
            return action.payload;
        case sessionActionType.ADD_MEMBERS_TO_PROJECT:
            newSessionState = {...state}
            targetProjectId = action.payload[0].project_id //the member objects all carry the project_id
            targetProjectIndex = newSessionState!.currentTeam.projects.findIndex((project: any)=>project.project_id === targetProjectId)
            action.payload.forEach((newMember: ProjectMember) => {
                newSessionState!.currentTeam.projects[targetProjectIndex!].project_members.push(newMember)
            })
            return {...newSessionState}
        case sessionActionType.REMOVE_MEMBER_FROM_PROJECT:
            newSessionState = {...state}
            targetProjectId = action.payload.project_id
            targetProjectIndex = newSessionState!.currentTeam.projects.findIndex((project: any)=>project.project_id === targetProjectId)
            targetMemberOfTargetProjectIdx = 
                newSessionState!.currentTeam
                .projects[targetProjectIndex]
                .project_members
                .findIndex((member: ProjectMember)=>{return member.username === action.payload.username && member.discriminator === action.payload.discriminator})
            newSessionState?.currentTeam.projects[targetProjectIndex].project_members.splice(targetMemberOfTargetProjectIdx, 1)
            return {...newSessionState}
        case sessionActionType.UPDATE_PROJECT_MEMBER_ROLE:
            newSessionState = {...state}
            targetProjectId = action.payload.project_id
            targetProjectIndex = newSessionState!.currentTeam.projects.findIndex((project: any)=>project.project_id === targetProjectId)
            console.log(action.payload)
            targetMemberOfTargetProjectIdx = 
                newSessionState!.currentTeam
                .projects[targetProjectIndex]
                .project_members
                .findIndex((member: ProjectMember)=>{return member.username === action.payload.username && member.discriminator === action.payload.discriminator})
            newSessionState!.currentTeam.projects[targetProjectIndex].project_members[targetMemberOfTargetProjectIdx].role_id = action.payload.role_id
            return newSessionState
        default: 
            return state; 
    }
}

export default sessionReducer
