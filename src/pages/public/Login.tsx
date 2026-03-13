import { useState } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "motion/react";
import GridBackground from "../../components/GridBackground";
import { useLogin } from "../../hooks/auth";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import { useNavigate } from "react-router-dom";
import { message } from "../../lib/message";
import { validateEmail, validatePassword } from "../../utils/validation";
import { FiEye, FiEyeOff } from "react-icons/fi";

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

export default function LoginPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { mutate: login, isPending, error } = useLogin();

  const handleLogin = () => {
    const validEmail = validateEmail(email);
    if (validEmail !== "") {
      message.error(validEmail);
      return;
    }
    const validPassword = validatePassword(password);
    if (validPassword !== "") {
      message.error(validPassword);
      return;
    }

    login(
      {
        email: email,
        password: password,
      },
      {
        onSuccess: () => {
          message.success("Login successful");
          navigate("/app/dashboard");
        },
        onError: () => {
          console.error("Login error:", error);
          message.error(error?.message || "Login failed. Please try again.");
        },
      },
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        bgcolor: "background.default",
      }}
    >
      {/* LEFT PANEL */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          px: 8,
          borderRight: `1px solid ${theme.palette.custom.borderDefault}`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <GridBackground />

        {/* vignette overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 30% 40%, rgba(217,155,50,0.06), transparent 60%)",
          }}
        />

        {/* content */}
        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{ position: "relative", zIndex: 1 }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "primary.main",
              letterSpacing: "0.2em",
              mb: 2,
            }}
          >
            Enterprise Resource Planning
          </Typography>

          <Typography variant="h1" sx={{ color: "text.primary" }}>
            Every rupee.
            <br />
            <Box component="span" sx={{ fontStyle: "italic", color: "primary.main" }}>
              Accounted for.
            </Box>
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mt: 3,
              maxWidth: 420,
              color: "text.secondary",
            }}
          >
            Unified POS, inventory, GST compliance and accounting built specifically for Indian
            retail businesses.
          </Typography>
        </MotionBox>
      </Box>

      {/* RIGHT PANEL */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 3,
        }}
      >
        <MotionPaper
          elevation={4}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          sx={{
            width: "100%",
            maxWidth: 420,
            p: 4,
            bgcolor: "background.paper",
            border: `1px solid ${theme.palette.custom.borderSubtle}`,
          }}
        >
          <Stack
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            spacing={3}
          >
            <Box>
              <Typography variant="h3">Sign In</Typography>

              <Typography variant="body2" sx={{ mt: 1 }}>
                Enter your credentials to continue
              </Typography>
            </Box>

            <CustomInput
              label="Email Address"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <CustomInput
              label="Password"
              type={passwordVisible ? "text" : "password"}
              fullWidth
              value={password}
              endIcon={
                passwordVisible ? (
                  <FiEye onClick={() => setPasswordVisible(false)} />
                ) : (
                  <FiEyeOff onClick={() => setPasswordVisible(true)} />
                )
              }
              onChange={(e) => setPassword(e.target.value)}
            />

            <CustomButton
              // variant="contained"
              // size="large"
              // sx={{
              //   py: 1.5,
              // }}
              sx={{
                py: 1.5,
              }}
              type="submit"
              loading={isPending}
              // loading={isPending}
            >
              {isPending ? "Signing in..." : "Sign In"}
            </CustomButton>
            <Typography
              variant="caption"
              sx={{
                textAlign: "center",
                color: "text.disabled",
              }}
            >
              RetailOS ERP · © 2026
            </Typography>
          </Stack>
        </MotionPaper>
      </Box>
    </Box>
  );
}
