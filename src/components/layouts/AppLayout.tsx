import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";

const drawerWidth = 240;

export default function AppLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      <Header drawerWidth={drawerWidth} />

      <Sidebar drawerWidth={drawerWidth} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        {/* pushes content below appbar */}
        <Toolbar />

        <Outlet />
      </Box>
    </Box>
  );
}
