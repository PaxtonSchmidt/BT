import { focusedMemberActionType } from "../action-types/focusedMemberActionType"
import { Member } from "../interfaces/member"

interface updateFocusedMember {
    type: focusedMemberActionType.UPDATE,
    payload: Member
}

export type Action = updateFocusedMember



