import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import { authApi } from "./services/AuthService";
import { gameApi } from "./services/GameService";

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware, gameApi.middleware)
})
export default store;