
import { Doctor } from "./doctor";

export interface Appointment {
  id: number;
  date: string;
  type: "video" | "phone" | "inPerson";
  status: "confirmed" | "pending" | "completed" | "cancelled";
  notes: string;
  doctor?: Doctor;
}

