import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import mapStateToProps from "../../store/mapStateToProps";
import mapDispatchToProps from "../../store/mapDispatchToProps";
import { UserObjectTypes, RouteIDType } from "../../store/types";
import UserForm from "./UserForm";
import Loading from "../Loading";
import Error from "../Error";
import BackHome from "../BackHome";

interface UpdateUserProps extends RouteComponentProps<RouteIDType> {
    user: UserObjectTypes;
    loading: boolean;
    error: boolean;
    userChange: (user: UserObjectTypes) => void;
    loadingChange: (loading: boolean) => void;
    errorChange: (error: boolean) => void;
} // Types for props, also here is using Router props for match param

const UpdateUser = ({
    user,
    match,
    loading,
    error,
    userChange,
    loadingChange,
    errorChange,
}: UpdateUserProps) => {
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            if (error) errorChange(false);
            if (loading) loadingChange(false);
            try {
                const request = await axios.get<UserObjectTypes>(
                    `http://127.0.0.1:8000/authentication/${match.params.id}/`
                );
                userChange(request.data);
                loadingChange(true);
            } catch (error) {
                loadingChange(true);
                errorChange(true);
            }
        })();
    }, []);

    return (
        <div className="update-user-wrapper">
            <BackHome />
            {loading && !error && user && (
                <div className="user">
                    <Formik
                        initialValues={{
                            first_name: user.first_name,
                            middle_name: user.middle_name,
                            last_name: user.last_name,
                            email: user.email,
                            password: "",
                            role: user.role,
                            is_active: user.is_active,
                        }}
                        validationSchema={Yup.object({
                            first_name: Yup.string().max(
                                20,
                                "Must be 20 characters or less"
                            ),
                            middle_name: Yup.string().max(
                                20,
                                "Must be 20 characters or less"
                            ),
                            last_name: Yup.string().max(
                                20,
                                "Must be 20 characters or less"
                            ),
                            email: Yup.string().email("Invalid email address"),
                            password: Yup.string()
                                .min(6, "Must be 8 characters or more")
                                .required("Required"),
                        })}
                        onSubmit={(
                            values: UserObjectTypes,
                            { setSubmitting }: FormikHelpers<UserObjectTypes>
                        ) => {
                            const body: UserObjectTypes = values;
                            body.id = user.id;

                            (async () => {
                                try {
                                    loadingChange(false);
                                    const request = await axios.put(
                                        `http://127.0.0.1:8000/authentication/${match.params.id}/`,
                                        body
                                    );

                                    userChange(request.data);
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
                                        "http://0.0.0.0:8080/authentication/"
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
                        <UserForm />
                    </Formik>
                </div>
            )}
            {success && (
                <div className="user-success">
                    <span className="user-success-message">
                        You successfully updated user!
                    </span>
                </div>
            )}
            <div className="user-actions">
                {error && <Error />}
                {!loading && <Loading />}
            </div>
        </div>
    );
};

const UpdateUserWrap = connect<any, any, any>(
    mapStateToProps("UPDATE_USER"),
    mapDispatchToProps("UPDATE_USER")
)(UpdateUser);

export default UpdateUserWrap;
