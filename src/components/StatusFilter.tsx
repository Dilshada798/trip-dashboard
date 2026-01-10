import { ToggleButton, ToggleButtonGroup, useTheme } from "@mui/material";
import { AllInclusive, DirectionsCar, CheckCircle, Cancel } from "@mui/icons-material";

export type FilterValue = "All" | "Active" | "Completed" | "Cancelled";

interface StatusFilterProps {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
}

export default function StatusFilter({ value, onChange }: StatusFilterProps) {
  const theme = useTheme();

  const buttons = [
    { value: "All" as FilterValue, label: "All", icon: <AllInclusive sx={{ mr: 1 }} />, color: theme.palette.primary.main },
    { value: "Active" as FilterValue, label: "Active", icon: <DirectionsCar sx={{ mr: 1 }} />, color: theme.palette.success.main },
    { value: "Completed" as FilterValue, label: "Completed", icon: <CheckCircle sx={{ mr: 1 }} />, color: theme.palette.info.main },
    { value: "Cancelled" as FilterValue, label: "Cancelled", icon: <Cancel sx={{ mr: 1 }} />, color: theme.palette.error.main },
  ];

  return (
    <ToggleButtonGroup
      id="status-filter-group"
      value={value}
      exclusive
      onChange={(e, val) => {
        if (val !== null) {
          onChange(val as FilterValue);
        }
      }}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
        "& .MuiToggleButton-root": {
          px: 3,
          py: 1.5,
          borderRadius: 2,
          textTransform: "none",
          fontWeight: 600,
          border: "2px solid",
          borderColor: "divider",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: 2,
          },
          "&.Mui-selected": {
            color: "white",
            boxShadow: 3,
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: 4,
            },
          },
        },
      }}
    >
      {buttons.map((btn) => (
        <ToggleButton
          key={btn.value}
          id={`filter-${btn.value.toLowerCase()}`}
          value={btn.value}
          sx={{
            "&.Mui-selected": {
              background: `linear-gradient(135deg, ${btn.color} 0%, ${btn.color}dd 100%)`,
              borderColor: btn.color,
            },
          }}
        >
          {btn.icon}
          {btn.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

