import { alertActionType } from "../action-types/alertActionType"
import { alert } from "../interfaces/alert"

interface FireAction {
    type: alertActionType.FIRE,
    payload: alert
}
interface HideAction {
    type: alertActionType.HIDE
}

export type Action = FireAction | HideAction



