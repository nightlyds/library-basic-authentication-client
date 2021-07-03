import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import mapStateToProps from "../../store/mapStateToProps";
import mapDispatchToProps from "../../store/mapDispatchToProps";
import Loading from "../Loading";
import Error from "../Error";
import BackHome from "../BackHome";

type Login = {
    email: string;
    password: string;
};

interface LoginProps {
    loading: boolean;
    error: boolean;
    loadingChange: (loading: boolean) => void;
    errorChange: (error: boolean) => void;
}

function Login({ loading, error, loadingChange, errorChange }: LoginProps) {
    const cookies = new Cookies();
    const [success, setSuccess] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        Boolean(cookies.get("isauthenticated"))
    );

    useEffect(() => {
        loadingChange(true);
    }, []);

    return (
        <div className="login-wrapper">
            <BackHome />
            {!isAuthenticated && (
                <React.Fragment>
                    <div className="login">
                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                            }}
                            validationSchema={Yup.object({
                                email: Yup.string()
                                    .email("Invalid email address")
                                    .required("Required"),
                                password: Yup.string()
                                    .min(6, "Must be 8 characters or more")
                                    .required("Required"),
                            })}
                            onSubmit={(
                                values: Login,
                                { setSubmitting }: FormikHelpers<Login>
                            ) => {
                                (async () => {
                                    try {
                                        loadingChange(false);

                                        console.log(values);

                                        const request = await axios.post(
                                            `http://127.0.0.1:8000/authentication/login/`,
                                            values
                                        );

                                        loadingChange(true);
                                        if (request.data.isauthenticated) {
                                            cookies.remove("isauthenticated", {
                                                path: '/'
                                            });
                                            cookies.remove("email", {
                                                path: '/'
                                            });
                                            cookies.remove("password", {
                                                path: '/'
                                            });
                                            cookies.remove("user_id", {
                                                path: '/'
                                            });

                                            cookies.set(
                                                "isauthenticated",
                                                "true",
                                                {
                                                    path: "/",
                                                }
                                            );
                                            cookies.set("email", values.email, {
                                                path: "/",
                                            });
                                            cookies.set(
                                                "password",
                                                values.password,
                                                {
                                                    path: "/",
                                                }
                                            );
                                            cookies.set(
                                                "user_id",
                                                request.data.user.id,
                                                {
                                                    path: "/",
                                                }
                                            );

                                            setSuccess(true);
                                        } else
                                            throw new (Error as any)(
                                                "isauthenticated false"
                                            );

                                        await (() => {
                                            return new Promise(resolve => {
                                                setTimeout(() => {
                                                    setSuccess(false);
                                                    resolve(true);
                                                }, 3000);
                                            });
                                        })();

                                        window.location.replace(
                                            "http://0.0.0.0:8080/"
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
                            <Form className="login-form">
                                <div className="login-form-field-wrapper">
                                    <div className="login-form-field-container">
                                        <Field
                                            name="email"
                                            className="login-form-field"
                                            type="email"
                                            placeholder="Email"
                                        />
                                    </div>
                                    <div className="login-form-field-container">
                                        <ErrorMessage
                                            component="span"
                                            className="login-form-error"
                                            name="email"
                                        />
                                    </div>
                                </div>

                                <div className="login-form-field-wrapper">
                                    <div className="login-form-field-container">
                                        <Field
                                            name="password"
                                            className="login-form-field"
                                            type="password"
                                            placeholder="Password"
                                        />
                                    </div>
                                    <div className="login-form-field-container">
                                        <ErrorMessage
                                            component="span"
                                            className="login-form-error"
                                            name="password"
                                        />
                                    </div>
                                </div>

                                <div className="login-form-field-wrapper">
                                    <div className="login-form-field-container">
                                        <button
                                            className="login-form-submit"
                                            type="submit"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                    {success && (
                        <div className="login-success">
                            <span className="login-success-message">
                                You successfully loged in!
                            </span>
                        </div>
                    )}
                    <div className="login-actions">
                        {error && <Error />}
                        {!loading && <Loading />}
                    </div>
                </React.Fragment>
            )}
                        {isAuthenticated && (
                <div className="is-authenticated-wrapper">
                    <span className="is-authenticated-message">
                        You`ve already authenticated, first log out from your
                        account!
                    </span>
                </div>
            )}
        </div>
    );
}

const LoginWrap = connect<any, any, any>(
    mapStateToProps("LOGIN"),
    mapDispatchToProps("LOGIN")
)(Login);

export default LoginWrap;
