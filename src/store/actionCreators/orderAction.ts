import { OrderObjectTypes, OrderTypes } from "../types";

const orderAction = (order: OrderObjectTypes): OrderTypes => ({
    type: "ORDER",
    order,
});

export default orderAction;
