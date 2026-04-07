import type { Shops } from "../types/shops";
import { useNavigate } from "react-router-dom";

const ShopCard = ({ shop }: { shop: Shops }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`shops/${shop.id}`)}
      className={`
        w-full max-w-xs
        h-full
        cursor-pointer
        rounded-xl
        p-4

        bg-bg-paper
        border border-border-subtle

        transition-transform duration-300 ease-out
        shadow-lg
        hover:shadow-xl
        hover:-translate-y-1
        active:scale-95 hover:border-primary-500
      `}
    >
      <div className="flex flex-col justify-between h-full">
        {/* Title */}
        <p
          className="
            text-base font-semibold
            tracking-tight
          "
        >
          {shop.shop_code} - {shop.name.toUpperCase()}
        </p>

        {/* Phone */}
        <p className="text-secondary-500 text-sm">{shop.phone}</p>
      </div>
    </div>
  );
};

export default ShopCard;
