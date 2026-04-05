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
  if (!hasPermission) return null;

  const variantClasses: Record<ButtonVariant, string> = {
    primary: "bg-[var(--color-primary-500)]! text-white hover:bg-[var(--color-primary-400)]!",

    secondary:
      "bg-[var(--color-bg-elevated)]! text-[var(--color-text-body)]!  hover:bg-[var(--color-bg-subtle)]!",

    outline:
      "border! border-[var(--color-border-default)]! text-[var(--color-text-body)]! hover:bg-[var(--color-bg-subtle)]!",

    ghost: "text-[var(--color-text-body)]! hover:bg-[var(--color-bg-subtle)]!",

    danger: "bg-[var(--color-danger-500)]! text-white hover:bg-[var(--color-danger-600)]!",

    success: " bg-[var(--color-success-500)]! text-white hover:bg-[var(--color-success-600)]!",
  };

  return (
    <Button
      type={type}
      variant="contained"
      disableElevation
      fullWidth={fullWidth}
      disabled={disabled || loading}
      className={clsx(
        "rounded-lg normal-case font-medium transition-all flex items-center justify-center gap-2 disabled:bg-bg-subtle disabled:text-text-sub",
        sizeClasses[size],
        variantClasses[variant],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {loading && <CircularProgress size={16} color="inherit" className="mr-1" />}

      {!loading && startIcon && <span className="flex items-center">{startIcon}</span>}

      {children}

      {!loading && endIcon && <span className="flex items-center">{endIcon}</span>}
    </Button>
  );
}
