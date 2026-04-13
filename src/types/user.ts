import type { CreatedInfoType, UpdatedInfoType } from "./common";

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  roles: string[];
  permissions: Record<string, Record<string, boolean>>;
  shopIds: string[];
  aadharNumber: string;
  address: string;
  createdAt: CreatedInfoType;
  updatedAt: UpdatedInfoType;
}
