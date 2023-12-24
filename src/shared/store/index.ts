import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import { authApi } from "./services/AuthService";

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
})
export default store;