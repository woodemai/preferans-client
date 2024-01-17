import { combineReducers } from "@reduxjs/toolkit";
import authReducer from './AuthSlice';
import { authApi } from "../services/AuthService";
import { gameApi } from "../services/GameService";

export const rootReducer = combineReducers({
    authReducer,
    [authApi.reducerPath]:authApi.reducer,
    [gameApi.reducerPath]:gameApi.reducer,
})