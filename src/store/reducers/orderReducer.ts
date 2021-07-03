import initialState from "../initialState";
import { OrderTypes } from "../types";

const orderReducer = (state = initialState.order, action: OrderTypes) => {
    switch (action.type) {
        case "ORDER":
            return action.order;
        default:
            return state;
    }
};

export default orderReducer;
