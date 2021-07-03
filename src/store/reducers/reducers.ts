import { combineReducers } from "redux";
import loadingReducer from "./loadingReducer";
import errorReducer from "./errorReducer";
import usersListReducer from "./usersListReducer";
import userReducer from "./userReducer";
import orderReducer from "./orderReducer";
import ordersListReducer from "./ordersListReducer";

const reducers = combineReducers({
    loadingReducer,
    errorReducer,
    usersListReducer,
    userReducer,
    orderReducer,
    ordersListReducer
});

export default reducers;
