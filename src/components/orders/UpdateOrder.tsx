import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import mapStateToProps from "../../store/mapStateToProps";
import mapDispatchToProps from "../../store/mapDispatchToProps";
import { OrderObjectTypes, RouteIDType } from "../../store/types";
import OrderForm from "./OrderForm";
import IsAuthenticatedCheck from "./IsAuthenticatedCheck";
import Loading from "../Loading";
import Error from "../Error";
import BackHome from "../BackHome";

interface UpdateOrderProps extends RouteComponentProps<RouteIDType> {
    order: OrderObjectTypes;
    loading: boolean;
    error: boolean;
    orderChange: (order: OrderObjectTypes) => void;
    loadingChange: (loading: boolean) => void;
    errorChange: (error: boolean) => void;
} // Types for props, also here is using Router props for match param

const UpdateOrder = ({
    order,
    match,
    loading,
    error,
    orderChange,
    loadingChange,
    errorChange,
}: UpdateOrderProps) => {
    const cookies = new Cookies();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        Boolean(cookies.get("isauthenticated"))
    );
    const [email, setEmail] = useState<string>(cookies.get("email"));
    const [password, setPassword] = useState<string>(cookies.get("password"));
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            if (error) errorChange(false);
            if (loading) loadingChange(false);
            try {
                const request = await axios.get<OrderObjectTypes>(
                    `http://127.0.0.1:8000/order/${match.params.id}/`
                );
                orderChange(request.data);
                loadingChange(true);
            } catch (error) {
                loadingChange(true);
                errorChange(true);
            }
        })();
    }, []);

    return (
        <div className="update-order-wrapper">
            <BackHome />
            {isAuthenticated && (
                <React.Fragment>
                    {loading && !error && order && (
                        <div className="order">
                            <Formik
                                initialValues={{
                                    user: order.user,
                                    book: order.book,
                                    created_at: order.created_at,
                                    end_at: order.end_at,
                                    plated_end_at: order.plated_end_at,
                                }}
                                validationSchema={Yup.object({
                                    user: Yup.number(),
                                    book: Yup.number(),
                                    created_at: Yup.date().typeError('Must be the date-time format'),
                                    end_at: Yup.date().typeError('Must be the date-time format'),
                                    plated_end_at: Yup.date().typeError('Must be the date-time format'),
                                })}
                                onSubmit={(
                                    values: OrderObjectTypes,
                                    {
                                        setSubmitting,
                                    }: FormikHelpers<OrderObjectTypes>
                                ) => {
                                    const body: OrderObjectTypes = values;
                                    body.id = order.id;

                                    (async () => {
                                        try {
                                            loadingChange(false);
                                            const request = await axios.put(
                                                `http://127.0.0.1:8000/order/${match.params.id}/`, body,
                                                {
                                                    auth: {
                                                        username: email,
                                                        password: password,
                                                    },
                                                }
                                            );

                                            orderChange(request.data);
                                            loadingChange(true);
                                            setSuccess(true);

                                            await (() => {
                                                return new Promise(resolve => {
                                                    setTimeout(() => {
                                                        setSuccess(false);
                                                        resolve(true);
                                                    }, 3000);
                                                });
                                            })();

                                            window.location.replace(
                                                "http://0.0.0.0:8080/orders/"
                                            );
                                        } catch (error) {
                                            console.log(error.message);
                                            errorChange(true);
                                            loadingChange(true);

                                            setTimeout(() => {
                                                location.reload();
                                            }, 1000);
                                        }
                                    })();

                                    setSubmitting(false);
                                }}
                            >
                                <OrderForm />
                            </Formik>
                        </div>
                    )}
                    {success && (
                        <div className="order-success">
                            <span className="order-success-message">
                                You successfully updated order!
                            </span>
                        </div>
                    )}
                    <div className="order-actions">
                        {error && <Error />}
                        {!loading && <Loading />}
                    </div>
                </React.Fragment>
            )}
            {!isAuthenticated && (
                <IsAuthenticatedCheck isAuthenticatedStatus={isAuthenticated} />
            )}
        </div>
    );
};

const UpdateOrderWrap = connect<any, any, any>(
    mapStateToProps("UPDATE_ORDER"),
    mapDispatchToProps("UPDATE_ORDER")
)(UpdateOrder);

export default UpdateOrderWrap;
