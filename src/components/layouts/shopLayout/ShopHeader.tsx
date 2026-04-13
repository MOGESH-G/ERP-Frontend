import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import CustomButton from "../../custom/CustomButton";
import { useTheme } from "../../../hooks/useTheme";

const ShopHeader = () => {
  const navigate = useNavigate();
  const { mode, toggle } = useTheme();

  return (
    <header
      className="h-14 flex items-center justify-end px-6 text-white bg-primary-500"
      style={{ borderBottomRightRadius: "25px" }}
    >
      {/* <h1 className="font-semibold">Dashboard</h1> */}

      <div className="flex justify-end items-center gap-1">
        <CustomButton
          variant="ghost"
          className="rounded-full! w-10 h-10"
          size="sm"
          onClick={toggle}
        >
          {mode === "dark" ? (
            <MdOutlineLightMode size={24} />
          ) : (
            <MdOutlineDarkMode size={24} />
          )}
        </CustomButton>
        <CustomButton
          variant="ghost"
          className="rounded-full! w-10 h-10 text-error!"
          size="sm"
          onClick={() => navigate("/app")}
        >
          {<IoIosLogOut size={24} />}
        </CustomButton>
      </div>
    </header>
  );
};

export default ShopHeader;
