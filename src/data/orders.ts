import { MOTORCYCLES } from "./motorcycles";

export type OrderStatus = "active" | "completed" | "cancelled" | "pending";

export interface Order {
  id: string;
  motorcycleId: string;
  startDate: string;
  endDate: string;
  days: number;
  totalPrice: number;
  status: OrderStatus;
  paymentMethod: string;
  pickupLocation: string;
  bookedAt: string;
}

export const ORDERS: Order[] = [
  {
    id: "ORD-2024-001",
    motorcycleId: "yamaha-nmax-155",
    startDate: "2025-05-06",
    endDate: "2025-05-09",
    days: 3,
    totalPrice: 360000,
    status: "active",
    paymentMethod: "GoPay",
    pickupLocation: "Kuta Branch – Jl. Sunset Road No. 88",
    bookedAt: "2025-05-04",
  },
  {
    id: "ORD-2024-002",
    motorcycleId: "honda-vario-125",
    startDate: "2025-04-10",
    endDate: "2025-04-12",
    days: 2,
    totalPrice: 170000,
    status: "completed",
    paymentMethod: "Cash on Pickup",
    pickupLocation: "Seminyak Branch – Jl. Raya Seminyak No. 12",
    bookedAt: "2025-04-09",
  },
  {
    id: "ORD-2024-003",
    motorcycleId: "honda-pcx-160",
    startDate: "2025-03-20",
    endDate: "2025-03-25",
    days: 5,
    totalPrice: 550000,
    status: "completed",
    paymentMethod: "Bank Transfer",
    pickupLocation: "Ubud Branch – Jl. Monkey Forest No. 5",
    bookedAt: "2025-03-19",
  },
  {
    id: "ORD-2024-004",
    motorcycleId: "yamaha-aerox-155",
    startDate: "2025-02-14",
    endDate: "2025-02-16",
    days: 2,
    totalPrice: 260000,
    status: "cancelled",
    paymentMethod: "OVO",
    pickupLocation: "Canggu Branch – Jl. Batu Bolong No. 47",
    bookedAt: "2025-02-13",
  },
];

export function getOrderWithMoto(order: Order) {
  const moto = MOTORCYCLES.find((m) => m.id === order.motorcycleId);
  return { ...order, motorcycle: moto };
}

export const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; bgColor: string; textColor: string; dotColor: string }
> = {
  active: {
    label: "Active",
    bgColor: "#DCFCE7",
    textColor: "#15803D",
    dotColor: "#22C55E",
  },
  completed: {
    label: "Completed",
    bgColor: "#DBEAFE",
    textColor: "#1D4ED8",
    dotColor: "#3B82F6",
  },
  cancelled: {
    label: "Cancelled",
    bgColor: "#FEE2E2",
    textColor: "#DC2626",
    dotColor: "#EF4444",
  },
  pending: {
    label: "Pending",
    bgColor: "#FEF9C3",
    textColor: "#A16207",
    dotColor: "#EAB308",
  },
};
