import type { VendorType } from "./enums";

export interface Vendor {
  id: string;
  name: string;
  gstNumber?: string | null;
  panNumber?: string;
  isGstRegistered: boolean;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country: string;
  creditLimit: number;
  creditDays: number;
  bankName?: string;
  accountNumber?: string;
  ifscCode?: string;
  upiId?: string;
  vendorType: VendorType;
  isActive: boolean;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}
