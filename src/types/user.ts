export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  roles: string[];
  permissions: Record<string, Record<string, boolean>>;
  shop_ids: string[];
  aadhar_number: string;
  address: string;
}
