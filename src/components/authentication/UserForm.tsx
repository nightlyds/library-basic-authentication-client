import React from "react";
import { Field, Form, ErrorMessage } from "formik";

function UserForm() {
    return (
        <Form className="user-form">
            <div className="user-form-field-wrapper">
                <div className="user-form-field-container">
                    <Field
                        name="first_name"
                        className="user-form-field"
                        type="text"
                        placeholder="First Name"
                    />
                </div>
                <div className="user-form-field-container">
                    <ErrorMessage
                        component="span"
                        className="user-form-error"
                        name="first_name"
                    />
                </div>
            </div>

            <div className="user-form-field-wrapper">
                <div className="user-form-field-container">
                    <Field
                        name="middle_name"
                        className="user-form-field"
                        type="text"
                        placeholder="Middle Name"
                    />
                </div>
                <div className="user-form-field-container">
                    <ErrorMessage
                        component="span"
                        className="user-form-error"
                        name="middle_name"
                    />
                </div>
            </div>

            <div className="user-form-field-wrapper">
                <div className="user-form-field-container">
                    <Field
                        name="last_name"
                        className="user-form-field"
                        type="text"
                        placeholder="Last Name"
                    />
                </div>
                <div className="user-form-field-container">
                    <ErrorMessage
                        component="span"
                        className="user-form-error"
                        name="last_name"
                    />
                </div>
            </div>

            <div className="user-form-field-wrapper">
                <div className="user-form-field-container">
                    <Field
                        name="email"
                        className="user-form-field"
                        type="email"
                        placeholder="Email"
                    />
                </div>
                <div className="user-form-field-container">
                    <ErrorMessage
                        component="span"
                        className="user-form-error"
                        name="email"
                    />
                </div>
            </div>

            <div className="user-form-field-wrapper">
                <div className="user-form-field-container">
                    <Field
                        name="password"
                        className="user-form-field"
                        type="password"
                        placeholder="Password"
                    />
                </div>
                <div className="user-form-field-container">
                    <ErrorMessage
                        component="span"
                        className="user-form-error"
                        name="password"
                    />
                </div>
            </div>

            <div className="user-form-field-wrapper">
                <div className="user-form-field-container">
                    <label htmlFor="role" className="user-form-label">
                        Role
                    </label>
                    <Field name="role" className="user-form-select" as="select">
                        <option value="0">visitor</option>
                        <option value="1">admin</option>
                    </Field>
                </div>
            </div>

            <div className="user-form-field-wrapper">
                <div className="user-form-field-container">
                    <label htmlFor="is_active" className="user-form-label">
                        Is Active
                    </label>
                    <Field
                        name="is_active"
                        className="user-form-checkbox"
                        type="checkbox"
                    />
                </div>
            </div>

            <div className="user-form-field-wrapper">
                <div className="user-form-field-container">
                    <button className="user-form-submit" type="submit">
                        Submit
                    </button>
                </div>
            </div>
        </Form>
    );
}

export default UserForm;
