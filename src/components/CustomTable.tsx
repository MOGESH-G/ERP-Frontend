import { useMemo, useState, type ReactNode } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_RowSelectionState,
} from "material-react-table";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";

// ─── Data Types ───────────────────────────────────────────────────────────────

export type EmployeeStatus = "Active" | "Inactive" | "Pending" | "On Leave";
export type EmployeeRole = "Engineer" | "Designer" | "Manager" | "Analyst" | "DevOps";
export type Department = "Engineering" | "Design" | "Product" | "Marketing" | "Operations";
export type Location = "New York" | "San Francisco" | "Austin" | "Chicago" | "Seattle" | "Remote";

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: EmployeeRole;
  department: Department;
  status: EmployeeStatus;
  salary: number;
  location: Location;
  joined: string;
  performance: number;
}

// ─── Sub-component Types ──────────────────────────────────────────────────────

interface StatusChipProps {
  value: EmployeeStatus;
}

interface RoleChipProps {
  value: EmployeeRole;
}

interface PerfBarProps {
  value: number;
}

// ─── Status config map ────────────────────────────────────────────────────────

interface StatusConfig {
  bg: string;
  text: string;
}

const STATUS_CONFIG: Record<EmployeeStatus, StatusConfig> = {
  Active: { bg: "#dcfce7", text: "#166534" },
  Inactive: { bg: "#fee2e2", text: "#991b1b" },
  Pending: { bg: "#fef9c3", text: "#854d0e" },
  "On Leave": { bg: "#f1f5f9", text: "#475569" },
};

const ROLE_COLORS: Record<EmployeeRole, string> = {
  Engineer: "#dbeafe",
  Designer: "#fce7f3",
  Manager: "#ede9fe",
  Analyst: "#d1fae5",
  DevOps: "#ffedd5",
};

// ─── MUI Theme ────────────────────────────────────────────────────────────────

const tableTheme = createTheme({
  palette: {
    primary: { main: "#4f46e5" },
    secondary: { main: "#0ea5e9" },
    error: { main: "#ef4444" },
    background: { default: "#f8fafc", paper: "#ffffff" },
  },
  typography: {
    fontFamily: "'Sora', 'Segoe UI', sans-serif",
    fontSize: 13,
  },
  shape: { borderRadius: 12 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.05)",
          borderRadius: 16,
          border: "1px solid #e2e8f0",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-head": {
            backgroundColor: "#f1f5f9",
            color: "#475569",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            borderBottom: "2px solid #e2e8f0",
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover td": { backgroundColor: "#f0f9ff !important" },
          "&.Mui-selected td": { backgroundColor: "#eef2ff !important" },
          transition: "background 0.15s",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #f1f5f9",
          padding: "10px 16px",
          fontSize: 13,
          color: "#374151",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: { color: "#cbd5e1", "&.Mui-checked": { color: "#4f46e5" } },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10, textTransform: "none", fontWeight: 600 },
      },
    },
  },
});

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusChip({ value }: StatusChipProps): ReactNode {
  const cfg = STATUS_CONFIG[value];
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{ backgroundColor: cfg.bg, color: cfg.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5" style={{ backgroundColor: cfg.text }} />
      {value}
    </span>
  );
}

function RoleChip({ value }: RoleChipProps): ReactNode {
  return (
    <span
      className="inline-block px-2 py-0.5 rounded-lg text-xs font-medium text-slate-700"
      style={{ backgroundColor: ROLE_COLORS[value] ?? "#f1f5f9" }}
    >
      {value}
    </span>
  );
}

function PerfBar({ value }: PerfBarProps): ReactNode {
  const color: string = value >= 85 ? "#22c55e" : value >= 70 ? "#f59e0b" : "#ef4444";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-bold w-8 text-right" style={{ color }}>
        {value}
      </span>
    </div>
  );
}

// ─── Sample Data ──────────────────────────────────────────────────────────────

