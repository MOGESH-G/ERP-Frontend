/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import {
  MdOutlineFullscreen,
  MdOutlineFullscreenExit,
  MdPrint,
  MdSave,
} from "react-icons/md";
import CustomButton from "../../../components/custom/CustomButton";
import CustomInput from "../../../components/custom/CustomInput";
import CustomSelect from "../../../components/custom/CustomSelect";
import { CustomSearch } from "../../../components/custom/CustomSearch";
import type { CustomerType } from "../../../types/customer";
import type { BillType, BillProduct, PaymentMethod } from "../../../types/bill";
import { formatAmount } from "../../../utils/formatAmount";
import { setSidebarCollapsed } from "../../../slices/sidebarSlice";
import { useDispatch } from "react-redux";
import BillingList from "./BillingList";
import { Box } from "@mui/material";
import ProductCard from "../../../components/ProductCard";

interface BillingState {
  billProducts: Array<Partial<BillProduct>>;
  selectedCustomer: Partial<CustomerType> | null;
  paymentInfo: {
    method: PaymentMethod;
    paidAmount: number;
    pendingAmount: number;
  };
  discountCode: string;
  roundOff: number;
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  grandTotal: number;
}

const initialState: BillingState = {
  billProducts: [],
  selectedCustomer: null,
  paymentInfo: { method: "CASH", paidAmount: 0, pendingAmount: 0 },
  discountCode: "",
  roundOff: 0,
  subtotal: 0,
  discountAmount: 0,
  taxAmount: 0,
  grandTotal: 0,
};

