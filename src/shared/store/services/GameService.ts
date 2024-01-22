import { IGame } from "@/entities/game/Game";
import { BASE_URL } from "@/shared/lib/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token = localStorage.getItem("token");

export const gameApi = createApi({
  reducerPath: "gameApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/game` }),
  tagTypes: ["Game", "Games", "Users"],
  invalidationBehavior: "immediately",
  endpoints: (build) => ({
    createGame: build.mutation<IGame, string>({
      query: (playerId) => ({
        url: "/create",
        credentials: "include",
        params: { playerId },
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["Games"],
    }),
      getGame: build.query<IGame, string>({
      query: (gameId) => ({
        url: "/one",
        params: { gameId },
        credentials: "include",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: () => ["Game"],
    }),
    getAllGames: build.query<IGame[], void>({
      query: () => ({
        url: "/all",
        credentials: "include",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: () => ["Games"],
    }),
  }),
});
