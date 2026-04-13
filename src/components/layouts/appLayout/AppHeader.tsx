import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../../slices/authSlice";
import { useTheme } from "../../../hooks/useTheme";
import CustomButton from "../../custom/CustomButton";
import { useNavigate } from "react-router-dom";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

const AppHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mode, toggle } = useTheme();

  const handleLogout = () => {
    dispatch(logoutSuccess());
    navigate("/auth/login", { replace: true });
  };
  return (
    <header
      className="
        flex justify-between items-center
        px-6 py-4
        border-b border-white/20
        bg-linear-to-r from-primary-500 to-primary-300
        backdrop-blur-md
        shadow-sm
        text-white
        sticky top-0 z-50
        transition-all
      "
    >
      <h1 className="text-xl font-semibold text-text-header tracking-tight">
        Welcome
      </h1>

      <div className="flex items-center gap-3">
        <span onClick={toggle}>
          {mode === "dark" ? (
            <MdOutlineLightMode size={24} color="yellow" />
          ) : (
            <MdDarkMode size={24} color="black" />
          )}
        </span>

        {/* Logout */}
        <CustomButton onClick={handleLogout} variant="outline" color="red">
          Logout
        </CustomButton>
      </div>
    </header>
  );
};

export default AppHeader;
