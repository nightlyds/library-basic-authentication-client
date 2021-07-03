import initialState from "../initialState";
import { LoadingTypes } from "../types";

const loadingReducer = (state = initialState.loading, action: LoadingTypes) => {
    switch (action.type) {
        case "LOADING":
            return action.loading;
        default:
            return state;
    }
};

export default loadingReducer;
