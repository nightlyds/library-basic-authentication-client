import { OrderObjectTypes, UserObjectTypes } from "./types";

type MapStateToPropsTypes = {
    usersListReducer?: Array<UserObjectTypes>;
    loadingReducer?: boolean;
    errorReducer?: boolean;
    userReducer?: UserObjectTypes;
    ordersListReducer?: Array<OrderObjectTypes>;
    orderReducer?: OrderObjectTypes;
};

function mapStateToProps(component: string) {
    switch (component) {
        case "USERS_LIST":
            return function (state: MapStateToPropsTypes) {
                return {
                    users: state.usersListReducer,
                    loading: state.loadingReducer,
                    error: state.errorReducer,
                };
            };
        case "CREATE_USER":
            return function (state: MapStateToPropsTypes) {
                return {
                    loading: state.loadingReducer,
                    error: state.errorReducer,
                };
            };
        case "UPDATE_USER":
            return function (state: MapStateToPropsTypes) {
                return {
                    user: state.userReducer,
                    loading: state.loadingReducer,
                    error: state.errorReducer,
                };
            };
        case "LOGIN":
            return function (state: MapStateToPropsTypes) {
                return {
                    loading: state.loadingReducer,
                    error: state.errorReducer,
                };
            };
        case "ORDERS_LIST":
            return function (state: MapStateToPropsTypes) {
                return {
                    orders: state.ordersListReducer,
                    loading: state.loadingReducer,
                    error: state.errorReducer,
                };
            };
        case "CREATE_ORDER":
            return function (state: MapStateToPropsTypes) {
                return {
                    loading: state.loadingReducer,
                    error: state.errorReducer,
                };
            };
        case "UPDATE_ORDER":
            return function (state: MapStateToPropsTypes) {
                return {
                    order: state.orderReducer,
                    loading: state.loadingReducer,
                    error: state.errorReducer,
                };
            };
        default:
            return undefined;
    }
}

export default mapStateToProps;
