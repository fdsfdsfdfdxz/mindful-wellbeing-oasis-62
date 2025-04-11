
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { translate } from "@/utils/translations";
import { UseFormReturn } from "react-hook-form";
import { AppointmentFormValues } from "../schemas/appointmentFormSchema";

interface ReasonFieldProps {
  form: UseFormReturn<AppointmentFormValues>;
  language: string;
}

export const ReasonField = ({ form, language }: ReasonFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="reason"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {translate("doctorChat", "appointmentReason", language) || "Reason for Appointment"}
          </FormLabel>
          <FormControl>
            <Textarea
              placeholder={
                translate("doctorChat", "reasonPlaceholder", language) ||
                "Briefly describe the reason for your appointment..."
              }
              className="min-h-[100px]"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
