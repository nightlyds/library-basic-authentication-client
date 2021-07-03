import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import mapStateToProps from "../../store/mapStateToProps";
import mapDispatchToProps from "../../store/mapDispatchToProps";
import {
    OrdersListObjectTypes,
    OrderObjectTypes,
    OrdersListTypes,
} from "../../store/types";
import IsAuthenticatedCheck from "./IsAuthenticatedCheck";
import Loading from "../Loading";
import Error from "../Error";
import BackHome from "../BackHome";

type OrdersListProps = {
    orders: OrdersListObjectTypes;
    loading: boolean;
    error: boolean;
    ordersListChange: (orders: OrdersListObjectTypes) => void;
    loadingChange: (loading: boolean) => void;
    errorChange: (error: boolean) => void;
};

function OrdersList({
    orders,
    loading,
    error,
    ordersListChange,
    loadingChange,
    errorChange,
}: OrdersListProps) {
    const cookies = new Cookies();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        Boolean(cookies.get("isauthenticated"))
    );
    const [email, setEmail] = useState<string>(cookies.get("email"));
    const [password, setPassword] = useState<string>(cookies.get("password"));
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try {
                const request = await axios.get<OrdersListTypes[]>(
                    "http://127.0.0.1:8000/order/"
                );
                ordersListChange(request.data);
                loadingChange(true);
            } catch (error) {
                console.log(error.message);
                errorChange(true);
                loadingChange(true);

                setTimeout(() => {
                    location.reload();
                }, 1000);
            }
        })();

        loadingChange(true);
    }, []);

    const deleteOrder = (id: number | undefined) => {
        (async () => {
            if (error) errorChange(false);
            if (loading) loadingChange(false);
            try {
                const request = await axios.delete(
                    `http://127.0.0.1:8000/order/${id}/`,
                    {
                        auth: {
                            username: email,
                            password: password,
                        },
                    }
                );
                loadingChange(true);
                setSuccess(true);
            } catch (error) {
                console.log(error.message);
                errorChange(true);
                loadingChange(true);
            }

            setTimeout(() => {
                if (success) setSuccess(false);
                location.reload();
            }, 1000);
        })();
    };

    return (
        <div className="orders-list-wrapper">
            <BackHome />
            {success && (
                <div className="order-success">
                    <span className="order-success-message">
                        You successfully deleted order!
                    </span>
                </div>
            )}
            <div className="orders-list-actions">
                {error && <Error />}
                {!loading && <Loading />}
            </div>
            {loading && !error && (
                <div className="orders-list">
                    <div className="orders-list-center">
                        <div className="orders-list-titles-wrapper">
                            <div className="orders-list-title-wrapper">
                                <span className="orders-list-title">User</span>
                            </div>
                            <div className="orders-list-title-wrapper">
                                <span className="orders-list-title">Book</span>
                            </div>
                            <div className="orders-list-title-wrapper">
                                <span className="orders-list-title">
                                    Created At
                                </span>
                            </div>
                            <div className="orders-list-title-wrapper">
                                <span className="orders-list-title">
                                    End At
                                </span>
                            </div>
                            <div className="orders-list-title-wrapper">
                                <span className="orders-list-title">
                                    Plated End At
                                </span>
                            </div>
                            <div></div>
                            <div></div>
                        </div>
                        <div className="orders-list-order-container">
                            {orders.map(
                                (order: OrderObjectTypes, index: number) => (
                                    <div
                                        className="orders-list-order"
                                        key={`${index}_${order.id}`}
                                    >
                                        <div className="users-list-order-info">
                                            <span className="orders-list-order-user">
                                                {order.user}
                                            </span>
                                        </div>
                                        <div className="users-list-order-info">
                                            <span className="orders-list-order-book">
                                                {order.book}
                                            </span>
                                        </div>
                                        <div className="users-list-order-info">
                                            <span className="orders-list-order-created-at">
                                                {new Date(
                                                    order.created_at ||
                                                        new Date()
                                                ).toDateString()}
                                            </span>
                                        </div>
                                        <div className="users-list-order-info">
                                            <span className="orders-list-order-end-at">
                                                {new Date(
                                                    order.end_at || new Date()
                                                ).toDateString()}
                                            </span>
                                        </div>
                                        <div className="users-list-order-info">
                                            <span className="orders-list-order-plated-end-at">
                                                {new Date(
                                                    order.plated_end_at ||
                                                        new Date()
                                                ).toDateString()}
                                            </span>
                                        </div>
                                        <div className="users-list-order-info">
                                            <a
                                                href={`${order.id}/update/`}
                                                className="orders-list-order-update"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faEdit}
                                                    className="orders-list-order-update-icon"
                                                />
                                            </a>
                                        </div>
                                        <div className="users-list-order-info">
                                            <span
                                                className="orders-list-order-delete"
                                                onClick={() => {
                                                    deleteOrder(order.id);
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrashAlt}
                                                    className="orders-list-order-update-icon"
                                                />
                                            </span>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const OrdersListWrap = connect<any, any, any>(
    mapStateToProps("ORDERS_LIST"),
    mapDispatchToProps("ORDERS_LIST")
)(OrdersList);

export default OrdersListWrap;
