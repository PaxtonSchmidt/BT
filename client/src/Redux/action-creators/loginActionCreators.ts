import { Dispatch } from "redux"
import { loginActionType } from "../action-types/loginActionTypes"
import { Action } from "../actions/loginActions"

export const login = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: loginActionType.LOGIN,
            payload: 1
        })
    }
}
export const logout = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: loginActionType.LOGOUT,
            payload: 1
        })
    }
}