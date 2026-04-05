import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { toggleTheme, setTheme, type ThemeMode } from "../slices/themeSlice";

export const useTheme = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);

  const toggle = () => dispatch(toggleTheme());
  const setMode = (newMode: ThemeMode) => dispatch(setTheme(newMode));

  return {
    mode,
    toggle,
    setMode,
    isDark: mode === "dark",
    isLight: mode === "light",
  };
};