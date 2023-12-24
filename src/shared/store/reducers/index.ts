import { combineReducers } from "@reduxjs/toolkit";
import authReducer from './AuthSlice';
import { authApi } from "../services/AuthService";

export const rootReducer = combineReducers({
    authReducer,
    [authApi.reducerPath]:authApi.reducer,
})