export interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
  permissions: Record<string, Record<string, boolean>>;
  shop_ids: string[];
}