const BillingPage = () => {
  const ref = useRef<HTMLElement | null>(null);
  const dispatch = useDispatch();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [state, setState] = useState(initialState);
  const [customers] = useState<Partial<CustomerType>[]>([
    { id: "1", name: "John Doe", phone: "9999999999", loyaltyPoints: 150 },
    { id: "2", name: "Jane Smith", phone: "8888888888", loyaltyPoints: 250 },
  ]); // Mock - replace with API
  const [products] = useState([
    {
      id: "1",
      productId: "P001",
      batchNumber: "BATCH-001",
      brandName: "Aavin Milk 1L",
      barcode: "890123456001",
      storId: "STORE-1",
      packedDate: new Date("2026-03-01"),
      expiryDate: new Date("2026-04-20"),
      taxRate: 5,
      taxInclusive: true,
      purchasePrice: 48,
      mrp: 60,
      sellingPrice: 58,
      quantity: 25,
      isActive: true,
      createdInfo: {} as any,
      updatedInfo: {} as any,
    },
    {
      id: "2",
      productId: "P002",
      batchNumber: "BATCH-002",
      brandName: "Britannia Bread",
      barcode: "890123456002",
      storId: "STORE-1",
      packedDate: new Date("2026-04-01"),
      expiryDate: new Date("2026-04-10"),
      taxRate: 5,
      taxInclusive: true,
      purchasePrice: 30,
      mrp: 40,
      sellingPrice: 38,
      quantity: 10,
      isActive: true,
      createdInfo: {} as any,
      updatedInfo: {} as any,
    },
    {
      id: "3",
      productId: "P003",
      batchNumber: "BATCH-003",
      brandName: "Coca Cola 750ml",
      barcode: "890123456003",
      storId: "STORE-1",
      taxRate: 12,
      taxInclusive: true,
      purchasePrice: 35,
      mrp: 45,
      sellingPrice: 42,
      quantity: 50,
      isActive: true,
      createdInfo: {} as any,
      updatedInfo: {} as any,
    },
    {
      id: "4",
      productId: "P004",
      batchNumber: "BATCH-004",
      brandName: "Maggi Noodles",
      barcode: "890123456004",
      storId: "STORE-1",
      taxRate: 5,
      taxInclusive: true,
      purchasePrice: 10,
      mrp: 14,
      sellingPrice: 13,
      quantity: 100,
      isActive: true,
      createdInfo: {} as any,
      updatedInfo: {} as any,
    },
    {
      id: "5",
      productId: "P005",
      batchNumber: "BATCH-005",
      brandName: "Tata Salt 1kg",
      barcode: "890123456005",
      storId: "STORE-1",
      taxRate: 5,
      taxInclusive: true,
      purchasePrice: 18,
      mrp: 25,
      sellingPrice: 24,
      quantity: 40,
      isActive: true,
      createdInfo: {} as any,
      updatedInfo: {} as any,
    },
    {
      id: "6",
      productId: "P006",
      batchNumber: "BATCH-006",
      brandName: "Surf Excel 1kg",
      barcode: "890123456006",
      storId: "STORE-1",
      taxRate: 18,
      taxInclusive: true,
      purchasePrice: 180,
      mrp: 220,
      sellingPrice: 210,
      quantity: 15,
      isActive: true,
      createdInfo: {} as any,
      updatedInfo: {} as any,
    },
    {
      id: "7",
      productId: "P007",
      batchNumber: "BATCH-007",
      brandName: "Parle-G Biscuits",
      barcode: "890123456007",
      storId: "STORE-1",
      taxRate: 5,
      taxInclusive: true,
      purchasePrice: 8,
      mrp: 10,
      sellingPrice: 10,
      quantity: 200,
      isActive: true,
      createdInfo: {} as any,
      updatedInfo: {} as any,
    },
    {
      id: "8",
      productId: "P008",
      batchNumber: "BATCH-008",
      brandName: "Colgate Toothpaste",
      barcode: "890123456008",
      storId: "STORE-1",
      taxRate: 18,
      taxInclusive: true,
      purchasePrice: 85,
      mrp: 110,
      sellingPrice: 105,
      quantity: 30,
      isActive: true,
      createdInfo: {} as any,
      updatedInfo: {} as any,
    },
    {
      id: "9",
      productId: "P009",
      batchNumber: "BATCH-009",
      brandName: "Dove Soap",
      barcode: "890123456009",
      storId: "STORE-1",
      taxRate: 18,
      taxInclusive: true,
      purchasePrice: 45,
      mrp: 65,
      sellingPrice: 60,
      quantity: 60,
      isActive: true,
      createdInfo: {} as any,
      updatedInfo: {} as any,
    },
    {
      id: "10",
      productId: "P010",
      batchNumber: "BATCH-010",
      brandName: "Good Day Cookies",
      barcode: "890123456010",
      storId: "STORE-1",
      taxRate: 5,
      taxInclusive: true,
      purchasePrice: 25,
      mrp: 35,
      sellingPrice: 33,
      quantity: 75,
      isActive: true,
      createdInfo: {} as any,
      updatedInfo: {} as any,
    },
  ]); // Mock - replace with API

  // Derived totals (computed, not stored in state)
  const subtotal = state.billProducts.reduce(
    (sum, item) => sum + (item.total || 0),
    0,
  );
  const taxAmount = state.billProducts.reduce(
    (sum, item) => sum + (item.taxAmount || 0),
    0,
  );
  const discountAmount = 0; // Implement coupon logic
  const grandTotal = subtotal + taxAmount + state.roundOff - discountAmount;
  const pendingAmount = Math.max(0, grandTotal - state.paymentInfo.paidAmount);
  console.log(pendingAmount);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await ref.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    dispatch(setSidebarCollapsed(true));
  }, [dispatch]);

  const updateQuantity = (index: number, qty: number) => {
    const product = state.billProducts[index];
    if (!product.sellingPrice) return;

    const total = product.sellingPrice * qty;
    const taxAmount = total * ((product.taxRate || 0) / 100);

    setState((prev) => ({
      ...prev,
      billProducts: prev.billProducts.map((item, i) =>
        i === index ? { ...item, quantity: qty, total, taxAmount } : item,
      ) as Array<Partial<BillProduct>>,
    }));
  };

  const removeProduct = (index: number) => {
    setState((prev) => ({
      ...prev,
      billProducts: prev.billProducts.filter((_, i) => i !== index),
    }));
  };

  const saveBill = () => {
    const bill: Partial<BillType> = {
      customerId: state.selectedCustomer?.id || "",
      customerName: state.selectedCustomer?.name || "Walk-in",
      customerPhone: state.selectedCustomer?.phone || "",
      billProducts: state.billProducts,
      totalQuantity: state.billProducts.reduce(
        (sum, p) => sum + (p.quantity || 0),
        0,
      ),
      subTotal: state.subtotal,
      discountAmount: state.discountAmount,
      taxAmount: state.taxAmount,
      grandTotal: state.grandTotal,
      roundOff: state.roundOff,
      payment: state.paymentInfo,
      // status handled separately
      notes: "",
    };
    console.log("Save bill:", bill);
    // TODO: API call
    alert("Bill saved! (Mock)");
  };

  const printReceipt = () => {
    window.print();
  };

  return (
    <Box
      ref={ref}
      className="h-full flex flex-col gap-1 bg-bg-elevated text-text-body rounded-xl shadow-lg p-2"
    >
      <Box className="flex justify-end">
        <button onClick={toggleFullscreen}>
          {isFullscreen ? (
            <MdOutlineFullscreenExit size={24} />
          ) : (
            <MdOutlineFullscreen size={24} />
          )}
        </button>
      </Box>

      <Box className=" h-full overflow-hidden">
        <Box className="grid grid-cols-[1fr_2fr_1fr] h-full gap-3">
          {/* LEFT: Customer + Products */}
          <Box className="flex flex-col h-full gap-2 min-h-0">
            <Box>
              <label className="block text-sm font-medium mb-2">Customer</label>
              <CustomSearch
                placeholder="Search customer..."
                data={customers}
                getLabel={(customer) => {
                  return customer.name || "";
                }}
                onSelect={(customer: any) =>
                  setState((prev) => ({
                    ...prev,
                    selectedCustomer: customer,
                  }))
                }
              />
              {state.selectedCustomer && (
                <Box className="mt-2  bg-gray-50 rounded-lg text-sm">
                  <Box>
                    <strong>{state.selectedCustomer.name}</strong>
                  </Box>
                  <Box>{state.selectedCustomer.phone}</Box>
                  <Box className="text-xs text-gray-500">
                    {state.selectedCustomer.addressLine1}
                  </Box>
                </Box>
              )}
            </Box>

            <Box className="flex-1 h-full">
              <label className="block text-sm font-medium mb-2">Products</label>
              <CustomInput placeholder="Search product..." size="small" />
              <Box className="mt-3 space-y-2 h-full overflow-y-auto">
                {products.map((product) => (
                  <ProductCard
                    quantity={product.quantity}
                    item={product}
                    onChangeQty={() => {}}
                    onIncrease={() => {}}
                    onDecrease={() => {}}
                  />
                ))}
              </Box>
            </Box>
          </Box>

          {/* CENTER: Bill Details */}
          <Box className="flex flex-col h-full gap-2 min-h-0">
            <BillingList />
            <Box className=" text-sm">
              <Box className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatAmount(state.subtotal)}</span>
              </Box>
              <Box className="flex justify-between">
                <span>Tax:</span>
                <span>{formatAmount(state.taxAmount)}</span>
              </Box>
              <Box className="flex justify-between font-medium text-lg">
                <span>Total:</span>
                <span>{formatAmount(state.grandTotal)}</span>
              </Box>
            </Box>
          </Box>

          {/* RIGHT: Payment + Totals */}
          <Box className="flex flex-col h-full gap-2 min-h-0">
            <Box className="rounded-xl">
              <h4 className="font-bold mb-2">Payment Details</h4>

              <Box className="space-y-3">
                <Box>
                  <CustomSelect
                    label="Payment Mode"
                    size="small"
                    options={[
                      { value: "CASH", label: "Cash" },
                      { value: "CARD", label: "Card" },
                      { value: "UPI", label: "UPI" },
                      { value: "BANK", label: "Bank Transfer" },
                      { value: "MIXED", label: "Mixed" },
                    ]}
                    value={state.paymentInfo.method}
                    onChange={(value: string) =>
                      setState((prev) => ({
                        ...prev,
                        paymentInfo: {
                          ...prev.paymentInfo,
                          method: value as PaymentMethod,
                        },
                      }))
                    }
                  />
                </Box>

                <Box>
                  <label className="block text-sm font-medium mb-1">
                    Amount Paid
                  </label>
                  <CustomInput
                    size="small"
                    type="number"
                    value={state.paymentInfo.paidAmount}
                    onChange={(e) =>
                      setState((prev) => ({
                        ...prev,
                        paymentInfo: {
                          ...prev.paymentInfo,
                          paidAmount: Number(e.target.value),
                        },
                      }))
                    }
                  />
                </Box>

                <Box className="p-3 bg-yellow-50 rounded-lg">
                  <Box className="flex justify-between font-bold">
                    <span>Pending:</span>
                    <span>{formatAmount(state.paymentInfo.pendingAmount)}</span>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box className="space-y-2">
              <Box className="flex justify-between text-sm">
                <span>Discount Code:</span>
                <CustomInput
                  size="small"
                  value={state.discountCode}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setState((prev) => ({
                      ...prev,
                      discountCode: e.target.value,
                    }))
                  }
                  placeholder="Enter code"
                />
              </Box>
              <CustomInput
                label="Round Off"
                type="number"
                size="small"
                value={state.roundOff}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setState((prev) => ({
                    ...prev,
                    roundOff: Number(e.target.value),
                  }))
                }
              />
            </Box>

            <Box className="mt-auto space-y-2">
              <CustomButton fullWidth startIcon={<MdSave />} onClick={saveBill}>
                Complete Bill
              </CustomButton>
              <CustomButton
                fullWidth
                variant="outline"
                startIcon={<MdPrint />}
                onClick={printReceipt}
              >
                Save as Draft
              </CustomButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>

    // <style jsx>{`
    //   @media print {
    //     body * {
    //       visibility: hidden;
    //     }
    //     .billing-print,
    //     .billing-print * {
    //       visibility: visible;
    //     }
    //     .billing-print {
    //       position: absolute;
    //       left: 0;
    //       top: 0;
    //       width: 100%;
    //     }
    //   }
    // `}</style>
  );
};

export default BillingPage;
