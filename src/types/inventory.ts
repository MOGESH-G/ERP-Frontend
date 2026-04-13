import type { CreatedInfoType, UpdatedInfoType } from "./common";

export enum DiscountType {
  Percent = "%",
  Amount = "Rs",
}

export enum UnitType {
  PCS = "pcs",
  KG = "kg",
  Lt = "lt",
  NOS = "nos",
}

export type TaxType = "GST" | "IGST" | "NONE";

export interface Product {
  id: string;
  name: string;
  code: string;
  sku: string;
  barcode: string;
  categoryId: string;
  type: "GOODS" | "SERVICE";
  unit: UnitType;
  mrp: number;
  sellingPrice: number;
  taxType: TaxType;
  taxRate: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BatchType {
  id: string;
  productId: string;
  batchNumber: string;
  brandName: string;
  barcode: string;
  storId: string;

  packedDate?: Date;
  expiryDate?: Date;

  taxRate?: number; // 5, 12, 18
  taxInclusive?: boolean;

  purchasePrice: number;
  mrp: number;
  sellingPrice: number;

  quantity: number;
  reservedQuantity?: number; // blocked for orders
  damagedQuantity?: number;
  returnedQuantity?: number;

  discountType?: DiscountType;
  discountValue?: number;
  supplierId?: string;

  isActive: boolean;
  createdInfo: CreatedInfoType;
  updatedInfo: UpdatedInfoType;
}
