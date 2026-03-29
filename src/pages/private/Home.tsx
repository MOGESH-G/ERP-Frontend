import { Box, Button, Typography, List, ListItemButton, ListItemText } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutSuccess } from "../../slices/authSlice";
import CustomAccordion from "../../components/CustomAccordion";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutSuccess());
    navigate("/auth/login", { replace: true });
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 2,
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="h5" component="h1" fontWeight={700}>
          {`Welcome to the Dashboard!`}
        </Typography>

        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <Box component="section" sx={{ p: 2, flex: 1, overflowY: "auto" }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Quick Actions
        </Typography>

        <CustomAccordion title="Shops" defaultExpanded>
          <List disablePadding>
            <ListItemButton onClick={() => handleNavigate("/app/shops")}>
              <ListItemText primary="Go to Shops" />
            </ListItemButton>
            <ListItemButton onClick={() => handleNavigate("/app/shops/create")}>
              <ListItemText primary="Create New Shop" />
            </ListItemButton>
          </List>
        </CustomAccordion>

        <CustomAccordion title="Profile">
          <List disablePadding>
            <ListItemButton onClick={() => handleNavigate("/app/profile")}>
              <ListItemText primary="Update Your Details" />
            </ListItemButton>
            <ListItemButton onClick={() => handleNavigate("/app/change-password")}>
              <ListItemText primary="Change Password" />
            </ListItemButton>
          </List>
        </CustomAccordion>

        <CustomAccordion title="Other">
          <List disablePadding>
            <ListItemButton onClick={() => handleNavigate("/app/dashboard")}>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton onClick={() => handleNavigate("/app/forbidden")}>
              <ListItemText primary="Permission Test (Forbidden)" />
            </ListItemButton>
          </List>
        </CustomAccordion>
      </Box>
    </Box>
  );
};

export default Home;
