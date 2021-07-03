export type UserObjectTypes = {
    id?: number;
    first_name?: string;
    middle_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    updated_at?: string;
    created_at?: string;
    role?: number;
    is_active?: boolean;
    is_admin?: boolean;
};

export type UsersListObjectTypes = {
    [key: string]: any;
}; // Types for the User Object

export type OrderObjectTypes = {
    id?: number;
    user?: number;
    book?: number;
    created_at?: string | Date;
    end_at?: string | Date;
    plated_end_at?: string | Date;
};

export type OrdersListObjectTypes = {
    [key: string]: any;
}; // Types for the User Object

export type OrdersListTypes = {
    type: string;
    orders: OrdersListObjectTypes;
};

export type UsersListTypes = {
    type: string;
    users: UsersListObjectTypes;
};

export type LoadUpUsersListTypes = {
    type: string;
};

export type UserTypes = {
    type: string;
    user: UserObjectTypes;
};

export type OrderTypes = {
    type: string;
    order: OrderObjectTypes;
};

export type LoadUpUserTypes = {
    type: string;
};

export interface CreateUserTypes {
    type: string;
    data: UserObjectTypes;
}

export interface UpdateUserTypes {
    type: string;
    data: UserObjectTypes;
    id: number;
}

export interface LoadingTypes {
    type: string;
    loading: boolean;
}

export interface ErrorTypes {
    type: string;
    error: boolean;
}

export interface UserDeleteTypes {
    type: string;
    id: number;
}

export type RouteIDType = {
    id: string;
};
