import type { ReactNode, MouseEventHandler } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import clsx from "clsx";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "success";

export type ButtonSize = "sm" | "md" | "lg";

export interface CustomButtonProps {
  variant?: ButtonVariant;
  color?: string; // optional custom color
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

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm h-8",
  md: "px-4 py-2 text-sm h-10",
  lg: "px-5 py-2.5 text-base h-12",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--primary-500)] text-[var(--primary-contrast)] hover:bg-[var(--primary-600)] active:bg-[var(--primary-700)]",
  secondary:
    "bg-[var(--secondary-500)] text-[var(--secondary-contrast, var(--text-inverse))] hover:bg-[var(--secondary-700)]",
  outline:
    "border border-[var(--border-default)] text-[var(--text-body)] hover:bg-[var(--bg-subtle)]",
  ghost: "text-[var(--text-body)] hover:bg-[var(--bg-subtle)]",
  danger:
    "bg-[var(--text-error)] text-white hover:bg-red-700 active:bg-red-800",
  success:
    "bg-[var(--text-success)] text-white hover:bg-green-700 active:bg-green-800",
};

export type ContentAlign = "start" | "center" | "end";

export interface CustomButtonProps {
  variant?: ButtonVariant;
  color?: string;
  size?: ButtonSize;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  contentAlign?: ContentAlign; // new prop
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  hasPermission?: boolean;
  className?: string;
  children: ReactNode;
}

export default function CustomButton({
  variant = "primary",
  color,
  size = "md",
  startIcon,
  endIcon,
  contentAlign = "center",
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

  // Custom color style
  const style: React.CSSProperties = {};
  if (color) {
    if (variant === "outline") {
      style.border = `1px solid ${color}`;
      style.color = color;
      style.backgroundColor = "transparent";
    } else if (variant === "ghost") {
      style.color = color;
      style.backgroundColor = "transparent";
    } else {
      style.backgroundColor = color;
      style.color = "#fff";
    }
  }

  // flex alignment mapping
  const alignClasses = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
  }[contentAlign];

  return (
    <button
      type={type}
      disabled={disabled || loading}
      style={style}
      className={clsx(
        "rounded-lg font-medium flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none cursor-pointer",
        alignClasses,
        sizeClasses[size],
        !color && variantClasses[variant],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {/* left icon */}
      {startIcon && !loading && (
        <span className="flex items-center">{startIcon}</span>
      )}

      {/* loader or content */}
      <span className="flex items-center">
        {loading ? <CircularProgress size={16} color="inherit" /> : children}
      </span>

      {/* right icon */}
      {endIcon && !loading && (
        <span className="flex items-center">{endIcon}</span>
      )}
    </button>
  );
}
