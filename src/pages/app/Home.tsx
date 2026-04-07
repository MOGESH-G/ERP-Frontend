import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomAccordion from "../../components/CustomAccordion";
import type { Shops } from "../../types/shops";
import ShopCard from "../../components/ShopCard";
import CustomButton from "../../components/CustomButton";
import { FiPlus } from "react-icons/fi";

const Home = () => {
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

  const handleNavigate = (path: string) => {
    navigate(path);
  };

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

                <CustomButton
                  onClick={() => handleNavigate("/app/shops/create")}
                  variant="ghost"
                  contentAlign="start"
                  startIcon={<FiPlus />}
                >
                  Create New Shop
                </CustomButton>
              </div>
            </CustomAccordion>

            {/* Profile */}
            <CustomAccordion title="Profile">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleNavigate("/app/profile")}
                    className="
                      w-full text-left px-4 py-2 rounded-lg
                      bg-bg-elevated
                      hover:bg-bg-subtle
                      transition-all duration-200
                    "
                  >
                    Update Your Details
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => handleNavigate("/app/change-password")}
                    className="
                      w-full text-left px-4 py-2 rounded-lg
                      bg-bg-elevated
                      hover:bg-bg-subtle
                      transition-all duration-200
                    "
                  >
                    Change Password
                  </button>
                </li>
              </ul>
            </CustomAccordion>

            {/* Other */}
            <CustomAccordion title="Other">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleNavigate("/app/dashboard")}
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
                    onClick={() => handleNavigate("/app/forbidden")}
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
