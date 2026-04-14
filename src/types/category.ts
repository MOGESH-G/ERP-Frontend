export interface Category {
  id: string;
  name: string;
  parentId?: string | null;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}
