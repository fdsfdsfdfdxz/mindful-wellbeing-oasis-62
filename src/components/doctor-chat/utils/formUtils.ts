
import { UseFormReturn } from "react-hook-form";
import { AppointmentFormValues } from "../schemas/appointmentFormSchema";

/**
 * Gets default appointment form values
 */
export const getDefaultAppointmentValues = (): AppointmentFormValues => {
  return {
    date: new Date().toISOString().split("T")[0],
    time: "10:00",
    reason: "",
    type: "video",
  };
};

/**
 * Resets the appointment form with default values
 */
export const resetAppointmentForm = (
  form: UseFormReturn<AppointmentFormValues>
): void => {
  const defaultValues = getDefaultAppointmentValues();
  form.reset(defaultValues);
};

/**
 * Get minimum date allowed for appointment (today)
 */
export const getMinAppointmentDate = (): string => {
  return new Date().toISOString().split("T")[0];
};
