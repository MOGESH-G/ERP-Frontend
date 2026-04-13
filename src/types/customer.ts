import type { CreatedInfoType, UpdatedInfoType } from "./common";

export type Gender = "male" | "female" | "other";

export type CustomerType = {
  id: string; // Unique customer ID (UUID or string)
  name: string; // Full name of the customer
  phone: string; // Phone number (primary contact)
  email?: string; // Optional email
  gender?: Gender;
  dateOfBirth?: string; // Optional, format YYYY-MM-DD

  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;

  // Billing / business info
  preferredPaymentMethod?: "cash" | "card" | "upi" | "bank"; // Optional
  creditLimit?: number; // Optional, if credit is allowed
  currentBalance?: number; // Optional, current outstanding balance
  loyaltyPoints: number;
  tags?: string[]; // e.g., ["VIP", "Frequent Buyer"]
  notes?: string; // Internal notes

  // Metadata
  createdAt: CreatedInfoType; // ISO timestamp
  updatedAt: UpdatedInfoType; // ISO timestamp
  isBlocked?: boolean;
};
