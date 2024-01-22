import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "../services/AuthService";
import { gameApi } from "../services/GameService";
import authReducer from "./AuthSlice";
import gameReducer from "./GameSlice";

export const rootReducer = combineReducers({
    authReducer,
    gameReducer,
    [authApi.reducerPath]:authApi.reducer,
    [gameApi.reducerPath]:gameApi.reducer,
})