import { TextField, InputAdornment, type TextFieldProps } from "@mui/material";
import { type ReactNode } from "react";

export type InputSize = "small" | "medium";

export type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "search"
  | "tel"
  | "url"
  | "date"
  | "time"
  | "datetime-local";

export interface CustomInputProps extends Omit<TextFieldProps, "size" | "type"> {
  label?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: InputType;
  placeholder?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  helperText?: string;
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  size?: InputSize;
}

export default function CustomInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  startIcon,
  endIcon,
  helperText,
  error = false,
  success = false,
  disabled = false,
  required = false,
  fullWidth = true,
  size = "medium",
  ...rest
}: CustomInputProps) {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      error={error}
      disabled={disabled}
      required={required}
      helperText={helperText}
      fullWidth={fullWidth}
      size={size}
      variant="outlined"
      color={success ? "success" : error ? "error" : "primary"}
      InputProps={{
        startAdornment: startIcon ? (
          <InputAdornment position="start">{startIcon}</InputAdornment>
        ) : undefined,

        endAdornment: endIcon ? (
          <InputAdornment position="end">{endIcon}</InputAdornment>
        ) : undefined,
      }}
      {...rest}
    />
  );
}
