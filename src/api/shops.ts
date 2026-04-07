import axios from "axios";
import axiosInstance from "../config/axiosConfig";
import type { Shops } from "../types/shops";

export const getShops = async (): Promise<Shops[]> => {
  try {
    const response = await axiosInstance.get("v1/shops");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";

      throw new Error(message);
    }

    throw new Error("Unexpected error occurred");
  }
};
