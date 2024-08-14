import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../config/app"

export const baseApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_BASE_URL}`,
        prepareHeaders: (headers, { getState }) => {
            const state = getState();
            const token = state?.userAuth?.token;

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: [
        "User",
    ],
    reducerPath: "baseApi",
    endpoints: () => ({}),
});

export default baseApi;