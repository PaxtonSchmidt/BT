import { invitesActionType } from "../action-types/invitesActionTypes"
import { Invites } from "../interfaces/invites"

interface UpdateAction {
    type: invitesActionType.UPDATE,
    payload: Invites
}

interface RemoveAction {
    type: invitesActionType.REMOVE,
    payload: Invites
}

export type Action = UpdateAction | RemoveAction



