export type AccountType = "asset" | "liability" | "equity" | "revenue" | "expense";
export const AccountTypeMap: Record<AccountType, string> = {
  asset: "Asset",
  liability: "Liability",
  equity: "Equity",
  revenue: "Revenue",
  expense: "Expense",
};

export type VendorType = "supplier" | "service" | "both";
export const VendorTypeMap: Record<VendorType, string> = {
  supplier: "Supplier",
  service: "Service",
  both: "Both",
};

export type JournalStatus = "draft" | "posted" | "reversed";
export const JournalStatusMap: Record<JournalStatus, string> = {
  draft: "Draft",
  posted: "Posted",
  reversed: "Reversed",
};

export type InvoiceStatus = "draft" | "confirmed" | "paid" | "cancelled";
export const InvoiceStatusMap: Record<InvoiceStatus, string> = {
  draft: "Draft",
  confirmed: "Confirmed",
  paid: "Paid",
  cancelled: "Cancelled",
};

export type PaymentMode =
  | "cash"
  | "upi"
  | "card"
  | "cheque"
  | "neft"
  | "rtgs"
  | "credit_note"
  | "split";
export const PaymentModeMap: Record<PaymentMode, string> = {
  cash: "Cash",
  upi: "UPI",
  card: "Card",
  cheque: "Cheque",
  neft: "NEFT",
  rtgs: "RTGS",
  credit_note: "Credit Note",
  split: "Split",
};

export type ReturnStatus = "pending" | "approved" | "refunded";
export const ReturnStatusMap: Record<ReturnStatus, string> = {
  pending: "Pending",
  approved: "Approved",
  refunded: "Refunded",
};

export type PurchaseStatus = "draft" | "received" | "billed" | "partially_returned" | "returned";
export const PurchaseStatusMap: Record<PurchaseStatus, string> = {
  draft: "Draft",
  received: "Received",
  billed: "Billed",
  partially_returned: "Partially Returned",
  returned: "Returned",
};

export type StockMovement =
  | "purchase"
  | "sale"
  | "return_in"
  | "return_out"
  | "adjustment"
  | "transfer"
  | "opening";
export const StockMovementMap: Record<StockMovement, string> = {
  purchase: "Purchase",
  sale: "Sale",
  return_in: "Return In",
  return_out: "Return Out",
  adjustment: "Adjustment",
  transfer: "Transfer",
  opening: "Opening Balance",
};

export type PriceTier = "retail" | "wholesale" | "distributor" | "promotional";
export const PriceTierMap: Record<PriceTier, string> = {
  retail: "Retail",
  wholesale: "Wholesale",
  distributor: "Distributor",
  promotional: "Promotional",
};

export type LoyaltyTxType = "earn" | "redeem" | "expire" | "adjust";
export const LoyaltyTxTypeMap: Record<LoyaltyTxType, string> = {
  earn: "Earn",
  redeem: "Redeem",
  expire: "Expire",
  adjust: "Adjustment",
};

export type ReorderStatus = "suggested" | "approved" | "ordered" | "received" | "dismissed";
export const ReorderStatusMap: Record<ReorderStatus, string> = {
  suggested: "Suggested",
  approved: "Approved",
  ordered: "Ordered",
  received: "Received",
  dismissed: "Dismissed",
};

export type SyncStatus = "pending" | "synced" | "failed" | "conflict";
export const SyncStatusMap: Record<SyncStatus, string> = {
  pending: "Pending",
  synced: "Synced",
  failed: "Failed",
  conflict: "Conflict",
};

export type AuditAction = "insert" | "update" | "delete" | "post" | "reverse" | "lock";
export const AuditActionMap: Record<AuditAction, string> = {
  insert: "Insert",
  update: "Update",
  delete: "Delete",
  post: "Post",
  reverse: "Reverse",
  lock: "Lock",
};

export type BillStatus = "draft" | "confirmed" | "paid" | "cancelled";
export const BillStatusMap: Record<BillStatus, string> = {
  draft: "Draft",
  confirmed: "Confirmed",
  paid: "Paid",
  cancelled: "Cancelled",
};

export type PaymentMethod = "cash" | "upi" | "card";
export const PaymentMethodMap: Record<PaymentMethod, string> = {
  cash: "Cash",
  upi: "UPI",
  card: "Card",
};

export type TaxType = "GST" | "TCS" | "TDS";
export const TaxTypeMap: Record<TaxType, string> = {
  GST: "GST",
  TCS: "TCS",
  TDS: "TDS",
};
