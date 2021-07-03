import { OrdersListObjectTypes, OrdersListTypes } from "../types";

const ordersListAction = (orders: OrdersListObjectTypes): OrdersListTypes => ({
    type: "ORDERS_LIST",
    orders,
});

export default ordersListAction;
