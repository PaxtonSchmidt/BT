import { Dispatch } from "redux"
import { currentUserActionType } from "../action-types/currentUserActionTypes"
import { Action } from "../actions/currentUserAction"
import { currentUser } from "../interfaces/currentUser"

export const update = (user: currentUser) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: currentUserActionType.UPDATE,
            payload: user
        })
    }
}
export const remove = (user: currentUser) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: currentUserActionType.REMOVE,
            payload: user
        })
    }
}