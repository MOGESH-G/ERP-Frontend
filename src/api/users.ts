import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    changePassword: builder.mutation<void, { currentPassword: string; newPassword: string }>({
      query: (body) => ({
        url: "v1/auth/change-password",
        method: "POST",
        data: body,
      }),
    }),
  }),
});

export const { useChangePasswordMutation } = usersApi;
