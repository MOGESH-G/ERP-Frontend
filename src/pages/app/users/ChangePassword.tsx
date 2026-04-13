import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../config/axiosConfig";
import CustomButton from "../../../components/custom/CustomButton";
import CustomInput from "../../../components/custom/CustomInput";
import Loader from "../../../components/Loader";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ChangePasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({
    current: false,
    new: false,
    confirm: false,
  });

  const changePasswordMutation = useMutation({
    mutationFn: async (data: ChangePasswordForm) => {
      const response = await axiosInstance.post(
        "/v1/auth/change-password",
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      alert("Password changed successfully! Please log in again.");
      window.location.href = "/login";
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      alert(err.response?.data?.message || "Failed to change password");
    },
  });

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required";
    }

    if (formData.newPassword.length < 8) {
      newErrors.newPassword = "New password must be at least 8 characters";
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      changePasswordMutation.mutate(formData);
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const hasError = (field: string) => !!errors[field];

  const getErrorText = (field: string) => errors[field] || "";

  if (changePasswordMutation.isPending) {
    return (
      <Box className="flex items-center justify-center min-h-100">
        <Loader />
      </Box>
    );
  }

  return (
    <Box className="w-full mx-auto md:py-2 space-y-8">
      {/* Form Card */}
      <Box className="rounded-md bg-bg-paper p-4 shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Box className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Box>
              <Typography
                variant="h2"
                className="font-semibold text-text-header"
              >
                Change Password
              </Typography>
            </Box>
          </Box>

          <Box>
            <CustomInput
              label="Current Password"
              type={showPassword.current ? "text" : "password"}
              value={formData.currentPassword}
              onChange={(e) =>
                setFormData({ ...formData, currentPassword: e.target.value })
              }
              className="w-1/2!"
              placeholder="Enter your current password"
              startIcon={<FiLock className="w-5 h-5 opacity-75" />}
              endIcon={
                <button
                  type="button"
                  className="p-1 hover:bg-bg-subtle rounded-full transition-colors"
                  onClick={() => togglePasswordVisibility("current")}
                >
                  {showPassword.current ? (
                    <FiEyeOff className="w-5 h-5" />
                  ) : (
                    <FiEye className="w-5 h-5" />
                  )}
                </button>
              }
              hasError={hasError("currentPassword")}
              errorText={getErrorText("currentPassword")}
              required
            />
          </Box>

          {/* New Password */}
          <Box>
            <CustomInput
              label="New Password"
              type={showPassword.new ? "text" : "password"}
              value={formData.newPassword}
              className="w-1/2!"
              onChange={(e) =>
                setFormData({ ...formData, newPassword: e.target.value })
              }
              placeholder="Enter new password (min 8 chars)"
              startIcon={<FiLock className="w-5 h-5 opacity-75" />}
              endIcon={
                <button
                  type="button"
                  className="p-1 hover:bg-bg-subtle rounded-full transition-colors"
                  onClick={() => togglePasswordVisibility("new")}
                >
                  {showPassword.new ? (
                    <FiEyeOff className="w-5 h-5" />
                  ) : (
                    <FiEye className="w-5 h-5" />
                  )}
                </button>
              }
              hasError={hasError("newPassword")}
              errorText={getErrorText("newPassword")}
              required
            />
          </Box>

          {/* Confirm Password */}
          <Box>
            <CustomInput
              label="Confirm New Password"
              type={showPassword.confirm ? "text" : "password"}
              value={formData.confirmPassword}
              className="w-1/2!"
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              placeholder="Confirm your new password"
              startIcon={<FiLock className="w-5 h-5 opacity-75" />}
              endIcon={
                <button
                  type="button"
                  className="p-1 hover:bg-bg-subtle rounded-full transition-colors"
                  onClick={() => togglePasswordVisibility("confirm")}
                >
                  {showPassword.confirm ? (
                    <FiEyeOff className="w-5 h-5" />
                  ) : (
                    <FiEye className="w-5 h-5" />
                  )}
                </button>
              }
              hasError={hasError("confirmPassword")}
              errorText={getErrorText("confirmPassword")}
              required
            />
          </Box>

          {/* Actions */}
          <Box className="flex flex-col sm:flex-row sm:justify-end gap-4 pt-4">
            <CustomButton
              type="button"
              variant="outline"
              className="flex-1 sm:flex-none"
              onClick={() => navigate("/app/profile")}
            >
              Go Back
            </CustomButton>
            <CustomButton
              type="submit"
              variant="primary"
              loading={changePasswordMutation.isPending}
              className="flex-1 sm:flex-none"
            >
              Update Password
            </CustomButton>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default ChangePassword;
