import { Dispatch } from "redux"
import { sessionActionType } from "../action-types/sessionActionType"
import { Action } from "../actions/sessionAction"
import { Session } from "../interfaces/session"

export const updateSession = (session: Session) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: sessionActionType.UPDATE,
            payload: session
        })
    }
}