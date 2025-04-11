
import { z } from "zod";
import { translate } from "@/utils/translations";

// Define the Language type to match what's in the translations utility
type Language = 'en' | 'ar';

export const createAppointmentFormSchema = (language: string) => {
  // Ensure language is a valid Language type
  const safeLanguage = (language === 'en' || language === 'ar') ? language as Language : 'en';
  
  return z.object({
    date: z.string().min(1, {
      message: translate("doctorChat", "dateRequired", safeLanguage) || "Date is required",
    }),
    time: z.string().min(1, {
      message: translate("doctorChat", "timeRequired", safeLanguage) || "Time is required",
    }),
    reason: z.string().min(10, {
      message: translate("doctorChat", "reasonTooShort", safeLanguage) || "Reason must be at least 10 characters",
    }),
    type: z.enum(["video", "phone", "inPerson"], {
      required_error: translate("doctorChat", "typeRequired", safeLanguage) || "Appointment type is required",
    }),
  });
};

export type AppointmentFormValues = z.infer<ReturnType<typeof createAppointmentFormSchema>>;
