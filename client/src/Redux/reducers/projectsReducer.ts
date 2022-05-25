import { object } from "yup";
import { loginActionType } from "../action-types/loginActionTypes";
import { Action } from "../actions/loginActions";

// interface Projects {
//     projects: Array<object>
// }

// const initialState = [{project: object}]; 

// const projectsReducer = (state: Projects = initialState, action: Action) => {
//     switch(action.type){
//         case loginActionType.LOGIN:
//             if(state === [{}]){
//                 return state + action.payload;
//             } else {
//                 return state
//             }

//         case loginActionType.LOGOUT: 
//             if(state === [{}]){
//                 return state - action.payload;
//             } else{
//                 return state
//             }
            
//         default: 
//             return state; 
//     }
// }

// export default reducer
