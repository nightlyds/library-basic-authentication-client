import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircle,
    faUserNinja,
    faUserAstronaut,
} from "@fortawesome/free-solid-svg-icons";
import mapStateToProps from "../../store/mapStateToProps";
import mapDispatchToProps from "../../store/mapDispatchToProps";
import {
    UsersListObjectTypes,
    UserObjectTypes,
    UsersListTypes,
} from "../../store/types";
import Loading from "../Loading";
import Error from "../Error";
import BackHome from "../BackHome";

type UsersListProps = {
    users: UsersListObjectTypes;
    loading: boolean;
    error: boolean;
    usersListChange: (users: UsersListObjectTypes) => void;
    loadingChange: (loading: boolean) => void;
    errorChange: (error: boolean) => void;
};

function UsersList({
    users,
    loading,
    error,
    usersListChange,
    loadingChange,
    errorChange,
}: UsersListProps) {
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try {
                const request = await axios.get<UsersListTypes[]>(
                    "http://127.0.0.1:8000/authentication/"
                );
                usersListChange(request.data);
                loadingChange(true);
            } catch (error) {
                console.log(error.message);
                errorChange(true);
                loadingChange(true);

                setTimeout(() => {
                    location.reload();
                }, 1000);
            }
        })();
    }, []);

    const deleteUser = (id: number | undefined) => {
        (async () => {
            if (error) errorChange(false);
            if (loading) loadingChange(false);
            try {
                const request = await axios.delete(
                    `http://127.0.0.1:8000/authentication/${id}/`
                );
                loadingChange(true);
                setSuccess(true);
            } catch (error) {
                console.log(error.message);
                errorChange(true);
                loadingChange(true);
            }

            setTimeout(() => {
                if (success) setSuccess(false);
                location.reload();
            }, 1000);
        })();
    };

    return (
        <div className="users-list-wrapper">
            <BackHome />
            {success && (
                <div className="user-success">
                    <span className="user-success-message">
                        You successfully deleted user!
                    </span>
                </div>
            )}
            {loading && !error && (
                <div className="users-list">
                    <div className="users-list-center">
                        {users.map((user: UserObjectTypes, index: number) => (
                            <div
                                className="users-list-user"
                                key={`${index}_${user.id}`}
                            >
                                <div className="users-list-user-active-admin-wrapper">
                                    <div className="users-list-user-active-wrapper">
                                        <FontAwesomeIcon
                                            icon={faCircle}
                                            className={`users-list-user-active ${
                                                user.is_active
                                                    ? "user-list-user-active-true"
                                                    : "user-list-user-active-false"
                                            }`}
                                        />
                                    </div>
                                    <div className="users-list-user-admin-wrapper">
                                        <FontAwesomeIcon
                                            icon={
                                                user.is_admin || user.role === 1
                                                    ? faUserNinja
                                                    : faUserAstronaut
                                            }
                                            className="users-list-user-admin"
                                        />
                                    </div>
                                </div>
                                <div className="users-list-user-info-wrapper">
                                    <span className="users-list-user-first-name">
                                        First name: {user.first_name}
                                    </span>
                                    <span className="users-list-user-middle-name">
                                        Middle name: {user.middle_name}
                                    </span>
                                    <span className="users-list-user-last-name">
                                        Last name: {user.last_name}
                                    </span>
                                    <span className="users-list-user-email">
                                        Email: {user.email}
                                    </span>
                                </div>
                                <div className="users-list-user-dates-wrapper">
                                    <span className="users-list-user-created-at">
                                        Created At:{" "}
                                        {new Date(
                                            user.created_at || new Date()
                                        ).toDateString()}
                                    </span>
                                    <span className="users-list-user-updated-at">
                                        Updated At:{" "}
                                        {new Date(
                                            user.updated_at || new Date()
                                        ).toDateString()}
                                    </span>
                                </div>
                                <div className="users-list-user-update-delete-wrapper hidden">
                                    <div className="users-list-user-update-wrapper">
                                        <a
                                            href={`${user.id}/update/`}
                                            className="users-list-user-update"
                                        >
                                            Update
                                        </a>
                                    </div>
                                    <div className="users-list-user-delete-wrapper">
                                        <span
                                            className="users-list-user-delete"
                                            onClick={() => {
                                                deleteUser(user.id);
                                            }}
                                        >
                                            Delete
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="users-list-actions">
                {error && <Error />}
                {!loading && <Loading />}
            </div>
        </div>
    );
}

const UsersListWrap = connect<any, any, any>(
    mapStateToProps("USERS_LIST"),
    mapDispatchToProps("USERS_LIST")
)(UsersList);

export default UsersListWrap;
