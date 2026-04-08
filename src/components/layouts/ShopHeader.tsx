import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import CustomButton from "../CustomButton";
import { useTheme } from "../../hooks/useTheme";

const ShopHeader = () => {
  const navigate = useNavigate();
  const { mode, toggle } = useTheme();

  return (
    <header
      className="h-16 flex items-center justify-between px-6 text-white bg-primary-500"
      style={{ borderBottomRightRadius: "25px" }}
    >
      <h1 className="font-semibold">Dashboard</h1>

      <div className="flex justify-end items-center gap-4">
        <span onClick={toggle}>
          {mode === "dark" ? (
            <MdOutlineLightMode size={24} />
          ) : (
            <MdOutlineDarkMode size={24} />
          )}
        </span>
        <CustomButton
          variant="outline"
          color="red"
          size="sm"
          startIcon={<IoIosLogOut />}
          onClick={() => navigate("/app")}
        >
          Leave Shop
        </CustomButton>
      </div>
    </header>
  );
};

export default ShopHeader;
