import { Chip, useTheme } from "@mui/material";
import { TripStatus } from "../data/trips";
import { CheckCircle, Cancel, DirectionsCar } from "@mui/icons-material";

interface StatusChipProps {
  status: TripStatus;
}

const statusConfig: Record<
  TripStatus,
  { color: "success" | "info" | "error"; icon: React.ReactElement }
> = {
  Active: {
    color: "success",
    icon: <DirectionsCar sx={{ fontSize: 16, ml: 0.5 }} />,
  },
  Completed: {
    color: "info",
    icon: <CheckCircle sx={{ fontSize: 16, ml: 0.5 }} />,
  },
  Cancelled: {
    color: "error",
    icon: <Cancel sx={{ fontSize: 16, ml: 0.5 }} />,
  },
};

export default function StatusChip({ status }: StatusChipProps) {
  const theme = useTheme();
  const config = statusConfig[status];

  return (
    <Chip
      label={status}
      color={config.color}
      size="medium"
      icon={config.icon}
      sx={{
        fontWeight: 600,
        px: 1,
        py: 2.5,
        borderRadius: 2,
        boxShadow: `0 2px 8px ${theme.palette[config.color].main}30`,
        "& .MuiChip-label": {
          px: 1,
        },
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
          // boxShadow: `0 4px 12px ${theme.palette[config.color].main}50`,
        },
      }}
    />
  );
}

