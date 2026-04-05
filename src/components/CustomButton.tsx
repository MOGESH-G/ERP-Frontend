import type { ReactNode, MouseEventHandler } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material";
import type { ButtonProps } from "@mui/material/Button";
import clsx from "clsx";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "success";

export type ButtonSize = "sm" | "md" | "lg";

export interface CustomButtonProps extends Omit<
  ButtonProps,
  "variant" | "size" | "color"
> {
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

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
};

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
  const theme = useTheme();

  if (!hasPermission) return null;

  // 🎨 Semantic colors (similar to CustomInput)
  const styles = {
    primary: {
      bg: theme.palette.primary.main,
      text: "#fff",
      border: "transparent",
    },
    secondary: {
      bg: theme.palette.secondary.main,
      text: "#fff",
      border: "transparent",
    },
    outline: {
      bg: "transparent",
      text: theme.palette.primary.main,
      border: theme.palette.primary.main,
    },
    ghost: {
      bg: "transparent",
      text: theme.palette.text.primary,
      border: "transparent",
    },
    danger: {
      bg: theme.palette.error.main,
      text: "#fff",
      border: "transparent",
    },
    success: {
      bg: theme.palette.success.main,
      text: "#fff",
      border: "transparent",
    },
  };

  const current = styles[variant];

  return (
    <Button
      type={type}
      variant="contained" // keep consistent, override via styles
      disableElevation
      fullWidth={fullWidth}
      disabled={disabled || loading}
      className={clsx(
        "rounded-lg normal-case font-medium transition-all flex items-center justify-center gap-2",
        sizeClasses[size],
        fullWidth && "w-full",
        className,
      )}
      style={{
        backgroundColor: current.bg,
        color: current.text,
        border: `1px solid ${current.border}`,
      }}
      {...props}
    >
      {loading && (
        <CircularProgress size={16} color="inherit" className="mr-1" />
      )}

      {!loading && startIcon && (
        <span className="flex items-center">{startIcon}</span>
      )}

      {children}

      {!loading && endIcon && (
        <span className="flex items-center">{endIcon}</span>
      )}
    </Button>
  );
}
