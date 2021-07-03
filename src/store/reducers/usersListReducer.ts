import initialState from "../initialState";
import { UsersListTypes } from "../types";

const usersListReducer = (
    state = initialState.users,
    action: UsersListTypes
) => {
    switch (action.type) {
        case "USERS_LIST":
            return action.users;
        default:
            return state;
    }
};

export default usersListReducer;
