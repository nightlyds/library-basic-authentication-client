import { UserObjectTypes, UserTypes } from "../types";

const userAction = (user: UserObjectTypes): UserTypes => ({
    type: "USER",
    user,
});

export default userAction;
