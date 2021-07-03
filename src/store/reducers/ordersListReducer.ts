import initialState from "../initialState";
import { OrdersListTypes } from "../types";

const ordersListReducer = (
    state = initialState.orders,
    action: OrdersListTypes
) => {
    switch (action.type) {
        case "ORDERS_LIST":
            return action.orders;
        default:
            return state;
    }
};

export default ordersListReducer;
