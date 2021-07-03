import { UsersListObjectTypes, UsersListTypes } from "../types";

const usersListAction = (users: UsersListObjectTypes): UsersListTypes => ({
    type: "USERS_LIST",
    users,
});

export default usersListAction;
