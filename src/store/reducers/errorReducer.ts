import initialState from "../initialState";
import { ErrorTypes } from "../types";

const errorReducer = (state = initialState.error, action: ErrorTypes) => {
    switch (action.type) {
        case "ERROR":
            return action.error;
        default:
            return state;
    }
};

export default errorReducer;
