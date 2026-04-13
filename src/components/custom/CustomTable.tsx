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
  enableExpanding?: boolean;
  enableColumnFilters?: boolean;
  enableGlobalFilter?: boolean;
  enableSorting?: boolean;
  enablePagination?: boolean;
  enableRowSelection?: boolean;
  manualFiltering?: boolean;
  bordered?: boolean;
  enableFullScreenToggle?: boolean;
  enableDensityToggle?: boolean;
  renderRowActions?: (props: any) => React.ReactNode;
  renderDetailPanel?: (props: any) => React.ReactNode;
  renderEmptyRowsFallback?: () => React.ReactNode;
  renderTopToolbarCustomActions?: () => React.ReactNode;
}

export function CustomTable<T extends MRT_RowData>({
  columns,
  data,
  isLoading = false,
  enableRowActions = false,
  enableExpanding = false,
  enableColumnFilters = true,
  enableSorting = true,
  enablePagination = true,
  enableRowSelection = true,
  enableGlobalFilter = true,
  manualFiltering = false,
  bordered = false,
  enableFullScreenToggle = false,
  enableDensityToggle = false,
  renderRowActions,
  renderDetailPanel,
  renderTopToolbarCustomActions,
  renderEmptyRowsFallback,
  ...tableProps
}: CustomTableProps<T>) {
  const borderColor = "var(--color-bg-elevated)";

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
      enableExpanding={enableExpanding}
      enableGlobalFilter={enableGlobalFilter}
      manualFiltering={manualFiltering}
      enableFullScreenToggle={enableFullScreenToggle}
      enableDensityToggle={enableDensityToggle}
      positionActionsColumn="last"
      muiTablePaperProps={{
        sx: () => ({
          borderRadius: 4,
          backgroundColor: "transparent !important",
          border: bordered ? `1px solid ${borderColor}` : "none",
        }),
      }}
      muiTableContainerProps={{
        sx: () => ({
          backgroundColor: "var(--color-bg-elevated) !important",
        }),
      }}
      // Header cells styling
      muiTableHeadCellProps={{
        sx: {
          fontWeight: "bold",
          borderRight: bordered ? `1px solid ${borderColor}` : "none",
          borderTop: bordered ? `1px solid ${borderColor}` : "none",
          borderBottom: "1px solid var(--color-border-subtle) !important",
        },
      }}
      // Body rows styling
      muiTableBodyProps={{
        sx: {
          "& .MuiTableRow-root": {
            backgroundColor: "var(--color-bg-elevated) !important",
            borderBottom: bordered ? `1px solid ${borderColor}` : "none",
          },
        },
      }}
      // Table cell borders
      muiTableBodyCellProps={{
        sx: {
          borderRight: bordered ? `1px solid ${borderColor}` : "none",
        },
      }}
      muiTableHeadRowProps={{
        sx: {
          backgroundColor: "var(--color-bg-elevated) !important",
        },
      }}
      muiBottomToolbarProps={{
        sx: {
          backgroundColor: "var(--color-bg-elevated) !important",
        },
      }}
      muiTopToolbarProps={{
        sx: {
          backgroundColor: "var(--color-bg-elevated) !important",
          borderBottom: "1px solid var(--color-border-subtle)",
        },
      }}
      // Initial State
      initialState={{
        pagination: { pageSize: 10, pageIndex: 0 },
        showColumnFilters: false,
      }}
      renderEmptyRowsFallback={renderEmptyRowsFallback}
      renderRowActions={renderRowActions}
      renderDetailPanel={renderDetailPanel}
      renderTopToolbarCustomActions={renderTopToolbarCustomActions}
    />
  );
}
