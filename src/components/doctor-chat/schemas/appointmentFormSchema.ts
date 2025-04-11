
import { z } from "zod";
import { translate } from "@/utils/translations";

export const createAppointmentFormSchema = (language: string) => {
  return z.object({
    date: z.string().min(1, {
      message: translate("doctorChat", "dateRequired", language) || "Date is required",
    }),
    time: z.string().min(1, {
      message: translate("doctorChat", "timeRequired", language) || "Time is required",
    }),
    reason: z.string().min(10, {
      message: translate("doctorChat", "reasonTooShort", language) || "Reason must be at least 10 characters",
    }),
    type: z.enum(["video", "phone", "inPerson"], {
      required_error: translate("doctorChat", "typeRequired", language) || "Appointment type is required",
    }),
  });
};

export type AppointmentFormValues = z.infer<ReturnType<typeof createAppointmentFormSchema>>;
