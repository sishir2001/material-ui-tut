import { combineReducers } from "redux";
import { accountReducer } from "./accountReducer";
import { authReducer } from "./authReducers";
import { apiReducer } from "./apiReducer";

export default combineReducers({
    auth: authReducer,
    account: accountReducer,
    api: apiReducer,
});
