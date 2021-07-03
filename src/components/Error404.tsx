import React from "react";

const Error404 = (): JSX.Element => {
    return (
        <div className="error-404">
            <div className="error-404-content">
                <h2 className="error-404-title">404</h2>
                <span className="error-404-text">Page not found!</span>
            </div>
        </div>
    );
};

export default Error404;
