import { useState, useEffect, useCallback } from "react";
import { Trip, TripStatus } from "../data/trips";
import { fetchTrips, createTrip, updateTrip, deleteTrip } from "../services/api";

interface UseTripsReturn {
  trips: Trip[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  addTrip: (trip: Omit<Trip, "id">) => Promise<void>;
  editTrip: (id: number, trip: Partial<Trip>) => Promise<void>;
  removeTrip: (id: number) => Promise<void>;
}

interface UseTripsOptions {
  status?: TripStatus;
}

export const useTrips = (options?: UseTripsOptions): UseTripsReturn => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const status = options?.status;

  const loadTrips = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTrips(status);
      setTrips(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch trips");
      console.error("Error loading trips:", err);
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    loadTrips();
  }, [loadTrips]);

  const addTrip = useCallback(async (trip: Omit<Trip, "id">) => {
    try {
      setError(null);
      const newTrip = await createTrip(trip);
      setTrips((prev) => [...prev, newTrip]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create trip");
      throw err;
    }
  }, []);

  const editTrip = useCallback(async (id: number, trip: Partial<Trip>) => {
    try {
      setError(null);
      const updatedTrip = await updateTrip(id, trip);
      setTrips((prev) => prev.map((t) => (t.id === id ? updatedTrip : t)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update trip");
      throw err;
    }
  }, []);

  const removeTrip = useCallback(async (id: number) => {
    try {
      setError(null);
      await deleteTrip(id);
      setTrips((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete trip");
      throw err;
    }
  }, []);

  return {
    trips,
    loading,
    error,
    refetch: loadTrips,
    addTrip,
    editTrip,
    removeTrip,
  };
};

