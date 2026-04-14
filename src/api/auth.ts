/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import type { User } from "../types/user";
import { axiosBaseQuery } from "./axiosBaseQuery";

export interface LoginResponse {
  user: User;
  token: string;
}

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: axiosBaseQuery(),

  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { phone: string; password: string }>({
      query: (body) => ({
        url: "v1/auth/login",
        method: "POST",
        body,
      }),
      transformResponse: (response: any) => ({
        user: response.data,
        token: response.token,
      }),
    }),

    // 🚪 LOGOUT
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "v1/auth/logout",
        method: "POST",
      }),
    }),

    // 👤 VERIFY USER
    verifyUser: builder.query<User, void>({
      query: () => ({
        url: "v1/shops",
        method: "GET",
      }),
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useVerifyUserQuery } = authApi;
