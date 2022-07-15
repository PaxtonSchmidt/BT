import { teammatesActionType } from "../action-types/teammatesActionType";
import { Action } from "../actions/teammatesAction";
import { Teammate } from "../interfaces/teammate";

const initialState = {}; 

const teammatesReducer = (state: any = initialState, action: Action) => {
    switch(action.type){
        case teammatesActionType.UPDATE:
            return action.payload;
        default: 
            return state; 
    }
}

export default teammatesReducer
