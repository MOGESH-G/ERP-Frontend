export const validatePhone = (phone: string): string => {
  if (!phone.trim()) return "Phone number is required";
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  if (!phoneRegex.test(phone)) return "Invalid phone number";
  return "";
};

export const validateEmail = (email: string): string => {
  if (!email.trim()) return "Email is required";

  const emailRegex = /\S+@\S+\.\S+/;

  if (!emailRegex.test(email)) return "Invalid email address";

  return "";
};

export const validatePassword = (password: string): string => {
  if (!password.trim()) return "Password is required";

  if (password.length < 6) return "Password must be at least 6 characters";

  return "";
};

// Validate full name (letters, spaces, minimum 2 characters)
export function validateName(name: string): boolean {
  const regex = /^[a-zA-Z\s]{2,}$/;
  return regex.test(name.trim());
}

// Validate PAN (Indian Permanent Account Number)
export function validatePAN(pan: string): boolean {
  const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return regex.test(pan.trim().toUpperCase());
}

// Validate GSTIN (India)
export function validateGST(gst: string): boolean {
  const regex = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return regex.test(gst.trim().toUpperCase());
}

// Validate Pincode (Indian)
export function validatePincode(pin: string): boolean {
  const regex = /^[1-9][0-9]{5}$/;
  return regex.test(pin.trim());
}

// Validate optional numeric fields (like credit limit, balance)
export function validatePositiveNumber(value: number): boolean {
  return typeof value === "number" && value >= 0;
}
