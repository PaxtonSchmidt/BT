import { Dispatch } from "redux"
import { focusedMemberActionType } from "../action-types/focusedMemberActionType"
import { Action } from "../actions/focusedMemberAction"
import { Member } from "../interfaces/member"

export const updateFocusedMember = (Member: Member) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: focusedMemberActionType.UPDATE,
            payload: Member
        })
    }
}