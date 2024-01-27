import { IGame } from "@/entities/game";
import { BASE_URL } from "@/shared/lib/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
      invalidatesTags: ["Games"],
    }),
    getGame: build.query<IGame, string>({
      query: (gameId) => ({
        url: "/one",
        params: { gameId },
        credentials: "include",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
      providesTags: () => ["Game"],
    }),
    getAllGames: build.query<IGame[], { pageNumber: number; pageSize: number }>(
      {
        query: ({ pageNumber, pageSize }) => ({
          url: "/all",
          credentials: "include",
          params: { pageNumber, pageSize },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }),
        providesTags: () => ["Games"],
      }
    ),
  }),
});
