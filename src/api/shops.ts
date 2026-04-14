/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import type { Shop } from "../types/shops";
import { axiosBaseQuery } from "./axiosBaseQuery";

export const shopsApi = createApi({
  reducerPath: "shops",
  baseQuery: axiosBaseQuery(),

  endpoints: (builder) => ({
    getShops: builder.query<Shop[], void>({
      query: () => ({ url: "v1/shops", method: "GET" }),
      transformResponse: (response: any) => response,
    }),
  }),
});

export const { useGetShopsQuery } = shopsApi;
