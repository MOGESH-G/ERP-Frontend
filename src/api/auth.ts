import axios from "axios";
import axiosInstance from "../config/axiosConfig";

export interface User {
  id: string;
  name: string;
  email: string;
  roles: string;
  permissions: Record<string, Record<string, boolean>>;
  shop_id?: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post("v1/auth/login", {
      email,
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
