import React from "react";
import clsx from "clsx";

type BadgeProps = {
  content: string | number;
  color?: string; // Custom color (overrides variant)
  size?: "sm" | "md" | "lg"; // optional
  className?: string; // optional extra classes
  variant?: "primary" | "warning" | "danger" | "secondary"; // default: primary
};

const Badge: React.FC<BadgeProps> = ({
  content,
  color,
  size = "md",
  className,
  variant = "primary",
}) => {
  // Define base colors for variants
  const variantColors: Record<string, string> = {
    primary: "bg-primary-500 text-white",
    warning: "bg-yellow-400 text-black",
    danger: "bg-red-500 text-white",
    secondary: "bg-secondary-300 text-black",
  };

  // Size classes
  const sizeClasses: Record<string, string> = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  return (
    <span
      className={clsx(
        "inline-block rounded-full font-semibold",
        sizeClasses[size],
        color ? `bg-[${color}] text-white` : variantColors[variant],
        className,
      )}
    >
      {content}
    </span>
  );
};

export default Badge;
