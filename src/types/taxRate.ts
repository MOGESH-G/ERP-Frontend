import type { TaxType } from "./enums";

export interface TaxRate {
  id: string;
  name: string;
  rate: number;
  taxType: TaxType;
  cgstRate: number;
  sgstRate: number;
  igstRate: number;
  isInclusive: boolean;
  isActive: boolean;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}
