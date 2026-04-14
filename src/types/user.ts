export interface User {
  id: string;
  shopIds: string[];
  name: string;
  phone: string;
  email?: string | null;
  password: string;
  isActive: boolean;
  lastLoginAt?: Date | null;
  roles?: string[];
  permissions?: Record<string, Record<string, boolean>>;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}
