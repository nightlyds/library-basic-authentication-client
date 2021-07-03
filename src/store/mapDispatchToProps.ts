import { AnyAction, bindActionCreators, Dispatch } from "redux";
import loadingAction from "./actionCreators/loadingAction";
import errorAction from "./actionCreators/errorAction";
import usersListAction from "./actionCreators/usersListAction";
import userAction from "./actionCreators/userAction";
import ordersListAction from "./actionCreators/ordersListAction";
import orderAction from "./actionCreators/orderAction";

function mapDispatchToProps(component: string) {
    switch (component) {
        case "USERS_LIST":
            return function (dispatch: Dispatch<AnyAction>) {
                return {
                    usersListChange: bindActionCreators(
                        usersListAction,
                        dispatch
                    ),
                    loadingChange: bindActionCreators(loadingAction, dispatch),
                    errorChange: bindActionCreators(errorAction, dispatch),
                };
            };
        case "CREATE_USER":
            return function (dispatch: Dispatch<AnyAction>) {
                return {
                    loadingChange: bindActionCreators(loadingAction, dispatch),
                    errorChange: bindActionCreators(errorAction, dispatch),
                };
            };
        case "UPDATE_USER":
            return function (dispatch: Dispatch<AnyAction>) {
                return {
                    userChange: bindActionCreators(userAction, dispatch),
                    loadingChange: bindActionCreators(loadingAction, dispatch),
                    errorChange: bindActionCreators(errorAction, dispatch),
                };
            };
        case "LOGIN":
            return function (dispatch: Dispatch<AnyAction>) {
                return {
                    loadingChange: bindActionCreators(loadingAction, dispatch),
                    errorChange: bindActionCreators(errorAction, dispatch),
                };
            };
        case "ORDERS_LIST":
            return function (dispatch: Dispatch<AnyAction>) {
                return {
                    ordersListChange: bindActionCreators(
                        ordersListAction,
                        dispatch
                    ),
                    loadingChange: bindActionCreators(loadingAction, dispatch),
                    errorChange: bindActionCreators(errorAction, dispatch),
                };
            };
        case "CREATE_ORDER":
            return function (dispatch: Dispatch<AnyAction>) {
                return {
                    loadingChange: bindActionCreators(loadingAction, dispatch),
                    errorChange: bindActionCreators(errorAction, dispatch),
                };
            };

        case "UPDATE_ORDER":
            return function (dispatch: Dispatch<AnyAction>) {
                return {
                    orderChange: bindActionCreators(orderAction, dispatch),
                    loadingChange: bindActionCreators(loadingAction, dispatch),
                    errorChange: bindActionCreators(errorAction, dispatch),
                };
            };
        default:
            return undefined;
    }
}

export default mapDispatchToProps;
