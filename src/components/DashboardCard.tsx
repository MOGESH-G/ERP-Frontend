import clsx from "clsx";

type DashboardCardProps = {
  icon?: React.ReactNode;
  label: string;
  onClick: () => void;
  visible?: boolean;
  warning?: boolean;
};

const DashboardCard = ({
  icon,
  label,
  onClick,
  visible = true,
  warning = false,
}: DashboardCardProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "rounded-xl flex flex-col items-center justify-center gap-2",
        "bg-bg-elevated hover:shadow-lg transition-all duration-200",
        "text-sm font-medium border border-primary-500 cursor-pointer",
        warning && "text-text-warning",
        !visible && "invisible pointer-events-none",
      )}
    >
      {icon && <div>{icon}</div>}
      <span>{label}</span>
    </button>
  );
};

export default DashboardCard;
