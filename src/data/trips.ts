export type TripStatus = "Active" | "Completed" | "Cancelled";

export interface Trip {
  id: number;
  vehicle: string;
  source: string;
  destination: string;
  status: TripStatus;
}

export const trips: Trip[] = [
  { id: 1, vehicle: "PM-101", source: "A", destination: "B", status: "Active" },
  { id: 2, vehicle: "PM-102", source: "C", destination: "D", status: "Completed" },
  { id: 3, vehicle: "PM-103", source: "E", destination: "F", status: "Cancelled" },
  { id: 4, vehicle: "PM-104", source: "G", destination: "H", status: "Active" },
  { id: 5, vehicle: "PM-105", source: "I", destination: "J", status: "Active" },
  { id: 6, vehicle: "PM-106", source: "K", destination: "L", status: "Completed" },
  { id: 7, vehicle: "PM-107", source: "M", destination: "N", status: "Active" },
  { id: 8, vehicle: "PM-108", source: "O", destination: "P", status: "Completed" },
  { id: 9, vehicle: "PM-109", source: "Q", destination: "R", status: "Cancelled" },
  { id: 10, vehicle: "PM-110", source: "S", destination: "T", status: "Active" },
  { id: 11, vehicle: "PM-111", source: "U", destination: "V", status: "Completed" },
  { id: 12, vehicle: "PM-112", source: "W", destination: "X", status: "Active" },
  { id: 13, vehicle: "PM-113", source: "Y", destination: "Z", status: "Completed" },
  { id: 14, vehicle: "PM-114", source: "A", destination: "C", status: "Active" },
  { id: 15, vehicle: "PM-115", source: "B", destination: "D", status: "Cancelled" },
  { id: 16, vehicle: "PM-116", source: "E", destination: "G", status: "Completed" },
  { id: 17, vehicle: "PM-117", source: "F", destination: "H", status: "Active" },
  { id: 18, vehicle: "PM-118", source: "I", destination: "K", status: "Completed" },
  { id: 19, vehicle: "PM-119", source: "J", destination: "L", status: "Active" },
  { id: 20, vehicle: "PM-120", source: "M", destination: "O", status: "Cancelled" },
];

