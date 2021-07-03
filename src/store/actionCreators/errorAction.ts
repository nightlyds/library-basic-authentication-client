import { ErrorTypes } from "../types";

const errorAction = (error: boolean): ErrorTypes => ({
    type: "ERROR",
    error,
});

export default errorAction;
