import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type User } from "../api/auth";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

const savedUser = localStorage.getItem("user");

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem("token"),
  user: savedUser ? (JSON.parse(savedUser) as User) : null,
  token: localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },

    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
