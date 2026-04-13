import { Box, IconButton, Paper } from "@mui/material";
import Stepper from "../../../components/custom/CustomStepper";
import { MdDeleteOutline } from "react-icons/md";

type BillingProduct = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  max?: number;
};

interface BillingItemType {
  item: BillingProduct;
  onChange: (id: string, val: number) => void;
  onRemove: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  max: number;
}

const BillingItem = ({
  item,
  updateQuantity,
  onChange,
  onRemove,
  max = 0,
}: BillingItemType) => {
  return (
    <Paper
      key={item.id}
      className="w-full p-3 grid grid-cols-[1fr_auto_auto_auto] items-center gap-4"
    >
      {/* Left: Product Info */}
      <Box className="flex flex-col">
        <span className="font-semibold">{item.name}</span>
        <span className="text-sm text-secondary-500">{item.category}</span>
      </Box>

      {/* Middle: Quantity */}
      <Box className="text-sm text-secondary-700 text-center">
        MRP: {item.max}
      </Box>

      {/* Right: Stepper */}
      <Stepper
        value={item.quantity}
        min={0}
        max={max}
        onChange={(val) => onChange(item.id, val)}
        onIncrease={() => updateQuantity(item.id, 1)}
        onDecrease={() => updateQuantity(item.id, -1)}
      />

      <IconButton size="small" onClick={() => onRemove(item.id)}>
        <MdDeleteOutline color="red" />
      </IconButton>
    </Paper>
  );
};

export default BillingItem;
