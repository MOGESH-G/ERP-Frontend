import { Navigate, Route, Routes } from "react-router-dom";
import PublicRoutes from "./routes/publicRoutes";
import PrivateRoutes from "./routes/privateRoutes";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material";
import {createAppTheme} from "./theme"
import type { RootState } from "./store";

const App = () => {
  const mode = useSelector((state: RootState) => state.theme.mode);

  const theme = useMemo(() => createAppTheme(mode), [mode]);

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
