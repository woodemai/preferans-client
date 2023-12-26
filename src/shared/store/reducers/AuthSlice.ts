import { IUser } from "@/entities/user"
import { createSlice } from "@reduxjs/toolkit"
import { authApi } from "../services/AuthService"
import { gameApi } from "../services/GameService"

type AuthState = {
    user: IUser | null,
    token: string | null,
}
const initialState: AuthState = {
    user: null,
    token: null
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        swtichReady(state) {
            if (state.user) {
                state.user.ready = !state.user.ready
            }
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.register.matchFulfilled,
            (state, { payload }) => {
                state.token = payload.accessToken;
                state.user = payload.user
                localStorage.setItem('token', payload.accessToken);
                localStorage.setItem('user', JSON.stringify(payload.user))
            }
        )
        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                state.token = payload.accessToken;
                state.user = payload.user
                localStorage.setItem('token', payload.accessToken);
                localStorage.setItem('user', JSON.stringify(payload.user))
            },
        )
        builder.addMatcher(
            authApi.endpoints.logout.matchFulfilled,
            (state) => {
                state.token = null;
                state.user = null;
                localStorage.removeItem('token')
                localStorage.removeItem('user')
            },
        )
        builder.addMatcher(
            authApi.endpoints.refresh.matchFulfilled,
            (state, { payload }) => {
                state.token = payload.accessToken;
                state.user = payload.user
                localStorage.setItem('token', payload.accessToken);
                localStorage.setItem('user', JSON.stringify(payload.user))
            },
        )
        builder.addMatcher(
            gameApi.endpoints.switchReady.matchFulfilled,
            (state,{payload}) => {
                state.user = payload
                localStorage.setItem('user', JSON.stringify(payload))
            }
        )
    }
})
export default authSlice.reducer;