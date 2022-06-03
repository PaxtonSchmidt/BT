import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "../reducers/sessionReducer";

export const loginStore = createStore(
    sessionReducer,
    {session: []},
    applyMiddleware(thunk)
)