import React from "react";

const HomePage: React.FC = ({}) => {
    return (
        <div className="home-page-wrapper">
            <div className="home-page-container">
                <div className="home-page-menu">
                    <div className="home-page-menu-wrapper">
                        <span className="home-page-menu-list">
                            <a href="authentication/">Users List</a>
                        </span>
                    </div>
                    <div className="home-page-menu-wrapper">
                        <span className="home-page-menu-list">
                            <a href="authentication/create/">Create User</a>
                        </span>
                    </div>
                    <div className="home-page-menu-wrapper">
                        <span className="home-page-menu-list">
                            <a href="authentication/login/">Login</a>
                        </span>
                    </div>
                    <div className="home-page-menu-wrapper">
                        <span className="home-page-menu-list">
                            <a href="orders/">Orders</a>
                        </span>
                    </div>
                    <div className="home-page-menu-wrapper">
                        <span className="home-page-menu-list">
                            <a href="orders/create/">Create Order</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
