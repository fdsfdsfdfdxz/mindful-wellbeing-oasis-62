
import React from "react";
import { CalendarIcon, Clock } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { translate } from "@/utils/translations";
import { UseFormReturn } from "react-hook-form";
import { AppointmentFormValues } from "../schemas/appointmentFormSchema";

interface DateTimeFieldsProps {
  form: UseFormReturn<AppointmentFormValues>;
  language: string;
}

export const DateTimeFields = ({ form, language }: DateTimeFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="date"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {translate("doctorChat", "appointmentDate", language) || "Appointment Date"}
            </FormLabel>
            <FormControl>
              <div className="relative">
                <CalendarIcon className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                <Input
                  type="date"
                  className="pl-10"
                  {...field}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="time"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {translate("doctorChat", "appointmentTime", language) || "Appointment Time"}
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Clock className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                <Input
                  type="time"
                  className="pl-10"
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
