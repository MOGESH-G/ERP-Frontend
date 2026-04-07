import { Navigate, Route, Routes } from "react-router-dom";
import PublicRoutes from "./routes/publicRoutes";
import PrivateRoutes from "./routes/privateRoutes";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material";
import { getMuiTheme } from "./theme/getMuiTheme";
import type { RootState } from "./store";
import { applyThemeVariables } from "./theme/applyThemeVariables";

const App = () => {
  const mode = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    applyThemeVariables(mode);
  }, [mode]);

  const theme = useMemo(() => getMuiTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/auth/*" element={<PublicRoutes />} />
        <Route path="/app/*" element={<PrivateRoutes />} />
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
