import { jwtDecode } from "jwt-decode";
import { setLogout } from "../redux/slices/userAuth";

export const tokenExpirationMiddleware = (store) => (next) => (action) => {
    const result = next(action);

    const state = store.getState();
    const token = state?.userAuth?.token;

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp < currentTime) {
                store.dispatch(setLogout());
                return;
            }
        } catch (error) {
            console.error("Failed to decode token:", error);
            return;
        }
    }

    return result;
};