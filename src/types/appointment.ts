
import { Doctor } from "./doctor";

export interface Appointment {
  id: number;
  date: string;
  time?: string;
  type: "video" | "phone" | "inPerson";
  status: "confirmed" | "pending" | "completed" | "cancelled" | "waitlisted";
  notes: string;
  doctor?: Doctor;
  timezone?: string;
  sendReminders?: boolean;
  remindersSent?: {
    dayBefore?: boolean;
    hourBefore?: boolean;
  }
}

export interface AppointmentAvailability {
  doctorId: string;
  date: string;
  availableSlots: string[];
  unavailableSlots: string[];
}
