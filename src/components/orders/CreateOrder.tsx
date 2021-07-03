import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import mapStateToProps from "../../store/mapStateToProps";
import mapDispatchToProps from "../../store/mapDispatchToProps";
import { UserObjectTypes } from "../../store/types";
import OrderForm from "./OrderForm";
import IsAuthenticatedCheck from "./IsAuthenticatedCheck";
import Loading from "../Loading";
import Error from "../Error";
import BackHome from "../BackHome";

interface CreateOrderProps {
    loading: boolean;
    error: boolean;
    loadingChange: (loading: boolean) => void;
    errorChange: (error: boolean) => void;
}

const CreateOrder = ({
    loading,
    error,
    loadingChange,
    errorChange,
}: CreateOrderProps) => {
    const cookies = new Cookies();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        Boolean(cookies.get("isauthenticated"))
    );
    const [email, setEmail] = useState<string>(cookies.get("email"));
    const [password, setPassword] = useState<string>(cookies.get("password"));
    const [userId, setUserId] = useState<string>(cookies.get("user_id"));
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        loadingChange(true);
    }, []);

    return (
        <div className="update-order-wrapper">
            <BackHome />
            {isAuthenticated && (
                <React.Fragment>
                    {loading && !error && (
                        <div className="order">
                            <Formik
                                initialValues={{
                                    user: userId,
                                    book: 1,
                                    created_at: new Date().toISOString(),
                                    end_at: new Date().toISOString(),
                                    plated_end_at: new Date().toISOString(),
                                }}
                                validationSchema={Yup.object({
                                    user: Yup.number(),
                                    created_at: Yup.date().typeError(
                                        "Must be the date-time format"
                                    ),
                                    end_at: Yup.date().typeError(
                                        "Must be the date-time format"
                                    ),
                                    plated_end_at: Yup.date().typeError(
                                        "Must be the date-time format"
                                    ),
                                })}
                                onSubmit={(
                                    values: UserObjectTypes,
                                    {
                                        setSubmitting,
                                    }: FormikHelpers<UserObjectTypes>
                                ) => {
                                    (async () => {
                                        try {
                                            loadingChange(false);
                                            const request = await axios.post(
                                                `http://127.0.0.1:8000/order/`,
                                                values,
                                                {
                                                    auth: {
                                                        username: email,
                                                        password: password,
                                                    },
                                                }
                                            );

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
                                You successfully created order!
                            </span>
                        </div>
                    )}
                    <div className="order-actions">
                        {error && <Error />}
                        {!loading && <Loading />}
                    </div>
                </React.Fragment>
            )}
            <IsAuthenticatedCheck isAuthenticatedStatus={isAuthenticated} />
        </div>
    );
};

const CreateOrderWrap = connect<any, any, any>(
    mapStateToProps("CREATE_ORDER"),
    mapDispatchToProps("CREATE_ORDER")
)(CreateOrder);

export default CreateOrderWrap;
