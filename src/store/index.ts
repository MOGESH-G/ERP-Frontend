import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import themeSlice from "../slices/themeSlice";
import sidebarSlice from "../slices/sidebarSlice";
import { authApi } from "../api/auth";
import { shopsApi } from "../api/shops";

const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice,
    sidebar: sidebarSlice,
    [authApi.reducerPath]: authApi.reducer,
    [shopsApi.reducerPath]: shopsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, shopsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
