import { AuthRequest, AuthResponse, IUser } from "@/entities/user";
import { BASE_URL } from "@/shared/lib/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/auth` }),
  tagTypes: ["Auth"],
  endpoints: (build) => ({
    register: build.mutation<AuthResponse, IUser>({
      query: (user) => ({
        url: "/register",
        credentials: "include",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Auth"],
    }),
    login: build.mutation<AuthResponse, AuthRequest>({
      query: (request) => ({
        url: "/login",
        credentials: "include",
        method: "POST",
        body: request,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: "/logout",
        credentials: "include",
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
      invalidatesTags: ["Auth"],
    }),
    refresh: build.query<AuthResponse, void>({
      query: () => ({
        url: "/refresh",
        credentials: "include",
      }),
      providesTags: () => ["Auth"],
    }),
  }),
});