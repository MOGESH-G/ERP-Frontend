const menuItems = [
  {
    label: "Dashboard",
    icon: "🏠",
    path: "/shop/dashboard",
  },
  {
    label: "Orders",
    icon: "🛒",
    children: [
      { label: "All Orders", path: "/shop/orders" },
      { label: "Create Order", path: "/shop/orders/create" },
    ],
  },
  {
    label: "Products",
    icon: "📦",
    children: [
      { label: "All Products", path: "/shop/products" },
      { label: "Add Product", path: "/shop/products/create" },
    ],
  },
];

export default menuItems;
