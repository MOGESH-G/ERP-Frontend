import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface HeaderProps {
  drawerWidth: number;
}

export default function Header({ drawerWidth }: HeaderProps) {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
      }}
    >
      <Toolbar>
        <IconButton color="inherit" edge="start" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6">My App</Typography>
      </Toolbar>
    </AppBar>
  );
}
