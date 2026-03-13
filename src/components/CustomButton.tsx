import type { ReactNode, MouseEventHandler } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import type { ButtonProps } from "@mui/material/Button";
import clsx from "clsx";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "success";

export type ButtonSize = "sm" | "md" | "lg";

export interface CustomButtonProps extends Omit<ButtonProps, "variant" | "size" | "color"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  hasPermission?: boolean;
  className?: string;
  children: ReactNode;
}

const sizeMap = {
  sm: "small",
  md: "medium",
  lg: "large",
} as const;

const variantMap = {
  primary: { variant: "contained", color: "primary" },
  secondary: { variant: "contained", color: "secondary" },
  outline: { variant: "outlined", color: "primary" },
  ghost: { variant: "text", color: "inherit" },
  danger: { variant: "contained", color: "error" },
  success: { variant: "contained", color: "success" },
} as const;

export default function CustomButton({
  variant = "primary",
  size = "md",
  startIcon,
  endIcon,
  loading = false,
  disabled = false,
  fullWidth = false,
  type = "button",
  hasPermission = true,
  className,
  children,
  ...props
}: CustomButtonProps) {
  if (!hasPermission) return <></>;

  const config = variantMap[variant];

  return (
    <Button
      type={type}
      variant={config.variant as ButtonProps["variant"]}
      color={config.color as ButtonProps["color"]}
      size={sizeMap[size]}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      startIcon={!loading ? startIcon : undefined}
      endIcon={!loading ? endIcon : undefined}
      className={clsx(className)}
      {...props}
    >
      {loading && <CircularProgress size={16} color="inherit" sx={{ mr: 1 }} />}

      {children}
    </Button>
  );
}