const NAMES: string[] = [
  "Alice Johnson",
  "Bob Smith",
  "Carol White",
  "David Brown",
  "Eva Martinez",
  "Frank Lee",
  "Grace Kim",
  "Henry Chen",
  "Iris Patel",
  "Jack Wilson",
  "Karen Scott",
  "Liam Torres",
  "Mia Anderson",
  "Noah Harris",
  "Olivia Clark",
];
const ROLES: EmployeeRole[] = ["Engineer", "Designer", "Manager", "Analyst", "DevOps"];
const DEPTS: Department[] = ["Engineering", "Design", "Product", "Marketing", "Operations"];
const STATUSES: EmployeeStatus[] = ["Active", "Inactive", "Pending", "On Leave"];
const LOCS: Location[] = ["New York", "San Francisco", "Austin", "Chicago", "Seattle", "Remote"];

const SAMPLE_DATA: Employee[] = Array.from(
  { length: 50 },
  (_, i): Employee => ({
    id: `EMP-${String(i + 1).padStart(3, "0")}`,
    name: NAMES[i % NAMES.length],
    email: `${NAMES[i % NAMES.length].split(" ")[0].toLowerCase()}@company.io`,
    role: ROLES[i % ROLES.length],
    department: DEPTS[i % DEPTS.length],
    status: STATUSES[i % STATUSES.length],
    salary: 55000 + ((i * 1337) % 75000),
    location: LOCS[i % LOCS.length],
    joined: new Date(2019 + (i % 5), i % 12, (i % 28) + 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    performance: [90, 76, 85, 62, 94, 71, 88][i % 7],
  }),
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CustomTable(): ReactNode {
  const [data, setData] = useState<Employee[]>(SAMPLE_DATA);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const selectedCount: number = Object.keys(rowSelection).length;

  // Computed aggregates
  const avgSalary: number = useMemo(
    () => Math.round(data.reduce((s, r) => s + r.salary, 0) / (data.length || 1)),
    [data],
  );
  const avgPerformance: number = useMemo(
    () => Math.round(data.reduce((s, r) => s + r.performance, 0) / (data.length || 1)),
    [data],
  );
  const activeCount: number = useMemo(
    () => data.filter((r) => r.status === "Active").length,
    [data],
  );

  // Bulk delete selected rows
  const handleDeleteSelected = async (): Promise<void> => {
    setIsLoading(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 800));
    const selectedIds = new Set<string>(
      Object.keys(rowSelection)
        .map((i) => data[Number(i)]?.id)
        .filter(Boolean),
    );
    setData((prev) => prev.filter((r) => !selectedIds.has(r.id)));
    setRowSelection({});
    setIsLoading(false);
  };

  // Export visible data to CSV
  const handleExport = (): void => {
    const headers: string[] = [
      "ID",
      "Name",
      "Email",
      "Role",
      "Department",
      "Status",
      "Salary",
      "Location",
      "Joined",
    ];
    const rows: string[] = data.map((r) =>
      [r.id, r.name, r.email, r.role, r.department, r.status, r.salary, r.location, r.joined].join(
        ",",
      ),
    );
    const blob = new Blob([[headers.join(","), ...rows].join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "employees.csv";
    a.click();
  };

  // Delete a single row
  const handleDeleteRow = (id: string): void => {
    setData((prev) => prev.filter((r) => r.id !== id));
  };

  // Column definitions with full MRT typing
  const columns = useMemo<MRT_ColumnDef<Employee>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 90,
        Cell: ({ cell }) => (
          <span className="text-xs font-mono font-bold text-slate-400">
            {cell.getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: "name",
        header: "Employee",
        size: 200,
        Cell: ({ row }) => (
          <div className="flex items-center gap-2.5">
            <Avatar
              sx={{
                width: 32,
                height: 32,
                fontSize: 13,
                fontWeight: 700,
                bgcolor: `hsl(${row.original.name.charCodeAt(0) * 13}, 65%, 55%)`,
              }}
            >
              {row.original.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Avatar>
            <div>
              <p className="text-sm font-semibold text-slate-800 leading-tight">
                {row.original.name}
              </p>
              <p className="text-xs text-slate-400">{row.original.email}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "role",
        header: "Role",
        size: 130,
        Cell: ({ cell }) => <RoleChip value={cell.getValue<EmployeeRole>()} />,
        filterVariant: "select",
        filterSelectOptions: ROLES,
      },
      {
        accessorKey: "department",
        header: "Department",
        size: 140,
        filterVariant: "select",
        filterSelectOptions: DEPTS,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 120,
        Cell: ({ cell }) => <StatusChip value={cell.getValue<EmployeeStatus>()} />,
        filterVariant: "select",
        filterSelectOptions: STATUSES,
      },
      {
        accessorKey: "salary",
        header: "Salary",
        size: 120,
        Cell: ({ cell }) => (
          <span className="font-semibold text-emerald-600">
            ${cell.getValue<number>().toLocaleString()}
          </span>
        ),
      },
      {
        accessorKey: "performance",
        header: "Performance",
        size: 150,
        Cell: ({ cell }) => <PerfBar value={cell.getValue<number>()} />,
      },
      {
        accessorKey: "location",
        header: "Location",
        size: 130,
        filterVariant: "select",
        filterSelectOptions: LOCS,
      },
      {
        accessorKey: "joined",
        header: "Joined",
        size: 130,
        Cell: ({ cell }) => (
          <span className="text-slate-500 text-xs">{cell.getValue<string>()}</span>
        ),
      },
    ],
    [],
  );

  const table = useMaterialReactTable<Employee>({
    columns,
    data,
    enableRowSelection: true,
    enableMultiRowSelection: true,
    enableColumnFilters: true,
    enableGlobalFilter: true,
    enableSorting: true,
    enablePagination: true,
    enableColumnResizing: true,
    enableColumnOrdering: true,
    enableStickyHeader: true,
    enableDensityToggle: true,
    enableHiding: true,
    enableFullScreenToggle: true,
    enableColumnPinning: true,
    enableGrouping: true,
    state: { globalFilter, rowSelection },
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: { pageSize: 10, pageIndex: 0 },
      density: "comfortable",
      columnPinning: { left: ["mrt-row-select", "name"] },
    },

    renderTopToolbar: ({ table }) => (
      <div className="flex flex-col gap-3 px-4 pt-4 pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">Employee Directory</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {data.length} total
              {selectedCount > 0 && ` · ${selectedCount} selected`}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {selectedCount > 0 && (
              <CustomButton
                variant="danger"
                size="sm"
                startIcon={<DeleteIcon fontSize="small" />}
                loading={isLoading}
                onClick={handleDeleteSelected}
              >
                Delete ({selectedCount})
              </CustomButton>
            )}
            <CustomButton
              variant="ghost"
              size="sm"
              startIcon={<FileDownloadIcon fontSize="small" />}
              onClick={handleExport}
            >
              Export CSV
            </CustomButton>
            <CustomButton variant="primary" size="sm" startIcon={<AddIcon fontSize="small" />}>
              Add Employee
            </CustomButton>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex-1 min-w-[220px] max-w-sm">
            <CustomInput
              value={globalFilter ?? ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGlobalFilter(e.target.value)}
              placeholder="Search employees..."
              startIcon={<SearchIcon fontSize="small" />}
              size="small"
            />
          </div>
          <div className="flex items-center gap-1 ml-auto">
            {table.options.renderToolbarInternalActions?.({ table })}
          </div>
        </div>
      </div>
    ),

    enableRowActions: true,
    positionActionsColumn: "last",
    renderRowActions: ({ row }) => (
      <div className="flex items-center gap-0.5">
        <Tooltip title="View">
          <IconButton size="small" className="!text-slate-400 hover:!text-sky-500">
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
          <IconButton size="small" className="!text-slate-400 hover:!text-indigo-500">
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            size="small"
            className="!text-slate-400 hover:!text-red-500"
            onClick={() => handleDeleteRow(row.original.id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
    ),

    renderBottomToolbarCustomActions: () => (
      <div className="flex items-center gap-4 text-xs text-slate-500 px-2 py-1">
        <span>
          Avg Salary: <strong className="text-emerald-600">${avgSalary.toLocaleString()}</strong>
        </span>
        <span>
          Active: <strong className="text-green-600">{activeCount}</strong>
        </span>
        <span>
          Avg Performance: <strong className="text-indigo-600">{avgPerformance}%</strong>
        </span>
      </div>
    ),

    muiTableContainerProps: { sx: { maxHeight: "60vh" } },
    muiTableHeadCellProps: { sx: { fontFamily: "inherit" } },
    muiTableBodyCellProps: { sx: { fontFamily: "inherit" } },
  });

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 p-6">
        <ThemeProvider theme={tableTheme}>
          <MaterialReactTable table={table} />
        </ThemeProvider>
      </div>
    </>
  );
}
