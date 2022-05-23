import { loginActionType } from "../action-types/loginActionTypes"


interface LoginAction {
    type: loginActionType.LOGIN,
    payload: number
}

interface LogoutAction {
    type: loginActionType.LOGOUT,
    payload: number
}

export type Action = LoginAction | LogoutAction



