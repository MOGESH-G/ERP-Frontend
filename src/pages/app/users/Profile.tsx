import { useSelector } from "react-redux";
// import { useQuery } from "@tanstack/react-query";
import type { RootState } from "../../../store";
import type { User } from "../../../types/user";
// import { verifyUser } from "../../../api/auth";
import CustomButton from "../../../components/custom/CustomButton";
import CustomInput from "../../../components/custom/CustomInput";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
// import Loader from "../../../components/Loader";

const Profile = () => {
  const navigate = useNavigate();
  const reduxUser = useSelector((state: RootState) => state.auth.user);

  const apiUser: User = {
    id: "user_001",
    roles: ["Admin"],
    permissions: {
      dashboard: {
        view: true,
      },
    },
    name: "Gene Rodriguez",
    phone: "+91 98234 89243",
    email: "gene.rodriguez@example.com",
    shopIds: ["shop_001", "shop_002"],
    aadharNumber: "1234 5678 9012",
    address: "1234 Maple Street, Sector 7, New Delhi, India",
  };
  // Fetch current user if not in Redux
  // const {
  //   data: apiUser,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ["auth", "verify-user"],
  //   queryFn: verifyUser,
  //   enabled: !reduxUser,
  //   staleTime: 5 * 60 * 1000, // 5 min
  // });

  const user = reduxUser || (apiUser as User);
  const displayName = user.name;
  const roleLabel = user.roles.join(", ");

  const handleEditProfile = () => {
    alert("Edit profile functionality - implement modal form here");
  };

  return (
    <Box className="w-full mx-auto space-y-4 mb-4 flex flex-col">
      <Box className=" flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <Box>
          <Typography variant="h1" className="font-semibold text-text-header">
            Account details
          </Typography>
        </Box>
      </Box>

      <section className="rounded-md bg-bg-paper p-4 shadow-md">
        <Box className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Box>
            <h2 className="text-xl font-semibold text-text-header">
              Profile Information
            </h2>
            <p className="text-sm text-text-body mt-1">
              Your current account details.
            </p>
          </Box>
          <Box className="flex flex-wrap gap-2">
            <CustomButton variant="primary" onClick={handleEditProfile}>
              Edit
            </CustomButton>
          </Box>
        </Box>

        <Box className="grid gap-4 md:grid-cols-2">
          <CustomInput
            label="Username"
            value={displayName}
            disabled
            fullWidth
          />
          <CustomInput label="Role" value={roleLabel} disabled fullWidth />
        </Box>

        <Box className="grid gap-4 md:grid-cols-2 mt-4">
          <CustomInput label="Email" value={user.email} disabled fullWidth />
          <CustomInput label="Phone" value={user.phone} disabled fullWidth />
        </Box>

        <Box className="grid gap-4 md:grid-cols-2 mt-4">
          <CustomInput
            label="Aadhar Number"
            value={user.aadharNumber}
            disabled
            fullWidth
          />
          <CustomInput
            label="Linked Shops"
            value={user.shopIds.join(", ")}
            disabled
            fullWidth
          />
        </Box>

        <Box className="grid gap-4 mt-4">
          <CustomInput
            label="Address"
            value={user.address}
            disabled
            fullWidth
            multiline
            rows={3}
          />
        </Box>
      </section>

      <section className="rounded-md bg-bg-paper p-4 shadow-md">
        <Box className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Box>
            <h2 className="text-xl font-semibold text-text-header">
              Password & Security
            </h2>
            <p className="text-sm text-text-body mt-1">
              Your current password and security settings.
            </p>
          </Box>
        </Box>

        <Box className="grid gap-4 md:grid-cols-2">
          <CustomInput label="Password" value="********" disabled fullWidth />
        </Box>
        <Box className="flex justify-end mt-4">
          <CustomButton
            variant="primary"
            className="w-fit"
            onClick={() => navigate("change-password")}
          >
            Change Password
          </CustomButton>
        </Box>
      </section>
    </Box>
  );
};

export default Profile;
