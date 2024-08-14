import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    token: null,
    isLoggedIn: false
}

export const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action?.payload?.user;
            state.token = action?.payload?.token;
            state.isLoggedIn = action?.payload?.token !== null
        },
        setLogout: () => {
            return initialState
        }
    },
})

export const { setUser, setLogout } = userAuthSlice.actions

export default userAuthSlice.reducer