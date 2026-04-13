import { useMemo } from "react";
import type { CustomerType } from "../../../types/customer";
import { CustomTable } from "../../../components/custom/CustomTable";
import type { MRT_ColumnDef } from "material-react-table";
import { Box } from "@mui/material";
import { formatAmount } from "../../../utils/formatAmount";
import CustomerEmptyTableFallback from "./CustomerEmptyTableFallback";
import { FiUserPlus } from "react-icons/fi";
import { RiFileExcel2Line } from "react-icons/ri";
import CustomButton from "../../../components/custom/CustomButton";
import { useNavigate } from "react-router-dom";

const Customers = () => {
  const navigate = useNavigate();
  const sampleCustomers: CustomerType[] = [
    {
      id: "c1a2b3d4",
      name: "Ravi Kumar",
      phone: "9876543210",
      email: "ravi.kumar@example.com",
      gender: "male",
      dateOfBirth: "1985-06-12",
      addressLine1: "12 MG Road",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      country: "India",
      preferredPaymentMethod: "upi",
      creditLimit: 5000,
      currentBalance: 1200,
      loyaltyPoints: 150,
      tags: ["VIP", "Frequent Buyer"],
      notes: "Prefers digital payments",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isBlocked: false,
    },
    {
      id: "c2a3b4d5",
      name: "Sanya Mehta",
      phone: "9123456780",
      email: "sanya.mehta@example.com",
      gender: "female",
      dateOfBirth: "1990-11-22",
      addressLine1: "45 Park Avenue",
      addressLine2: "Apt 201",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      country: "India",
      preferredPaymentMethod: "card",
      creditLimit: 10000,
      currentBalance: 500,
      loyaltyPoints: 200,
      tags: ["Premium"],
      notes: "Interested in new products",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isBlocked: false,
    },
    {
      id: "c3a4b5d6",
      name: "Anil Sharma",
      phone: "9988776655",
      gender: "male",
      dateOfBirth: "1978-03-05",
      addressLine1: "101 MG Road",
      city: "Delhi",
      state: "Delhi",
      pincode: "110001",
      country: "India",
      preferredPaymentMethod: "cash",
      creditLimit: 0,
      currentBalance: 0,
      loyaltyPoints: 50,
      tags: ["New"],
      notes: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isBlocked: false,
    },
    {
      id: "c4a5b6d7",
      name: "Priya Singh",
      phone: "9871234567",
      email: "priya.singh@example.com",
      gender: "female",
      addressLine1: "22 Lotus Street",
      city: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      preferredPaymentMethod: "upi",
      creditLimit: 2000,
      currentBalance: 100,
      loyaltyPoints: 80,
      tags: ["Loyal"],
      notes: "Always buys during weekends",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isBlocked: false,
    },
    {
      id: "c5a6b7d8",
      name: "Vikram Patel",
      phone: "9012345678",
      gender: "male",
      addressLine1: "88 Sunrise Apartments",
      city: "Ahmedabad",
      state: "Gujarat",
      country: "India",
      preferredPaymentMethod: "bank",
      creditLimit: 5000,
      currentBalance: 2500,
      loyaltyPoints: 120,
      tags: ["Wholesale"],
      notes: "Bulk buyer",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isBlocked: false,
    },
    {
      id: "c6a7b8d9",
      name: "Nisha Kapoor",
      phone: "9765432109",
      email: "nisha.kapoor@example.com",
      gender: "female",
      dateOfBirth: "1995-09-15",
      addressLine1: "12 Green Lane",
      city: "Pune",
      state: "Maharashtra",
      country: "India",
      preferredPaymentMethod: "card",
      creditLimit: 3000,
      currentBalance: 1200,
      loyaltyPoints: 60,
      tags: ["VIP"],
      notes: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isBlocked: false,
    },
    {
      id: "c7a8b9e0",
      name: "Rahul Verma",
      phone: "9898989898",
      gender: "male",
      addressLine1: "77 Ocean Drive",
      city: "Kolkata",
      state: "West Bengal",
      country: "India",
      preferredPaymentMethod: "cash",
      creditLimit: 0,
      currentBalance: 0,
      loyaltyPoints: 30,
      tags: [],
      notes: "First-time customer",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isBlocked: false,
    },
    {
      id: "c8a9b0e1",
      name: "Aditi Joshi",
      phone: "9123456789",
      email: "aditi.joshi@example.com",
      gender: "female",
      dateOfBirth: "1988-12-03",
      addressLine1: "5 Rose Avenue",
      city: "Hyderabad",
      state: "Telangana",
      country: "India",
      preferredPaymentMethod: "upi",
      creditLimit: 1000,
      currentBalance: 400,
      loyaltyPoints: 90,
      tags: ["Frequent Buyer"],
      notes: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isBlocked: false,
    },
    {
      id: "c9a0b1e2",
      name: "Suresh Rao",
      phone: "9988123456",
      gender: "male",
      addressLine1: "44 Maple Street",
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      preferredPaymentMethod: "bank",
      creditLimit: 4000,
      currentBalance: 1800,
      loyaltyPoints: 110,
      tags: ["Wholesale"],
      notes: "Bulk purchase every month",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isBlocked: false,
    },
    {
      id: "c10a1b2e3",
      name: "Meera Nair",
      phone: "9870012345",
      email: "meera.nair@example.com",
      gender: "female",
      dateOfBirth: "1992-05-20",
      addressLine1: "90 Lake View",
      city: "Trivandrum",
      state: "Kerala",
      country: "India",
      preferredPaymentMethod: "card",
      creditLimit: 1500,
      currentBalance: 500,
      loyaltyPoints: 70,
      tags: ["VIP", "Frequent Buyer"],
      notes: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isBlocked: false,
    },
  ];

  const columns = useMemo<MRT_ColumnDef<CustomerType>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "phone",
        header: "Phone",
      },
      {
        accessorKey: "gender",
        header: "Gender",
      },
      {
        accessorKey: "loyaltyPoints",
        header: "Loyalty Points",
      },
      {
        accessorKey: "currentBalance",
        header: "Current Balance",
        Cell: ({ cell }) => (
          <Box>{formatAmount(parseInt(cell.getValue<string>()))}</Box>
        ),
      },
      {
        accessorKey: "isBlocked",
        header: "Blocked",
        Cell: ({ cell }) => <Box>{cell.getValue<boolean>().toString()}</Box>,
      },
    ],
    [],
  );

  return (
    <Box className="flex flex-col gap-y-2">
      <CustomTable
        columns={columns}
        data={sampleCustomers}
        enableRowSelection={false}
        renderEmptyRowsFallback={() => <CustomerEmptyTableFallback />}
        renderTopToolbarCustomActions={() => (
          <Box className="flex flex-1 justify-between">
            <p className="text-text-header px-2 content-center text-xl">
              Customers
            </p>
            <Box className="flex gap-1">
              <CustomButton
                variant="ghost"
                className="rounded-full! w-10 h-10 text-secondary-700!"
                onClick={() => navigate("new-customer")}
              >
                <FiUserPlus size={22} />
              </CustomButton>
              <CustomButton
                variant="ghost"
                className="rounded-full! w-10 h-10 text-secondary-700!"
                onClick={() => console.log("Add roud")}
              >
                <RiFileExcel2Line size={20} />
              </CustomButton>
            </Box>
          </Box>
        )}
      />
    </Box>
  );
};

export default Customers;
