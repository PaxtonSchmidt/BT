import { teamsActionType } from "../action-types/teamsActionTypes"
import { Teams } from "../interfaces/teams"

interface UpdateAction {
    type: teamsActionType.UPDATE,
    payload: Teams
}

interface RemoveAction {
    type: teamsActionType.REMOVE,
    payload: Teams
}

export type Action = UpdateAction | RemoveAction



