import { IGame } from "@/entities/game/Game";
import { IUser } from "@/entities/user";
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
    connect: build.mutation<IGame, { playerId: string; gameId: string }>({
      query: ({ playerId, gameId }) => ({
        url: "/connect",
        credentials: "include",
        params: { playerId, gameId },
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["Users"],
    }),
    disconnect: build.mutation<IGame, { playerId: string; gameId: string }>({
      query: ({ playerId, gameId }) => ({
        url: "/disconnect",
        credentials: "include",
        params: { playerId, gameId },
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["Users"],
    }),
    switchReady: build.mutation<IUser, string>({
      query: (playerId) => ({
        url: "/ready",
        credentials: "include",
        params: { playerId },
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["Users"],
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
    getAllPlayers: build.query<IUser[], string>({
      query: (gameId) => ({
        url: "/players",
        params: { gameId },
        credentials: "include",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: () => ["Users"],
    }),
  }),
});
