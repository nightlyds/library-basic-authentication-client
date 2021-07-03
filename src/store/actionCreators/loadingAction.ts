import { LoadingTypes } from "../types";

const loadingAction = (loading: boolean): LoadingTypes => ({
    type: "LOADING",
    loading,
});

export default loadingAction;
