export interface CustomerType {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  creditLimit?: number;
  creditDays?: number;
  walletBalance?: number;
  loyaltyPoints?: number;
  customerGroupId?: string | null;
  isActive: boolean;
  createdAt: Date;
  createdBy?: string;
  updatedAt: Date;
  updatedBy?: string;
}
