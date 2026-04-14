export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: Record<string, Record<"view" | "create" | "update" | "delete", boolean>>;
  isSystem: boolean;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}
