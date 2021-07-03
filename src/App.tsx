import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store/store";

import "normalize.css";
import "./css/style.css";
import "./css/media_style.css";
import "./css/fonts_and_colors.css";

import HomePageWrap from "./HomePage";

import UsersListWrap from "./components/authentication/UsersList";
import CreateUserWrap from "./components/authentication/CreateUser";
import UpdateUserWrap from "./components/authentication/UpdateUser";

import LoginWrap from "./components/authentication/Login";

import OrdersListWrap from "./components/orders/OrdersList";
import CreateOrderWrap from "./components/orders/CreateOrder";
import UpdateOrderWrap from "./components/orders/UpdateOrder";

import Error404 from "./components/Error404";
import Profile from "./components/authentication/Profile";

function App() {
    return (
        <div className="App">
            <Profile />
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={HomePageWrap} />

                        <Route
                            exact
                            path="/authentication/"
                            component={UsersListWrap}
                        />
                        <Route
                            exact
                            path="/authentication/create"
                            component={CreateUserWrap}
                        />
                        <Route
                            exact
                            path="/authentication/:id/update"
                            render={props => {
                                return <UpdateUserWrap {...props} />;
                            }}
                        />

                        <Route exact path="/authentication/login/" component={LoginWrap} />

                        <Route exact path="/orders/" component={OrdersListWrap} />
                        <Route
                            exact
                            path="/orders/create"
                            component={CreateOrderWrap}
                        />
                        <Route
                            exact
                            path="/orders/:id/update"
                            render={props => {
                                return <UpdateOrderWrap {...props} />;
                            }}
                        />

                        <Route component={Error404} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;
