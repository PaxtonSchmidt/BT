import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import socketReducer from "../reducers/socketReducer";

export const focusedTicketStore = createStore(
    socketReducer,
    {focusedTicket: {}},
    applyMiddleware(thunk)
)