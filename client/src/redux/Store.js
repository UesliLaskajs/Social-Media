import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./Users/UserSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
    version: 1
};

const rootReducer = combineReducers({
    user: userReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false // Temporarily disabled, handle non-serializable values in reducers
        })
});

export const persistor = persistStore(store);
