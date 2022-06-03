import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import teamsReducers from "../reducers/index";

export const teamsStore = createStore(
    teamsReducers,
    {teams: []},
    applyMiddleware(thunk)
)