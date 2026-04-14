import type { BillStatus, PaymentMethod, TaxType } from "./enums";
export interface PaymentInfo {
  method: PaymentMethod;
  paidAmount: number;
  pendingAmount: number;
  referenceId?: string;
}

export interface BillProduct {
  productId: string;
  batchId: string;
  name: string;
  sku: string;
  quantity: number;
  unit: {
    id: string;
    name: string;
    code: string;
  };
  mrp: number;
  sellingPrice: number;
  discountPercent?: number;
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
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}
