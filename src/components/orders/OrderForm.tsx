import React from "react";
import { Field, Form, ErrorMessage } from "formik";

function OrderForm() {
    return (
        <Form className="order-form">
            <div className="order-form-field-wrapper">
                <div className="order-form-field-container">
                    <Field
                        name="user"
                        className="order-form-field"
                        type="text"
                        placeholder="User"
                        disabled
                    />
                </div>
                <div className="order-form-field-container">
                    <ErrorMessage
                        component="span"
                        className="order-form-error"
                        name="user"
                    />
                </div>
            </div>

            <div className="order-form-field-wrapper">
                <div className="order-form-field-container">
                    <Field
                        name="book"
                        className="order-form-field"
                        type="text"
                        placeholder="Book"
                        disabled
                    />
                </div>
                <div className="order-form-field-container">
                    <ErrorMessage
                        component="span"
                        className="order-form-error"
                        name="book"
                    />
                </div>
            </div>

            <div className="order-form-field-wrapper">
                <div className="order-form-field-container">
                    <Field
                        name="created_at"
                        className="order-form-field"
                        type="text"
                        placeholder="Created At"
                    />
                </div>
                <div className="order-form-field-container">
                    <ErrorMessage
                        component="span"
                        className="order-form-error"
                        name="created_at"
                    />
                </div>
            </div>

            <div className="order-form-field-wrapper">
                <div className="order-form-field-container">
                    <Field
                        name="end_at"
                        className="order-form-field"
                        type="text"
                        placeholder="End At"
                    />
                </div>
                <div className="order-form-field-container">
                    <ErrorMessage
                        component="span"
                        className="order-form-error"
                        name="end_at"
                    />
                </div>
            </div>

            <div className="order-form-field-wrapper">
                <div className="order-form-field-container">
                    <Field
                        name="plated_end_at"
                        className="order-form-field"
                        type="text"
                        placeholder="Plated End At"
                    />
                </div>
                <div className="order-form-field-container">
                    <ErrorMessage
                        component="span"
                        className="order-form-error"
                        name="plated_end_at"
                    />
                </div>
            </div>


            <div className="order-form-field-wrapper">
                <div className="order-form-field-container">
                    <button className="order-form-submit" type="submit">
                        Submit
                    </button>
                </div>
            </div>
        </Form>
    );
}

export default OrderForm;
