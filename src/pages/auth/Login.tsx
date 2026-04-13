import { useState } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { motion } from "motion/react";
import GridBackground from "../../components/GridBackground";
import { useLogin } from "../../hooks/auth";
import CustomButton from "../../components/custom/CustomButton";
import CustomInput from "../../components/custom/CustomInput";
import { useNavigate } from "react-router-dom";
import { message } from "../../lib/message";
import { validatePhone, validatePassword } from "../../utils/validation";
import { FiEye, FiEyeOff } from "react-icons/fi";

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

export default function LoginPage() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { mutate: login, isPending, error } = useLogin();

  const handleLogin = () => {
    const validPhone = validatePhone(phone);
    if (validPhone !== "") {
      message.error(validPhone);
      return;
    }
    const validPassword = validatePassword(password);
    if (validPassword !== "") {
      message.error(validPassword);
      return;
    }

    login(
      {
        phone: phone,
        password: password,
      },
      {
        onSuccess: () => {
          message.success("Login successful");
          navigate("/app");
        },
        onError: () => {
          console.error("Login error:", error);
          message.error(error?.message || "Login failed. Please try again.");
        },
      },
    );
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // remove non-digits
    setPhone(value);
  };

  return (
    <Box className="min-h-screen flex bg-bg-subtle">
      {/* LEFT PANEL */}
      <Box className="flex-1 md:flex flex-col justify-center px-2 border-r border-r-border-elevated relative overflow-hidden">
        <GridBackground />

        {/* vignette overlay */}
        <Box
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 40%, rgba(217,155,50,0.06), transparent 60%)",
          }}
        />

        {/* content */}
        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <Typography
            variant="overline"
            className="text-primary-500 leading-1 mb-2"
          >
            Enterprise Resource Planning
          </Typography>

          <Typography variant="h2" className="text-bg-inverse">
            Every rupee.
            <br />
            <Box component="span" className="italic text-primary-500">
              Accounted for.
            </Box>
          </Typography>

          <Typography
            variant="body1"
            className="mt-0.5 max-w-105 text-secondary-500"
          >
            Unified POS, inventory, GST compliance and accounting built
            specifically for Indian retail businesses.
          </Typography>
        </MotionBox>
      </Box>

      {/* RIGHT PANEL */}
      <Box className="flex-1 flex items-center justify-center px-1">
        <MotionPaper
          elevation={4}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-105 p-8 rounded-lg! bg-bg-paper border border-bg-subtle"
        >
          <Stack
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              if (phone.length < 10) {
                message.error("Please enter valid phone number");
                return;
              }
              handleLogin();
            }}
            spacing={3}
          >
            <Box>
              <Typography variant="h4">Sign In</Typography>

              <Typography variant="body2" sx={{ mt: 1 }}>
                Enter your credentials to continue
              </Typography>
            </Box>

            <CustomInput
              label="Mobile Number"
              type="tel"
              fullWidth
              value={phone}
              onChange={handlePhoneChange}
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

            <CustomButton className="py-3!" type="submit" loading={isPending}>
              {isPending ? "Signing in..." : "Sign In"}
            </CustomButton>
            <Typography
              variant="caption"
              className="text-center text-secondary-500"
            >
              RetailOS ERP · © 2026
            </Typography>
          </Stack>
        </MotionPaper>
      </Box>
    </Box>
  );
}
