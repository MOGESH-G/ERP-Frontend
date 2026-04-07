import { Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme as useCustomTheme } from "../../hooks/useTheme";
import CustomButton from "../CustomButton";

interface HeaderProps {
  onDrawerToggle?: () => void;
  onLogout?: () => void;
}

export default function Header({ onDrawerToggle, onLogout }: HeaderProps) {
  const { mode, toggle } = useCustomTheme();

  return (
    <div className="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2 }}
          onClick={onDrawerToggle}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          ERP Dashboard
        </Typography>

        <CustomButton onClick={toggle} variant="outline" size="sm">
          {mode === "dark" ? "Light" : "Dark"}
        </CustomButton>

        <CustomButton
          onClick={onLogout}
          variant="outline"
          color="red"
          size="sm"
        >
          Logout
        </CustomButton>
      </Toolbar>
    </div>
  );
}
