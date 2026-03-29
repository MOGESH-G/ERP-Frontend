import { Drawer, Toolbar, List, ListItemButton, ListItemText, ListItemIcon } from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";
import { usePermission } from "../../hooks/usePermisson";
import { APP_ROUTES } from "../../routes/appRoutes";

interface SidebarProps {
  drawerWidth: number;
}

export default function Sidebar({ drawerWidth }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { can } = usePermission();

  const menuRoutes = APP_ROUTES.filter(
    (route) => route.showInMenu && can(route.resource, route.action),
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": { width: drawerWidth },
      }}
    >
      <Toolbar />

      <List>
        {menuRoutes.map((route) => (
          <ListItemButton
            key={route.path}
            selected={location.pathname.includes(route.path)}
            onClick={() => navigate(`/${route.path}`)}
          >
            {route.icon && <ListItemIcon>{route.icon}</ListItemIcon>}
            <ListItemText primary={route.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
