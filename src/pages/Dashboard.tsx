import { useState, useMemo, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Paper,
  useTheme,
  CircularProgress,
  Alert,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import { DirectionsCar, CheckCircle, Cancel, TrendingUp, Refresh, Search } from "@mui/icons-material";
import { useTrips } from "../hooks/useTrips";
import { fetchTrips } from "../services/api";
import { Trip } from "../data/trips";
import TripTable from "../components/TripTable";
import StatusFilter, { FilterValue } from "../components/StatusFilter";

export default function Dashboard() {
  const [filter, setFilter] = useState<FilterValue>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [allTripsForStats, setAllTripsForStats] = useState<Trip[]>([]);
  const [statsLoaded, setStatsLoaded] = useState(false);
  const theme = useTheme();
  
  // Convert "All" to undefined for API call
  const statusFilter = filter === "All" ? undefined : filter;
  const { trips, loading, error, refetch } = useTrips({ status: statusFilter });

  // Fetch all trips once for stats (only on initial mount)
  useEffect(() => {
    if (!statsLoaded) {
      const loadStats = async () => {
        try {
          const data = await fetchTrips(); // Fetch all trips without filter
          setAllTripsForStats(data);
          setStatsLoaded(true);
        } catch (err) {
          console.error("Error loading stats:", err);
        }
      };
      loadStats();
    }
  }, [statsLoaded]);

  // Filter trips by search query (vehicle, source, or destination)
  const filteredTrips = useMemo(() => {
    if (!searchQuery.trim()) {
      return trips;
    }
    const query = searchQuery.toLowerCase().trim();
    return trips.filter(
      (trip) =>
        trip.vehicle.toLowerCase().includes(query) ||
        trip.source.toLowerCase().includes(query) ||
        trip.destination.toLowerCase().includes(query)
    );
  }, [trips, searchQuery]);

  // Calculate stats from all trips (not filtered)
  const stats = useMemo(() => {
    const total = allTripsForStats.length;
    const active = allTripsForStats.filter((t) => t.status === "Active").length;
    const completed = allTripsForStats.filter((t) => t.status === "Completed").length;
    const cancelled = allTripsForStats.filter((t) => t.status === "Cancelled").length;
    return { total, active, completed, cancelled };
  }, [allTripsForStats]);

  const StatCard = ({
    id,
    title,
    value,
    icon,
    color,
  }: {
    id?: string;
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
  }) => (
    <Card
      id={id}
      sx={{
        height: "100%",
        background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
        border: `1px solid ${color}30`,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `0 8px 24px ${color}30`,
        },
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h4" fontWeight="bold" color={color}>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              {title}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: `${color}20`,
              color: color,
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #f1f1f1 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Paper
          id="dashboard-header"
          elevation={0}
          sx={{
            p: 3,
            mb: 1,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            borderRadius: 3,
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={0.5}>
            <Box display="flex" alignItems="center" gap={2}>
              <DirectionsCar sx={{ fontSize: 40, color: theme.palette.primary.main }} />
              <Box>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Trip Management Dashboard
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Monitor and manage all your vehicle trips in one place
                </Typography>
              </Box>
            </Box>
            <IconButton
              id="refresh-button"
              onClick={refetch}
              disabled={loading}
              sx={{
                bgcolor: theme.palette.primary.main,
                color: "white",
                "&:hover": {
                  bgcolor: theme.palette.primary.dark,
                },
                "&:disabled": {
                  bgcolor: theme.palette.action.disabledBackground,
                },
              }}
            >
              <Refresh sx={{ animation: loading ? "spin 1s linear infinite" : "none" }} />
            </IconButton>
          </Box>
        </Paper>

        {/* Error Alert */}
        {error && (
          <Alert
            id="error-alert"
            severity="error"
            sx={{ mb: 3 }}
            action={
              <IconButton
                id="error-retry-button"
                aria-label="retry"
                color="inherit"
                size="small"
                onClick={refetch}
              >
                <Refresh />
              </IconButton>
            }
          >
            {error}
          </Alert>
        )}

        {/* Loading State */}
        {loading && trips.length === 0 ? (
          <Paper
            id="loading-container"
            elevation={0}
            sx={{
              p: 8,
              textAlign: "center",
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              borderRadius: 3,
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <CircularProgress id="loading-spinner" size={60} sx={{ mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              Loading trips...
            </Typography>
          </Paper>
        ) : (
          <>

        {/* Statistics Cards */}
        <Box
          id="statistics-cards"
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 3,
            mb: 4,
          }}
        >
          <StatCard
            id="stat-card-total"
            title="Total Trips"
            value={stats.total}
            icon={<TrendingUp sx={{ fontSize: 32 }} />}
            color={theme.palette.primary.main}
          />
          <StatCard
            id="stat-card-active"
            title="Active Trips"
            value={stats.active}
            icon={<DirectionsCar sx={{ fontSize: 32 }} />}
            color={theme.palette.success.main}
          />
          <StatCard
            id="stat-card-completed"
            title="Completed"
            value={stats.completed}
            icon={<CheckCircle sx={{ fontSize: 32 }} />}
            color={theme.palette.info.main}
          />
          <StatCard
            id="stat-card-cancelled"
            title="Cancelled"
            value={stats.cancelled}
            icon={<Cancel sx={{ fontSize: 32 }} />}
            color={theme.palette.error.main}
          />
        </Box>

        {/* Filter and Table */}
        <Paper
          id="filter-table-container"
          elevation={0}
          sx={{
            p: 3,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            borderRadius: 3,
            // border: "1px solid rgba(255, 255, 255, 0.3)",
            // mb: 0,
          }}
        >
          <Box>
            <Typography id="filter-trips-heading" variant="h6" fontWeight="600" mb={2} textAlign="center">
              Filter Trips
            </Typography>
            
            {/* Filter Row: Status Buttons on Left, Search on Right */}
            <Box
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              alignItems={{ xs: "stretch", md: "center" }}
              justifyContent="space-between"
              gap={2}
              mb={3}
            >
              {/* Status Filter Buttons - Left Side */}
              <Box
                display="flex"
                justifyContent={{ xs: "center", md: "flex-start" }}
                flex={1}
              >
                <StatusFilter value={filter} onChange={setFilter} />
              </Box>
              
              {/* Search Field - Right Side */}
              <Box sx={{ maxWidth: { xs: "100%", md: 400 }, width: "100%" }}>
                <TextField
                  id="search-trips"
                  fullWidth
                  placeholder="Search by vehicle, source, or destination..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 1)",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "rgba(255, 255, 255, 1)",
                      },
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography id="trip-details-heading" variant="h6" fontWeight="600" textAlign={"center"}>
              Trip Details
            </Typography>
            {loading ? (
              <Box id="trip-table-loading" display="flex" justifyContent="center" alignItems="center" minHeight={200}>
                <CircularProgress id="trip-table-spinner" />
              </Box>
            ) : (
              <TripTable rows={filteredTrips} />
            )}
          </Box>
        </Paper>
          </>
        )}
      </Container>
    </Box>
  );
}

