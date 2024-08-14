export const getErrorMessage = (e) => {
    if (
        typeof e === "object" &&
        e &&
        "data" in e &&
        typeof e.data === "object" &&
        e.data &&
        "message" in e.data &&
        typeof e.data.message === "string"
    ) {
        return e.data.message;
    }
    return "Something went wrong";
};