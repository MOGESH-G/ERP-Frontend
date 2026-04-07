import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { type MRT_ColumnDef } from "material-react-table";
import { Box, Chip, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CustomTable } from "../../../components/CustomTable";

interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  roles: string[];
  permissions: Record<string, Record<string, boolean>>;
  shop_ids: string[];
  aadhar_number: string;
  address: string;
}

const Users = () => {
  const [params] = useSearchParams();
  console.log(Object.fromEntries(params.entries())); // better logging

  const users: User[] = [
    {
      id: "1",
      name: "Arun Kumar",
      phone: "9876543210",
      email: "arun.kumar@example.com",
      roles: ["admin"],
      permissions: {
        users: { view: true, create: true, edit: true, delete: true },
      },
      shop_ids: ["shop1", "shop2"],
      aadhar_number: "123412341234",
      address: "Chennai, Tamil Nadu",
    },
    {
      id: "2",
      name: "Priya Sharma",
      phone: "9123456780",
      email: "priya.sharma@example.com",
      roles: ["manager"],
      permissions: {
        users: { view: true, create: true, edit: true, delete: false },
      },
      shop_ids: ["shop2"],
      aadhar_number: "234523452345",
      address: "Madurai, Tamil Nadu",
    },
    {
      id: "3",
      name: "Rahul Verma",
      phone: "9988776655",
      email: "rahul.verma@example.com",
      roles: ["staff"],
      permissions: {
        users: { view: true, create: false, edit: false, delete: false },
      },
      shop_ids: ["shop3"],
      aadhar_number: "345634563456",
      address: "Coimbatore, Tamil Nadu",
    },
    {
      id: "4",
      name: "Sneha Iyer",
      phone: "9090909090",
      email: "sneha.iyer@example.com",
      roles: ["staff"],
      permissions: {
        users: { view: true, create: false, edit: true, delete: false },
      },
      shop_ids: ["shop1"],
      aadhar_number: "456745674567",
      address: "Trichy, Tamil Nadu",
    },
    {
      id: "5",
      name: "Karthik R",
      phone: "8888888888",
      email: "karthik.r@example.com",
      roles: ["manager"],
      permissions: {
        users: { view: true, create: true, edit: true, delete: false },
      },
      shop_ids: ["shop4"],
      aadhar_number: "567856785678",
      address: "Salem, Tamil Nadu",
    },
    {
      id: "6",
      name: "Divya Nair",
      phone: "7777777777",
      email: "divya.nair@example.com",
      roles: ["staff"],
      permissions: {
        users: { view: true, create: false, edit: false, delete: false },
      },
      shop_ids: ["shop5"],
      aadhar_number: "678967896789",
      address: "Erode, Tamil Nadu",
    },
    {
      id: "7",
      name: "Vikram Singh",
      phone: "9666666666",
      email: "vikram.singh@example.com",
      roles: ["admin"],
      permissions: {
        users: { view: true, create: true, edit: true, delete: true },
      },
      shop_ids: ["shop1", "shop3"],
      aadhar_number: "789078907890",
      address: "Bangalore, Karnataka",
    },
    {
      id: "8",
      name: "Meena Lakshmi",
      phone: "9555555555",
      email: "meena.lakshmi@example.com",
      roles: ["staff"],
      permissions: {
        users: { view: true, create: false, edit: true, delete: false },
      },
      shop_ids: ["shop2", "shop4"],
      aadhar_number: "890189018901",
      address: "Madurai, Tamil Nadu",
    },
    {
      id: "9",
      name: "Suresh Babu",
      phone: "9444444444",
      email: "suresh.babu@example.com",
      roles: ["manager"],
      permissions: {
        users: { view: true, create: true, edit: false, delete: false },
      },
      shop_ids: ["shop6"],
      aadhar_number: "901290129012",
      address: "Hyderabad, Telangana",
    },
    {
      id: "10",
      name: "Anjali Gupta",
      phone: "9333333333",
      email: "anjali.gupta@example.com",
      roles: ["staff"],
      permissions: {
        users: { view: true, create: false, edit: false, delete: false },
      },
      shop_ids: ["shop7"],
      aadhar_number: "112211221122",
      address: "Delhi, India",
    },
  ];

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "phone", header: "Phone" },

      {
        accessorKey: "roles",
        header: "Roles",
        Cell: ({ cell }) => (
          <Box sx={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {cell.getValue<string[]>().map((role) => (
              <Chip
                key={role}
                label={role}
                color={
                  role === "admin"
                    ? "error"
                    : role === "manager"
                      ? "warning"
                      : "primary"
                }
                size="small"
              />
            ))}
          </Box>
        ),
      },

      {
        accessorKey: "shop_ids",
        header: "Shops",
        Cell: ({ cell }) => (
          <Box sx={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {cell.getValue<string[]>().map((shop) => (
              <Chip key={shop} label={shop} size="small" />
            ))}
          </Box>
        ),
      },

      { accessorKey: "address", header: "Address" },
      { accessorKey: "aadhar_number", header: "Aadhar" },
    ],
    [],
  );

  return (
    <div className="p-4">
      <CustomTable<User>
        columns={columns}
        data={users}
        enableRowActions
        // state={{
        //   columnFilters, // controlled
        //   globalFilter, // controlled
        //   isLoading,
        // }}
        enableRowSelection={false}
        enableColumnFilters
        enableGlobalFilter
        manualFiltering
        onGlobalFilterChange={(value) => console.log("Global Filter:", value)}
        onColumnFiltersChange={(filters) =>
          console.log("Column Filters:", filters())
        }
        renderRowActions={({ row }) => (
          <Box sx={{ display: "flex", gap: "8px" }}>
            <Tooltip title="Edit">
              <IconButton
                color="primary"
                onClick={() => console.log("Edit", row.original)}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton
                color="error"
                onClick={() => console.log("Delete", row.original)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <p className="px-2 text-2xl font-semibold">Users</p>
        )}
      />
    </div>
  );
};

export default Users;
