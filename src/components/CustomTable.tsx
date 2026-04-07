/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_RowData,
} from "material-react-table";

interface CustomTableProps<T extends MRT_RowData> {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  isLoading?: boolean;
  enableRowActions?: boolean;
  enableColumnFilters?: boolean;
  enableGlobalFilter?: boolean;
  enableSorting?: boolean;
  enablePagination?: boolean;
  enableRowSelection?: boolean;
  manualFiltering?: boolean;
  renderRowActions?: (props: any) => React.ReactNode;
  renderTopToolbarCustomActions?: () => React.ReactNode;
}

export function CustomTable<T extends MRT_RowData>({
  columns,
  data,
  isLoading = false,
  enableRowActions = false,
  enableColumnFilters = true,
  enableSorting = true,
  enablePagination = true,
  enableRowSelection = true,
  enableGlobalFilter = true,
  manualFiltering = false,
  renderRowActions,
  renderTopToolbarCustomActions,
  ...tableProps
}: CustomTableProps<T>) {
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      state={{ isLoading }}
      {...tableProps}
      enableColumnFilters={enableColumnFilters}
      enableSorting={enableSorting}
      enablePagination={enablePagination}
      enableRowSelection={enableRowSelection}
      enableRowActions={enableRowActions}
      enableGlobalFilter={enableGlobalFilter}
      manualFiltering={manualFiltering}
      positionActionsColumn="last"
      muiTablePaperProps={{
        elevation: 0,
        sx: {
          borderRadius: "12px",
        },
      }}
      muiTableHeadCellProps={{
        sx: () => ({
          fontWeight: "bold",
        }),
      }}
      // ⚡ Row Actions (optional)
      renderRowActions={renderRowActions}
      // Initial State
      initialState={{
        pagination: { pageSize: 5, pageIndex: 0 },
        showColumnFilters: true,
      }}
      // Toolbar
      renderTopToolbarCustomActions={renderTopToolbarCustomActions}
    />
  );
}
