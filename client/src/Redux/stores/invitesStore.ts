import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import invitesReducers from "../reducers/invitesReducers";

export const loginStore = createStore(
    invitesReducers,
    {invites: []},
    applyMiddleware(thunk)
)