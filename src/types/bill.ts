import type { CreatedInfoType, UpdatedInfoType } from "./common";
import type { DiscountType, TaxType, UnitType } from "./inventory";

export type PaymentMethod = "CASH" | "CARD" | "UPI" | "BANK" | "MIXED";

export interface PaymentInfo {
  method: PaymentMethod;

  paidAmount: number;
  pendingAmount: number;

  referenceId?: string;
}

export type BillStatus = "DRAFT" | "COMPLETED" | "CANCELLED" | "REFUNDED";

export interface BillProduct {
  productId: string;
  batchId?: string;

  name: string;
  sku?: string;

  quantity: number;
  unit: UnitType;

  mrp: number;
  sellingPrice: number;

  discountType?: DiscountType;
  discountValue?: number;
  discountAmount?: number;

  taxType: TaxType;
  taxRate: number;
  taxAmount: number;

  total: number;
}

export interface BillType {
  id: string;
  shopId: string;

  billNumber: string;

  customerId?: string;
  customerName?: string;
  customerPhone?: string;

  billProducts: BillProduct[];
  totalQuantity: number;
  subTotal: number;
  discountAmount: number;
  taxAmount: number;
  grandTotal: number;
  roundOff?: number;
  payment: PaymentInfo;
  status: BillStatus;
  notes?: string;
  returnedAmount?: number;

  createInfo: CreatedInfoType;
  updateInfo: UpdatedInfoType;
}
