import type { PurchaseStatus, ReturnStatus } from "./enums";

export interface Purchase {
  id: string;
  shopId: string;
  vendorId?: string | null;
  purchaseNumber: string;
  status: PurchaseStatus;
  purchaseDate: string;
  vendorInvoiceNo?: string;
  vendorInvoiceDate?: string;
  subtotal: number;
  taxAmount: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  freight: number;
  additionalCharges: number;
  otherCosts: number;
  totalLandedCost: number;
  totalAmount: number;
  paidAmount: number;
  currency: string;
  notes?: string;
  isActive: boolean;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}

export interface PurchaseLine {
  id: string;
  purchaseId: string;
  productId: string;
  batchId?: string | null;
  quantity: number;
  unitCost: number;
  taxRateId?: string | null;
  taxRate: number;
  taxAmount: number;
  discount: number;
  lineTotal: number;
  landedCostPerUnit: number;
  batchNumber?: string;
  expiryDate?: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}

export interface PurchaseReturn {
  id: string;
  shopId: string;
  purchaseId: string;
  vendorId?: string | null;
  returnNumber: string;
  status: ReturnStatus;
  returnDate: string;
  totalAmount: number;
  reason?: string;
  reasonCode?: string;
  createdAt: Date;
  createdBy: string;
}
