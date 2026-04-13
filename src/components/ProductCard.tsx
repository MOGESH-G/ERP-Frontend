import { Box } from "@mui/material";
import type { BatchType } from "../types/inventory";
import Stepper from "./custom/CustomStepper";

interface ProductCardProps {
  item: BatchType;
  quantity: number; // quantity added to bill
  onChangeQty: (val: number) => void;
  onIncrease: () => void;
  onDecrease: () => void;
}

const ProductCard = ({
  item,
  quantity,
  onChangeQty,
  onIncrease,
  onDecrease,
}: ProductCardProps) => {
  return (
    <Box className="w-full p-3 border rounded-md shadow-sm hover:shadow-md transition grid grid-cols-[1fr_auto_auto] gap-4 items-center">
      {/* LEFT: Product Info */}
      <Box className="flex flex-col">
        <span className="font-semibold text-sm">{item.brandName}</span>

        <span className="text-xs text-gray-500">{item.batchNumber}</span>
      </Box>

      {/* MIDDLE: Price & Stock */}
      <Box className="flex flex-col text-xs text-right">
        <span className="font-medium text-green-600">₹{item.sellingPrice}</span>

        <span className="text-gray-500">MRP: ₹{item.mrp}</span>

        <span
          className={`${item.quantity > 0 ? "text-blue-600" : "text-red-500"}`}
        >
          Stock: {item.quantity}
        </span>
      </Box>

      {/* RIGHT: Stepper */}
      <Stepper
        value={quantity}
        min={0}
        max={item.quantity} // cannot exceed stock
        onChange={onChangeQty}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
      />
    </Box>
  );
};

export default ProductCard;
