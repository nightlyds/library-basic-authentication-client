import React from "react";

type IsAuthenticatedCheckProps = {
    isAuthenticatedStatus: boolean;
};

export default function IsAuthenticatedCheck({
    isAuthenticatedStatus,
}: IsAuthenticatedCheckProps) {
    return (
        <React.Fragment>
            {!isAuthenticatedStatus && (
                <div className="is-authenticated-check-wrapper">
                    <span className="is-authenticated-check-message">
                        You must authenticate first!
                    </span>
                </div>
            )}
        </React.Fragment>
    );
}
