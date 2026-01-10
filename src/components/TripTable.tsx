import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, useTheme } from "@mui/material";
import { Trip } from "../data/trips";
import StatusChip from "./StatusChip";

interface TripTableProps {
  rows: Trip[];
}

export default function TripTable({ rows }: TripTableProps) {
  const theme = useTheme();

  const columns: GridColDef<Trip>[] = [
    {
      field: "vehicle",
      headerName: "Vehicle",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box
          sx={{
            fontWeight: 600,
            color: theme.palette.primary.main,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: theme.palette.primary.main,
            }}
          />
          {params.value}
        </Box>
      ),
    },
    {
      field: "source",
      headerName: "Source",
      flex: 1,
      minWidth: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "destination",
      headerName: "Destination",
      flex: 1,
      minWidth: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params: GridRenderCellParams<Trip, Trip["status"]>) => {
        if (!params.value) return null;
        return <StatusChip status={params.value} />;
      },
    },
  ];

  return (
    <Box
      id="trip-table-container"
      sx={{
        height: 500,
        width: "100%",
        "& .MuiDataGrid-root": {
          border: "none",
          borderRadius: 2,
        },
        "& .MuiDataGrid-cell": {
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: theme.palette.mode === "dark" 
            ? "rgba(255, 255, 255, 0.05)" 
            : "rgba(0, 0, 0, 0.02)",
          borderBottom: `2px solid ${theme.palette.primary.main}`,
          fontWeight: 600,
          fontSize: "0.95rem",
        },
        "& .MuiDataGrid-row": {
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(0, 0, 0, 0.02)",
            transform: "scale(1.01)",
          },
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 25, 50]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
        sx={{
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-columnHeader:focus": {
            outline: "none",
          },
        }}
      />
    </Box>
  );
}

