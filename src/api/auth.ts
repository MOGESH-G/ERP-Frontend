import axios from "axios";
import axiosInstance from "../config/axiosConfig";
import type { User } from "../types/user";

export interface LoginResponse {
  user: User;
  token: string;
}

export const login = async (phone: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post("v1/auth/login", {
      phone,
      password,
    });

    return {
      user: response.data.data,
      token: response.data.token,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Login failed. Please try again.";

      throw new Error(message);
    }

    throw new Error("Unexpected error occurred");
  }
};

export const logout = async (): Promise<void> => {
  try {
    await axiosInstance.post("v1/auth/logout");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Logout failed";

      throw new Error(message);
    }

    throw new Error("Unexpected error occurred");
  }
};

export const verifyUser = async (): Promise<User> => {
  try {
    const response = await axiosInstance.get("v1/auth/verify-user");
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Verify failed";
      throw new Error(message);
    }
    throw new Error("Unexpected error occurred");
  }
};
