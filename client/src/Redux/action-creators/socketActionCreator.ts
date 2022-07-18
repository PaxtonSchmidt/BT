import { Dispatch } from "redux"
import { socketActionType } from "../action-types/socketActionType"
import { Action } from "../actions/socketAction"

export const updateSocket = (socket: any) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: socketActionType.UPDATE,
            payload: socket
        })
    }
}