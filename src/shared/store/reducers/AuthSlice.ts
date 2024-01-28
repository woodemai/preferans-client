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
    handleSwitchReady(state) {
      state.user.ready = !state.user.ready;
    },
    handleDisconnect(state) {
      state.user.ready = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          state.token = payload.accessToken;
          state.user = payload.user;
          state.error = undefined;
          localStorage.setItem("token", payload.accessToken);
          localStorage.setItem("user", JSON.stringify(payload.user));
          state.isAuth = true;
        }
      )
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.token = payload.accessToken;
          state.user = payload.user;
          state.error = undefined;
          localStorage.setItem("token", payload.accessToken);
          localStorage.setItem("user", JSON.stringify(payload.user));
          state.isAuth = true;
        }
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.token = "";
        state.user = {} as IUser;
        state.isAuth = false;
        state.error = undefined;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      })
      .addMatcher(
        authApi.endpoints.refresh.matchFulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          state.token = payload.accessToken;
          state.user = payload.user;
          state.error = undefined;
          state.isAuth = true;
          localStorage.setItem("token", payload.accessToken);
          localStorage.setItem("user", JSON.stringify(payload.user));
        }
      )
      .addMatcher(authApi.endpoints.refresh.matchPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(
        authApi.endpoints.login.matchRejected,
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload?.status;
        }
      )
      .addMatcher(
        authApi.endpoints.register.matchRejected,
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload?.status;
        }
      )
      .addMatcher(
        authApi.endpoints.refresh.matchRejected,
        (state) => {
          state.isLoading = false;
          state.error = "REJECTED";
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
