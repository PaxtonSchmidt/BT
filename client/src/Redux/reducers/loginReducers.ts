import { loginActionType } from "../action-types/loginActionTypes";
import { Action } from "../actions/loginActions";

const initialState = 0; 

const reducer = (state: number = initialState, action: Action) => {
    switch(action.type){
        case loginActionType.LOGIN:
            if(state === 0){
                return state + action.payload;
            } else {
                return state
            }

        case loginActionType.LOGOUT: 
            if(state === 1){
                return state - action.payload;
            } else{
                return state
            }
            
        default: 
            return state; 
    }
}

export default reducer
