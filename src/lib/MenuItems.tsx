import {
  MdOutlineDashboard,
  MdPeopleOutline,
  MdInventory2,
  MdPointOfSale,
} from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";

export const getMenuItems = (shopId: string) => {
  const base = `/app/shops/${shopId}`;

  return [
    {
      label: "Dashboard",
      icon: MdOutlineDashboard,
      path: base,
    },
    {
      label: "POS",
      icon: MdPointOfSale,
      path: `${base}/pos`,
    },
    {
      label: "Customers",
      icon: FaCartShopping,
      children: [
        {
          label: "All Customers",
          path: `${base}/customers`,
          icon: MdPeopleOutline,
        },
        {
          label: "Add Customer",
          path: `${base}/customers/create`,
          icon: MdPeopleOutline,
        },
      ],
    },
    {
      label: "Inventory",
      icon: MdInventory2,
      children: [
        {
          label: "All Products",
          path: `${base}/inventory`,
          icon: MdInventory2,
        },
        {
          label: "Add Product",
          path: `${base}/inventory/create`,
          icon: MdInventory2,
        },
      ],
    },
  ];
};

export const routeToMenuMap: Record<string, string[]> = {
  "/app/shops/:shopId": ["Dashboard"],
  "/app/shops/:shopId/pos": ["POS"],
  "/app/shops/:shopId/customers": ["Customers", "All Customers"],
  "/app/shops/:shopId/customers/create": ["Customers", "Add Customer"],
  "/app/shops/:shopId/inventory": ["Inventory", "All Products"],
  "/app/shops/:shopId/inventory/create": ["Inventory", "Add Product"],
};
