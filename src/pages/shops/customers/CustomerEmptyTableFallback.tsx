import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/custom/CustomButton";
import { Box } from "@mui/material";

const CustomerEmptyTableFallback = () => {
  const navigate = useNavigate();

  return (
    <Box className="flex w-full flex-col justify-center items-center py-10 gap-2">
      <span className="text-gray-500 text-lg">No Customers available</span>
      <CustomButton size="sm" onClick={() => navigate("create")}>
        Add Customer
      </CustomButton>
    </Box>
  );
};

export default CustomerEmptyTableFallback;
