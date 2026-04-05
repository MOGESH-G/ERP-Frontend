import { Typography } from "@mui/material";
import type { Shops } from "../types/shops";
import { useNavigate } from "react-router-dom";

const ShopCard = ({ shop }: { shop: Shops }) => {
  const navigate = useNavigate();
  //   const theme = useTheme(); // now you can access custom palette
  //   const isDark = theme.palette.mode === "dark";

  //   const bg = isDark
  //     ? theme.palette.custom.bgElevated
  //     : theme.palette.custom.bgPaper;
  //   const hoverBg = isDark
  //     ? theme.palette.custom.bgPaper
  //     : theme.palette.custom.bgElevated;
  //   const borderColor = theme.palette.custom.amber300; // subtle amber border for both themes
  //   const textColor = theme.palette.custom.textBody;

  return (
    <div
      onClick={() => navigate(`/shops/${shop.id}`)}
      className={`w-full max-w-xs cursor-pointer rounded-xl border p-4 transition-all duration-200 shadow-sm hover:shadow-lg h-30 hover:bg-bgPaper`}
    >
      <div className="flex flex-col gap-2">
        <Typography
          component="h3"
          className="text-xl font-bold leading-tight"
          //   style={{ color: theme.palette.custom.textHeader }}
        >
          {shop.shop_code} - {shop.name.toUpperCase()}
        </Typography>

        <Typography
          component="p"
          className="text-sm"
          //   style={{ color: theme.palette.custom.textSubHeader }}
        >
          {shop.address}
        </Typography>
      </div>
    </div>
  );
};

export default ShopCard;
