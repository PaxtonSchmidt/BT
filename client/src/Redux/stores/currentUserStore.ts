import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import currentUserReducer from "../reducers/currentUserReducer";

export const loginStore = createStore(
    currentUserReducer,
    {currentUser: []},
    applyMiddleware(thunk)
)