import { Typography } from "@mui/material";
import type { Shops } from "../types/shops";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

const ShopCard = ({ shop }: { shop: Shops }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/shops/${shop.id}`)}
      className={clsx(`
        w-full max-w-xs
        cursor-pointer
        rounded-xl
        p-4

        bg-bg-paper
        border border-border-subtle

        transition-all duration-200
        shadow-sm

        hover:shadow-md
        hover:-translate-y-0.5
        hover:bg-bg-elevated

        active:scale-[0.98]
      `)}
    >
      <div className="flex flex-col gap-2">
        {/* Title */}
        <Typography
          component="h3"
          className="
            text-base font-semibold
            text-text-header
            leading-tight tracking-tight
          "
        >
          {shop.shop_code} — {shop.name.toUpperCase()}
        </Typography>

        {/* Address */}
        <Typography
          component="p"
          className="
            text-sm
            text-text-sub
            line-clamp-2
          "
        >
          {shop.address}
        </Typography>
      </div>
    </div>
  );
};

export default ShopCard;
