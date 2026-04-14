/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import axiosInstance from "../config/axiosConfig";

type AxiosBaseQueryArgs = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: any;
  params?: any;
};

export const axiosBaseQuery =
  (): BaseQueryFn<AxiosBaseQueryArgs, unknown, { message: string }> =>
  async ({ url, method = "GET", data, params }) => {
    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
      });

      return { data: result.data };
    } catch (axiosError: any) {
      return {
        error: {
          message: axiosError.response?.data?.message || "Something went wrong",
        },
      };
    }
  };
