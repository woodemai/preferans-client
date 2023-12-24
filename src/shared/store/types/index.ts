import store from "..";
import { rootReducer } from "../reducers";

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;