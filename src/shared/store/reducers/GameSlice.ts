import { IUser } from "@/entities/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

// const socket = io("http://0.0.0.0:8086", {
//   query: { gameId: id, playerId: user?.id },
// });

// socket.on("connect", () => {
//   console.log("Connect to the server");
// });

// socket.on("add_player", (data: IUser) => {
//   console.log("message form server", data);
//   dispatch(addPlayer(data));
// });
// socket.on("remove_player", (data: IUser) => {

// });

interface GameState {
  isLoading: boolean;
  error: string;
  players: IUser[];
  socket: any;
}

const initialState: GameState = {
  isLoading: false,
  error: "",
  players: [],
  socket: undefined,
};
export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    createGame(state) {
        
    },
    connectToGame(
      state,
      action: PayloadAction<{ gameId: string; userId: string }>
    ) {
      state.socket = io("http://0.0.0.0:8086", {
        query: {
          gameId: action.payload.gameId,
          playerId: action.payload.userId,
        },
      });
      console.log("connect to server");
    },
    disconnectFromGame(state) {
      state.isLoading = true;
      state.socket.disconnect();
      console.log("disconnected from the server");
    },
    handlePlayers(state) {
      if (state.socket) {
        state.socket.on("add_player", (data: IUser) => {
          state.players = [...state.players, data];
        });

        state.socket.on("remove_player", (data: IUser) => {
          state.players = state.players.filter((player) => player === data);
        });
      }
    },
  },
});
export default gameSlice.reducer;
