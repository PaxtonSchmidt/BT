import { Dispatch } from "redux"
import { teamsActionType } from "../action-types/teamsActionTypes"
import { Action } from "../actions/teamsAction"
import { Teams } from "../interfaces/teams"

export const updateTeams = (teams: Teams) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: teamsActionType.UPDATE,
            payload: teams
        })
    }
}
export const removeTeams = (teams: Teams) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: teamsActionType.REMOVE,
            payload: teams
        })
    }
}