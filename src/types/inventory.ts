export interface Product {
  id: string;
  sku: string;
  name: string;
  description?: string;
  categoryId?: string | null;
  taxRateId?: string | null;
  taxInclusive: boolean;
  unitId: string;
  barcode?: string | null;
  hsnCode?: string;
  costPrice: number;
  baseSellingPrice: number;
  mrp: number;
  trackInventory: boolean;
  isActive: boolean;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}

export interface Batch {
  id: string;
  shopId: string;
  productId: string;
  batchNumber: string;
  brandName?: string;
  barcode?: string;
  packedDate?: string;
  expiryDate?: string;
  purchasePrice: number;
  mrp: number;
  sellingPrice: number;
  taxRateId?: string | null;
  taxInclusive: boolean;
  quantity: number;
  reservedQuantity: number;
  damagedQuantity: number;
  returnedQuantity: number;
  vendorId?: string | null;
  isActive: boolean;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}
