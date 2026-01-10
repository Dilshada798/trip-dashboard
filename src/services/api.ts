import { Trip } from "../data/trips";
import { trips as mockTrips } from "../data/trips";

/**
 * Simulates network delay for realistic UX
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// In-memory storage for mock data (allows CRUD operations)
let tripsData: Trip[] = [...mockTrips];

/**
 * Fetch trips with optional status filter (using mock data)
 */
export const fetchTrips = async (status?: "Active" | "Completed" | "Cancelled"): Promise<Trip[]> => {
  await delay(500); // Simulate network delay
  
  if (status) {
    return tripsData.filter((trip) => trip.status === status);
  }
  return [...tripsData];
};

/**
 * Fetch a single trip by ID (using mock data)
 */
export const fetchTripById = async (id: number): Promise<Trip> => {
  await delay(300);
  const trip = tripsData.find((t) => t.id === id);
  if (!trip) {
    throw new Error(`Trip with id ${id} not found`);
  }
  return trip;
};

/**
 * Create a new trip (using mock data)
 */
export const createTrip = async (trip: Omit<Trip, "id">): Promise<Trip> => {
  await delay(400);
  const newTrip: Trip = {
    ...trip,
    id: tripsData.length > 0 ? Math.max(...tripsData.map((t) => t.id)) + 1 : 1,
  };
  tripsData.push(newTrip);
  return newTrip;
};

/**
 * Update an existing trip (using mock data)
 */
export const updateTrip = async (id: number, trip: Partial<Trip>): Promise<Trip> => {
  await delay(400);
  const index = tripsData.findIndex((t) => t.id === id);
  if (index === -1) {
    throw new Error(`Trip with id ${id} not found`);
  }
  const updatedTrip = { ...tripsData[index], ...trip };
  tripsData[index] = updatedTrip;
  return updatedTrip;
};

/**
 * Delete a trip (using mock data)
 */
export const deleteTrip = async (id: number): Promise<void> => {
  await delay(300);
  const index = tripsData.findIndex((t) => t.id === id);
  if (index === -1) {
    throw new Error(`Trip with id ${id} not found`);
  }
  tripsData.splice(index, 1);
};

