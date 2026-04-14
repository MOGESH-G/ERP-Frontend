import { useDispatch } from "react-redux";
import { useLoginMutation, useLogoutMutation } from "../api/auth";
import { loginSuccess, logoutSuccess } from "../slices/authSlice";

export const useLogin = () => {
  const [loginApi] = useLoginMutation();
  const dispatch = useDispatch();

  return {
    mutateAsync: async (phone: string, password: string) => {
      const data = await loginApi({ phone, password }).unwrap();
      localStorage.setItem("token", data.token);
      dispatch(loginSuccess({ user: data.user, token: data.token }));
      return data;
    },
    isLoading: loginApi.isLoading,
  };
};

export const useLogout = () => {
  const [logoutApi] = useLogoutMutation();
  const dispatch = useDispatch();

  const cleanup = () => {
    localStorage.removeItem("token");
    dispatch(logoutSuccess());
  };

  return {
    mutateAsync: async () => {
      await logoutApi().unwrap();
      cleanup();
    },
    mutate: () => {
      logoutApi();
      cleanup();
    },
    isLoading: logoutApi.isLoading,
  };
};
