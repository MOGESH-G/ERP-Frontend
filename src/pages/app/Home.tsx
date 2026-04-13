import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Shops } from "../../types/shops";
import ShopCard from "../../components/ShopCard";
import { FiLock, FiUserPlus, FiUsers } from "react-icons/fi";
import DashboardCard from "../../components/DashboardCard";
import { HiOutlineUserCircle } from "react-icons/hi";
import { Box } from "@mui/material";

const Home = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [shops, setShops] = useState<Shops[]>([
    {
      id: "1",
      name: "Shop 1",
      address: "Location 1",
      gst_number: "GST123456",
      phone: "123-456-7890",
      shop_code: "S123",
    },
    {
      id: "2",
      name: "Shop 2",
      address: "Location 2",
      gst_number: "GST789012",
      phone: "987-654-3210",
      shop_code: "S456",
    },
    {
      id: "1",
      name: "Shop 1",
      address: "Location 1",
      gst_number: "GST123456",
      phone: "123-456-7890",
      shop_code: "S123",
    },
    {
      id: "2",
      name: "Shop 2",
      address: "Location 2",
      gst_number: "GST789012",
      phone: "987-654-3210",
      shop_code: "S456",
    },
    {
      id: "1",
      name: "Shop 1",
      address: "Location 1",
      gst_number: "GST123456",
      phone: "123-456-7890",
      shop_code: "S123",
    },
    {
      id: "2",
      name: "Shop 2",
      address: "Location 2",
      gst_number: "GST789012",
      phone: "987-654-3210",
      shop_code: "S456",
    },
    {
      id: "1",
      name: "Shop 1",
      address: "Location 1",
      gst_number: "GST123456",
      phone: "123-456-7890",
      shop_code: "S123",
    },
    {
      id: "2",
      name: "Shop 2",
      address: "Location 2",
      gst_number: "GST789012",
      phone: "987-654-3210",
      shop_code: "S456",
    },
    {
      id: "1",
      name: "Shop 1",
      address: "Location 1",
      gst_number: "GST123456",
      phone: "123-456-7890",
      shop_code: "S123",
    },
    {
      id: "2",
      name: "Shop 2",
      address: "Location 2",
      gst_number: "GST789012",
      phone: "987-654-3210",
      shop_code: "S456",
    },
  ]);

  const navigate = useNavigate();

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <Box className="grid grid-cols-1 lg:grid-cols-5 auto-rows-[140px] gap-4">
        <Box className="lg:col-span-4 row-span-3 bg-bg-elevated rounded-xl p-4 flex flex-col border-2 border-primary-500">
          <h2 className="text-md font-semibold mb-3">Shops</h2>

          <Box className="flex-1 overflow-y-auto pr-1">
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] auto-rows-[120px] pr-2 py-2 gap-4">
              {shops.map((shop) => (
                <li key={shop.id}>
                  <ShopCard shop={shop} />
                </li>
              ))}
            </ul>
          </Box>
        </Box>

        {/* 🟩 Profile */}
        <DashboardCard
          icon={<HiOutlineUserCircle size={28} />}
          label="Profile"
          onClick={() => navigate("/app/profile")}
        />

        {/* 🟩 Password */}
        <DashboardCard
          icon={<FiLock size={28} />}
          label="Password"
          onClick={() => navigate("/app/profile/change-password")}
        />

        {/* 🟩 Users */}
        <DashboardCard
          icon={<FiUsers size={28} />}
          label="Users"
          onClick={() => navigate("/app/users")}
        />

        {/* 🟩 Create User (permission-based) */}
        <DashboardCard
          icon={<FiUserPlus size={28} />}
          label="Create"
          onClick={() => navigate("users/create-user")}
        />

        {/* 🟩 Dashboard */}
        <DashboardCard
          label="Dashboard"
          onClick={() => navigate("/app/dashboard")}
        />

        {/* 🟩 Permission Test */}
        <DashboardCard
          label="Test"
          onClick={() => navigate("/app/forbidden")}
          warning
        />
      </Box>
    </main>
  );
};

export default Home;
