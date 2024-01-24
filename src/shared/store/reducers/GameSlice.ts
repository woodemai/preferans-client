import { IGame } from "@/entities/game";
import { createSlice } from "@reduxjs/toolkit";
import { gameApi } from "../services/GameService";
import { IUser } from "@/entities/user";
import { GameInfo } from "@/entities/game/GameInfo";
import { MoveInfo } from "@/entities/game/MoveInfo";

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
    handleMoveInfo(state, { payload }: { payload: MoveInfo }) {
      state.game.tableDeck.push(payload.card);
      state.players = state.players.map((player) => {
        if (player.id === payload.playerId) {
          player.cards = player.cards.filter(
            (card) => card.id !== payload.card.id
          );
        }
        return player;
      });
    },
    handlePurchaseMove(state) {
      const card = state.game.purchase.pop()
      if (card) {
        state.game.tableDeck.push(card)
      }
    },
    handleNextTurn(state) {
      state.game.currentPlayerIndex =
        state.game.currentPlayerIndex < 2
          ? state.game.currentPlayerIndex + 1
          : 0;
    },
    handleBribeEnd(state, { payload }: { payload: string }) {
      for (const player of state.players) {
        if (player.id == payload) {
          player.score = player.score + 1
        }
      }
      state.game.tableDeck = []
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
