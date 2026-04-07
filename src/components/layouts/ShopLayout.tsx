import { Outlet } from "react-router-dom";
import ShopHeader from "./ShopHeader";
import ShopSidebar from "./ShopSidebar";

const ShopLayout = () => {
  return (
    <div className="flex h-screen w-screen bg-bg-subtle">
      {/* Sidebar */}
      <ShopSidebar />

      {/* Right Section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <ShopHeader />

        <main className="flex-1 p-6 overflow-auto bg-bg-secondary">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ShopLayout;