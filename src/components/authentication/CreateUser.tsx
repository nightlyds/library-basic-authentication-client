import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import mapStateToProps from "../../store/mapStateToProps";
import mapDispatchToProps from "../../store/mapDispatchToProps";
import { UserObjectTypes } from "../../store/types";
import UserForm from "./UserForm";
import Loading from "../Loading";
import Error from "../Error";
import BackHome from "../BackHome";

interface CreateUserProps {
    loading: boolean;
    error: boolean;
    loadingChange: (loading: boolean) => void;
    errorChange: (error: boolean) => void;
}

const CreateUser = ({
    loading,
    error,
    loadingChange,
    errorChange,
}: CreateUserProps) => {
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        loadingChange(true);
    }, []);

    return (
        <div className="update-user-wrapper">
            <BackHome />
            {loading && !error && (
                <div className="user">
                    <Formik
                        initialValues={{
                            first_name: "",
                            middle_name: "",
                            last_name: "",
                            email: "",
                            password: "",
                            role: 0,
                            is_active: true,
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
                            (async () => {
                                try {
                                    loadingChange(false);
                                    const request = await axios.post(
                                        `http://127.0.0.1:8000/authentication/`,
                                        values
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
                        You successfully created user!
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

const CreateUserWrap = connect<any, any, any>(
    mapStateToProps("CREATE_USER"),
    mapDispatchToProps("CREATE_USER")
)(CreateUser);

export default CreateUserWrap;
