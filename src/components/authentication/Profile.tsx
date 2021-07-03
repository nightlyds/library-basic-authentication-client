import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import Cookies from "universal-cookie";

function Profile() {
    const cookies = new Cookies();
    let [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        Boolean(cookies.get("isauthenticated"))
    );
    let [email, setEmail] = useState<string>(cookies.get("email") || "");
    let [logOutOpen, setLogOutOpen] = useState<boolean>(false);

    let logOut = () => {
        cookies.remove("isauthenticated", {
            path: "/",
        });
        cookies.remove("email", {
            path: "/",
        });
        cookies.remove("password", {
            path: "/",
        });

        setTimeout(() => {
            location.reload();
        }, 1000);
    };

    return (
        <React.Fragment>
            {isAuthenticated && (
                <div className="profile">
                    <div className="email-logout-icon-wrapper">
                        <div className="email-logout-icon-container">
                            <span
                                className="email"
                                onClick={() => {
                                    setLogOutOpen(!logOutOpen);
                                }}
                            >
                                {email}{" "}
                                <FontAwesomeIcon
                                    className={`logout-icon ${
                                        logOutOpen ? "logout-icon-open" : ""
                                    }`}
                                    icon={logOutOpen ? faSortUp : faSortDown}
                                />
                            </span>
                        </div>
                    </div>
                    {logOutOpen && (
                        <div className="logout-action-wrapper">
                            <div className="logout-action-container">
                                <span
                                    className="logout-action"
                                    onClick={() => {
                                        logOut();
                                    }}
                                >
                                    Log out
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </React.Fragment>
    );
}

export default Profile;
