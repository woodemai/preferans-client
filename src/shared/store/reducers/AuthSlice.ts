import { IUser } from "@/entities/user";
import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../services/AuthService";

type AuthState = {
  user: IUser;
  token: string;
  error: string | number | undefined;
  isLoading: boolean;
  isAuth: boolean;
};
const initialState: AuthState = {
  user: {} as IUser,
  token: "",
  error: "",
  isLoading: false,
  isAuth: false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleSwitchReady(state){
      state.user.ready = !state.user.ready
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          state.token = payload.accessToken;
          state.user = payload.user;
          state.isAuth = true;
          localStorage.setItem("token", payload.accessToken);
          localStorage.setItem("user", JSON.stringify(payload.user));
        }
      )
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.token = payload.accessToken;
          state.user = payload.user;
          state.isAuth = true;
          localStorage.setItem("token", payload.accessToken);
          localStorage.setItem("user", JSON.stringify(payload.user));
        }
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.token = "";
        state.user = {} as IUser;
        state.isAuth = false;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      })
      .addMatcher(
        authApi.endpoints.refresh.matchFulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          state.token = payload.accessToken;
          state.user = payload.user;
          state.isAuth = true;
          localStorage.setItem("token", payload.accessToken);
          localStorage.setItem("user", JSON.stringify(payload.user));
        }
      )
      .addMatcher(authApi.endpoints.refresh.matchPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(
        authApi.endpoints.refresh.matchRejected,
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload?.status;
          state.isAuth = false;
          state.token = "";
          state.user = {} as IUser;
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      );
  },
});
export default authSlice.reducer;
