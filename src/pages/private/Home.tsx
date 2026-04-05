import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutSuccess } from "../../slices/authSlice";
import CustomAccordion from "../../components/CustomAccordion";
import type { Shops } from "../../types/shops";
import ShopCard from "../../components/ShopCard";
import CustomButton from "../../components/CustomButton";
import { useTheme } from "../../hooks/useTheme";

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
  ]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mode, toggle } = useTheme();

  const handleLogout = () => {
    dispatch(logoutSuccess());
    navigate("/auth/login", { replace: true });
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col h-screen bg-bg-base text-text-body overflow-hidden">
      {/* Header */}
      <header
        className="
      flex justify-between items-center
      px-6 py-4
      border-b border-border-subtle
      bg-bg-paper
      backdrop-blur-sm
    "
      >
        <h1 className="text-xl font-semibold text-text-header tracking-tight">Dashboard</h1>

        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggle}
            className="
            px-4 py-2 rounded-lg text-sm font-medium
            bg-primary-500 text-white
            transition-all duration-200
            hover:bg-primary-700
            active:scale-[0.97]
          "
          >
            {mode === "dark" ? "Light" : "Dark"} Mode
          </button>

          {/* Logout */}
          <CustomButton
            onClick={handleLogout}
            variant="outline"
            className="
            px-4 py-2 rounded-lg text-sm font-medium
            text-text-error
            transition-all duration-200
          "
          >
            Logout
          </CustomButton>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Section */}
          <section>
            <h2 className="text-lg font-semibold text-text-header mb-4">Quick Actions</h2>

            <div className="space-y-4">
              {/* Shops */}
              <CustomAccordion title="Shops" defaultExpanded>
                <ul className="space-y-2">
                  {shops.map((shop) => (
                    <li key={shop.id}>
                      <div
                        className="
                      bg-bg-paper
                      border border-border-subtle
                      rounded-lg
                      p-3
                      transition-all duration-200
                      hover:shadow-md
                      hover:-translate-y-[1px]
                    "
                      >
                        <ShopCard shop={shop} />
                      </div>
                    </li>
                  ))}

                  <li>
                    <button
                      onClick={() => handleNavigate("/app/shops/create")}
                      className="
                      w-full text-left px-4 py-2 rounded-lg
                      text-text-body
                      bg-bg-elevated
                      hover:bg-bg-subtle
                      transition-all duration-200
                    "
                    >
                      + Create New Shop
                    </button>
                  </li>
                </ul>
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
    </div>
  );
};

export default Home;
