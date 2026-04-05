import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutSuccess } from "../../slices/authSlice";
import CustomAccordion from "../../components/CustomAccordion";
import type { Shops } from "../../types/shops";
import ShopCard from "../../components/ShopCard";
import CustomButton from "../../components/CustomButton";
import { toggleTheme } from "../../slices/themeSlice";

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

  const handleLogout = () => {
    dispatch(logoutSuccess());
    navigate("/auth/login", { replace: true });
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col h-screen bg-bgBase text-textBody overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-borderDefault dark:border-dark-borderDefault bg-bgPaper dark:bg-dark-bgPaper">
        <h1 className="text-2xl font-bold text-textHeader dark:text-dark-textHeader">
          Welcome to the Dashboard!
        </h1>
        <button onClick={() => dispatch(toggleTheme())}>Toggle Theme</button>
        <CustomButton
          onClick={handleLogout}
          variant="outline"
          className="px-4 py-2 text-textError! rounded-md  transition"
        >
          Logout
        </CustomButton>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Quick Actions */}
        <section>
          <h2 className="text-xl font-semibold mb-3 text-textSubHeader dark:text-dark-textSubHeader">
            Quick Actions
          </h2>

          <CustomAccordion title="Shops" defaultExpanded>
            <ul className="space-y-2">
              {shops.map((shop) => (
                <li key={shop.id}>
                  <ShopCard shop={shop} />
                </li>
              ))}

              <li>
                <button
                  onClick={() => handleNavigate("/app/shops/create")}
                  className="w-full text-left px-4 py-2 rounded-md hover:bg-bgElevated dark:hover:bg-dark-bgElevated transition"
                >
                  Create New Shop
                </button>
              </li>
            </ul>
          </CustomAccordion>

          <CustomAccordion title="Profile">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavigate("/app/profile")}
                  className="w-full text-left px-4 py-2 rounded-md hover:bg-bgElevated dark:hover:bg-dark-bgElevated transition"
                >
                  Update Your Details
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate("/app/change-password")}
                  className="w-full text-left px-4 py-2 rounded-md hover:bg-bgElevated dark:hover:bg-dark-bgElevated transition"
                >
                  Change Password
                </button>
              </li>
            </ul>
          </CustomAccordion>

          <CustomAccordion title="Other">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavigate("/app/dashboard")}
                  className="w-full text-left px-4 py-2 rounded-md hover:bg-bgElevated dark:hover:bg-dark-bgElevated transition"
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate("/app/forbidden")}
                  className="w-full text-left px-4 py-2 rounded-md hover:bg-bgElevated dark:hover:bg-dark-bgElevated transition"
                >
                  Permission Test (Forbidden)
                </button>
              </li>
            </ul>
          </CustomAccordion>
        </section>
      </main>
    </div>
  );
};

export default Home;
