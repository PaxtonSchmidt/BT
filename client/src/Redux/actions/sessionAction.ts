import { sessionActionType } from "../action-types/sessionActionType"
import { Session } from "../interfaces/session"

interface UpdateAction {
    type: sessionActionType.UPDATE,
    payload: Session
}

export type Action = UpdateAction



