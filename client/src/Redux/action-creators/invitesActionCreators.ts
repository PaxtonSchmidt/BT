import { Dispatch } from "redux"
import { invitesActionType } from "../action-types/invitesActionTypes"
import { Action } from "../actions/invitesActions"
import { Invites } from "../interfaces/invites"

export const update = (invites: Invites) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: invitesActionType.UPDATE,
            payload: invites
        })
    }
}
export const remove = (invites: Invites) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: invitesActionType.REMOVE,
            payload: invites
        })
    }
}