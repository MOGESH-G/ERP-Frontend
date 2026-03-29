// hooks/useAuth.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { login, logout, type LoginResponse } from "../api/auth";
import { loginSuccess, logoutSuccess } from "../slices/authSlice";

const authKeys = {
  user: () => ["auth", "user"] as const,
  session: () => ["auth", "session"] as const,
};

interface LoginVariables {
  phone: string;
  password: string;
}

export const useLogin = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation<LoginResponse, Error, LoginVariables>({
    mutationKey: authKeys.user(),
    mutationFn: ({ phone, password }) => login(phone, password),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      dispatch(loginSuccess({ user: data.user, token: data.token }));
      queryClient.setQueryData(authKeys.user(), data.user);
    },
    onError: () => {
      localStorage.removeItem("token");
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const cleanup = () => {
    localStorage.removeItem("token");
    dispatch(logoutSuccess());
    queryClient.removeQueries();
  };

  return useMutation<void, Error>({
    mutationKey: authKeys.session(),
    mutationFn: logout,
    onSuccess: cleanup,
    onError: cleanup,
  });
};
