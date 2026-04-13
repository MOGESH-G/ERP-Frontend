import {
  MdOutlineDashboard,
  MdInventory2,
  MdPointOfSale,
  MdPeopleAlt,
} from "react-icons/md";
import { RiSettings3Fill } from "react-icons/ri";

import type { MenuItem } from "../types/menu";

export const getMenuItems = (shopId: string): MenuItem[] => {
  const base = `/app/shops/${shopId}`;

  return [
    {
      label: "Dashboard",
      icon: MdOutlineDashboard,
      path: `${base}`,
    },
    {
      label: "POS",
      icon: MdPointOfSale,
      path: `${base}/pos`,
    },
    {
      label: "Customers",
      icon: MdPeopleAlt,
      path: `${base}/customers`,
      // children: [
      //   {
      //     label: "All Customers",
      //     icon: MdPeopleAlt,
      //   },
      //   {
      //     label: "Add Customer",
      //     path: `${base}/customers/create`,
      //     icon: MdPeopleOutline,
      //   },
      // ],
    },
    {
      label: "Inventory",
      icon: MdInventory2,
      path: `${base}/inventory`,
      children: [],
      // children: [
      //   {
      //     label: "All Products",
      //     icon: MdInventory2,
      //   },
      //   {
      //     label: "Add Product",
      //     path: `${base}/inventory/create`,
      //     icon: MdInventory2,
      //   },
      // ],
    },
    {
      label: "Settings",
      icon: RiSettings3Fill,
      path: `${base}/settings`,
    },
  ];
};

export const routeToMenuMap: Record<string, string[]> = {
  "/app/shops/:shopId": ["Dashboard"],
  "/app/shops/:shopId/pos": ["POS"],
  "/app/shops/:shopId/customers": ["Customers"],
  "/app/shops/:shopId/customers/new-customer": ["Customers", "Add Customer"],
  "/app/shops/:shopId/inventory": ["Inventory"],
  "/app/shops/:shopId/inventory/create": ["Inventory", "Add Product"],
};
