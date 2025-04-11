
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { translate } from "@/utils/translations";
import { UseFormReturn } from "react-hook-form";
import { AppointmentFormValues } from "../schemas/appointmentFormSchema";

// Ensure Language type matches translations utility
type Language = 'en' | 'ar';

interface ReasonFieldProps {
  form: UseFormReturn<AppointmentFormValues>;
  language: string;
}

export const ReasonField = ({ form, language }: ReasonFieldProps) => {
  // Ensure language is a valid Language type
  const safeLanguage = (language === 'en' || language === 'ar') ? language as Language : 'en';
  
  return (
    <FormField
      control={form.control}
      name="reason"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {translate("doctorChat", "appointmentReason", safeLanguage) || "Reason for Appointment"}
          </FormLabel>
          <FormControl>
            <Textarea
              placeholder={
                translate("doctorChat", "reasonPlaceholder", safeLanguage) ||
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
