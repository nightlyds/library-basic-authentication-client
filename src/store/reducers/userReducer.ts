import initialState from "../initialState";
import { UserTypes } from "../types";

const userReducer = (state = initialState.user, action: UserTypes) => {
    switch (action.type) {
        case "USER":
            return action.user;
        default:
            return state;
    }
};

export default userReducer;
