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
