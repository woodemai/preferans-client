import { IGame } from "@/entities/game/Game";
import { createSlice } from "@reduxjs/toolkit";
import { gameApi } from "../services/GameService";
import { IUser } from "@/entities/user";
import { GameInfo } from "@/entities/game/GameStartedResponse";

type GameState = {
  isLoading: boolean;
  error: string | number | undefined;

  game: IGame;
  players: IUser[];
};
const initialState: GameState = {
  isLoading: false,
  error: undefined,

  game: {} as IGame,
  players: [] as IUser[],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    handleConnect(state, { payload }) {
      state.game = payload.game;
    },
    handleGameInfo(state, { payload }: { payload: GameInfo }) {
      state.isLoading = false;
      state.game = payload.game;
      state.players = payload.users;
    },
    handleAllReady(state) {
      state.isLoading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(gameApi.endpoints.getGame.matchPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(
        gameApi.endpoints.getGame.matchFulfilled,
        (state, { payload }) => {
          state.game = payload;
          state.isLoading = false;
        }
      )
      .addMatcher(
        gameApi.endpoints.getGame.matchRejected,
        (state, { payload }) => {
          state.error = payload?.status;
          state.isLoading = false;
        }
      );
  },
});
export default gameSlice.reducer;
