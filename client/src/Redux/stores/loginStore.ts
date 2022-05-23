import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "../reducers/index";

export const loginStore = createStore(
    reducers,
    {},
    applyMiddleware(thunk)
)