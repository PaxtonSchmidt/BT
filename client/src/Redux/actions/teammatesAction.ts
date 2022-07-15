import { teammatesActionType } from "../action-types/teammatesActionType"
import { Teammate } from "../interfaces/teammate"

interface UpdateAction {
    type: teammatesActionType.UPDATE,
    payload: Teammate[]
}

export type Action = UpdateAction



