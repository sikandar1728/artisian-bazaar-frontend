import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

import userAuthReducer from './slices/userAuth'
import baseApi from '../services/baseApi'
import { tokenExpirationMiddleware } from '../utils/requireAuth'

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    userAuth: userAuthReducer,
    [baseApi.reducerPath]: baseApi.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(tokenExpirationMiddleware).concat(baseApi.middleware),
})