import React from "react";

import { useSelector } from "react-redux";
// import { useQuery } from "@tanstack/react-query";
import type { RootState } from "../../../store";
import type { User } from "../../../types/user";
// import { verifyUser } from "../../../api/auth";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import { useNavigate } from "react-router-dom";
// import Loader from "../../../components/Loader";

const Profile: React.FC = () => {
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
    shop_ids: ["shop_001", "shop_002"],
    aadhar_number: "1234 5678 9012",
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
    <div className="w-full mx-auto space-y-4 mb-4 flex flex-col">
      <div className=" flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-text-header">
            Account details
          </h1>
        </div>
      </div>

      <section className="rounded-md bg-bg-paper p-4 shadow-md">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-text-header">
              Profile Information
            </h2>
            <p className="text-sm text-text-body mt-1">
              Your current account details.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <CustomButton variant="primary" onClick={handleEditProfile}>
              Edit
            </CustomButton>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <CustomInput
            label="Username"
            value={displayName}
            disabled
            fullWidth
          />
          <CustomInput label="Role" value={roleLabel} disabled fullWidth />
        </div>

        <div className="grid gap-4 md:grid-cols-2 mt-4">
          <CustomInput label="Email" value={user.email} disabled fullWidth />
          <CustomInput label="Phone" value={user.phone} disabled fullWidth />
        </div>

        <div className="grid gap-4 md:grid-cols-2 mt-4">
          <CustomInput
            label="Aadhar Number"
            value={user.aadhar_number}
            disabled
            fullWidth
          />
          <CustomInput
            label="Linked Shops"
            value={user.shop_ids.join(", ")}
            disabled
            fullWidth
          />
        </div>

        <div className="grid gap-4 mt-4">
          <CustomInput
            label="Address"
            value={user.address}
            disabled
            fullWidth
            multiline
            rows={3}
          />
        </div>
      </section>

      <section className="rounded-md bg-bg-paper p-4 shadow-md">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-text-header">
              Password & Security
            </h2>
            <p className="text-sm text-text-body mt-1">
              Your current password and security settings.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <CustomInput label="Password" value="********" disabled fullWidth />
        </div>
        <div className="flex justify-end mt-4">
          <CustomButton
            variant="primary"
            className="w-fit"
            onClick={() => navigate("change-password")}
          >
            Change Password
          </CustomButton>
        </div>
      </section>
    </div>
  );
};

export default Profile;
