import { useState } from "react";
import BillingItem from "./BillingItem";
import { Box } from "@mui/material";

const BillingList = () => {
  const [items, setItems] = useState([
    {
      id: "1",
      name: "Cloud Storage",
      category: "Subscription",
      quantity: 1,
      max: 5,
    },
    {
      id: "2",
      name: "API Requests",
      category: "Usage",
      quantity: 2,
      max: 20000000,
    },
    {
      id: "3",
      name: "Team Members",
      category: "Seat-based",
      quantity: 3,
      max: 10,
    },
    {
      id: "2",
      name: "API Requests",
      category: "Usage",
      quantity: 2,
      max: 20000000,
    },
    {
      id: "3",
      name: "Team Members",
      category: "Seat-based",
      quantity: 3,
      max: 10,
    },
  ]);

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const max = item.max ?? 10;
        const newQty = item.quantity + delta;

        return {
          ...item,
          quantity: Math.max(0, Math.min(max, newQty)),
        };
      }),
    );
  };

  const onValueChange = (id: string, val: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const max = item.max ?? 10;

        return {
          ...item,
          quantity: Math.max(0, Math.min(max, val)),
        };
      }),
    );
  };

  const onRemoveProduct = (id: string) => {
    setItems(() => items.filter((it) => it.id !== id));
  };

  return (
    <Box className="w-full h-full overflow-y-scroll border border-secondary-500 rounded-md  p-2 flex flex-col gap-1">
      {items.map((item) => (
        <BillingItem
          item={item}
          onChange={onValueChange}
          updateQuantity={updateQuantity}
          onRemove={onRemoveProduct}
          max={item.max}
        />
      ))}
    </Box>
  );
};

export default BillingList;
