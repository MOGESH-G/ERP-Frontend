import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomAccordion from "../../components/CustomAccordion";
import type { Shops } from "../../types/shops";
import ShopCard from "../../components/ShopCard";
import { FiEye, FiLock, FiUser, FiUserPlus } from "react-icons/fi";

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
      <div className="max-w-5/6 mx-auto">
        {/* Section */}
        <section>
          <h2 className="text-lg font-semibold text-text-header mb-4">
            Quick Actions
          </h2>

          <div className="space-y-4">
            {/* Shops */}
            <CustomAccordion title="Shops" defaultExpanded>
              <div className="flex flex-col gap-4">
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                  {shops.map((shop) => (
                    <li key={shop.id} className="w-full h-32">
                      <ShopCard shop={shop} />
                    </li>
                  ))}
                </ul>

                {/* Shops create disabled - route not configured */}
              </div>
            </CustomAccordion>

            {/* Profile */}
            <CustomAccordion title="Profile">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => navigate("/app/profile")}
                    className="
                      w-full text-left px-4 py-2 rounded-lg
                      flex gap-2 items-center
                      bg-bg-elevated
                      hover:bg-bg-subtle
                      transition-all duration-200
                    "
                  >
                    <FiUser />
                    View Profile Details
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => navigate("/app/profile/change-password")}
                    className="
                      w-full text-left px-4 py-2 rounded-lg
                      flex gap-2 items-center
                      bg-bg-elevated
                      hover:bg-bg-subtle
                      transition-all duration-200
                    "
                  >
                    <FiLock />
                    Change Password
                  </button>
                </li>
              </ul>
            </CustomAccordion>

            {/* Users */}
            <CustomAccordion title="Users">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => navigate("/app/users")}
                    className="
                      w-full text-left px-4 py-2 rounded-lg
                      flex gap-2 items-center
                      bg-bg-elevated
                      hover:bg-bg-subtle
                      transition-all duration-200
                    "
                  >
                    <FiEye />
                    View all users
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => navigate("users/create-user")}
                    className="
                      w-full text-left px-4 py-2 rounded-lg
                      flex gap-2 items-center
                      bg-bg-elevated
                      hover:bg-bg-subtle
                      transition-all duration-200
                    "
                  >
                    <FiUserPlus />
                    Create User
                  </button>
                </li>
              </ul>
            </CustomAccordion>

            {/* Other */}
            <CustomAccordion title="Other">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => navigate("/app/dashboard")}
                    className="
                      w-full text-left px-4 py-2 rounded-lg
                      bg-bg-elevated
                      hover:bg-bg-subtle
                      transition-all duration-200
                    "
                  >
                    Dashboard
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => navigate("/app/forbidden")}
                    className="
                      w-full text-left px-4 py-2 rounded-lg
                      bg-bg-elevated
                      hover:bg-bg-subtle
                      text-text-warning
                      transition-all duration-200
                    "
                  >
                    Permission Test
                  </button>
                </li>
              </ul>
            </CustomAccordion>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
