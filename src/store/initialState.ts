import { OrderObjectTypes, UserObjectTypes } from "./types";

export type InitialStateTypes = {
    users: Array<UserObjectTypes>;
    user: UserObjectTypes;
    orders: Array<OrderObjectTypes>;
    order: OrderObjectTypes;
    loading: boolean;
    error: boolean;
};

const initialState: InitialStateTypes = {
    users: [
        {
            id: 1,
            first_name: "",
            middle_name: "",
            last_name: "",
            email: "initial@email.com",
            updated_at: "2021-06-30T16:12:42.580681Z",
            created_at: "2021-06-30T16:12:42.580714Z",
            role: 0,
            is_active: false,
            is_admin: false,
        },
    ],
    user: {
        id: 1,
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "initial@email.com",
        updated_at: "2021-06-30T16:12:42.580681Z",
        created_at: "2021-06-30T16:12:42.580714Z",
        role: 0,
        is_active: false,
        is_admin: false,
    },
    orders: [
        {
            id: 1,
            user: 1,
            book: 1,
            created_at: "2006-10-25T14:30:59Z",
            end_at: "2006-10-25T14:30:59Z",
            plated_end_at: "2006-10-25T14:30:59Z",
        },
    ],
    order: {
        id: 1,
        user: 1,
        book: 1,
        created_at: "2006-10-25T14:30:59Z",
        end_at: "2006-10-25T14:30:59Z",
        plated_end_at: "2006-10-25T14:30:59Z",
    },
    loading: false,
    error: false,
};

export default initialState;
