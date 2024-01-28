import { AuthRequest, AuthResponse, IUser } from "@/entities/user";
import { BASE_URL } from "@/shared/lib/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  tagTypes: ["Auth"],
  endpoints: (build) => ({
    register: build.mutation<AuthResponse, IUser>({
      query: (user) => ({
        url: "/auth/register",
        credentials: "include",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Auth"],
    }),
    login: build.mutation<AuthResponse, AuthRequest>({
      query: (request) => ({
        url: "/auth/login",
        credentials: "include",
        method: "POST",
        body: request,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        credentials: "include",
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
      invalidatesTags: ["Auth"],
    }),
    refresh: build.query<AuthResponse, void>({
      query: () => ({
        url: "/auth/refresh",
        credentials: "include",
      }),
      providesTags: () => ["Auth"],
    }),
    changeName: build.mutation<void, { userId: string; newName: string }>({
      query: ({ userId, newName }) => ({
        url: "/users/change-name",
        credentials: "include",
        method: "PATCH",
        params: { userId, newName },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});
