import { teamsActionType } from "../action-types/teamsActionTypes";
import { Action } from "../actions/teamsAction";

const initialState = {teams: []}; 

const teamsReducer = (state: any = initialState, action: Action) => {
    switch(action.type){
        case teamsActionType.UPDATE:
            if(action.payload === undefined){
                return action.payload
            }
            return action.payload;
        case teamsActionType.REMOVE: 
            return state.filter((team: any) => team.team_id !== action.payload)
        default: 
            return state; 
    }
}

export default teamsReducer
