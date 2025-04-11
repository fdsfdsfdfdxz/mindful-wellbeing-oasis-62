
import React from "react";
import { Video, Phone, Calendar } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { translate } from "@/utils/translations";
import { UseFormReturn } from "react-hook-form";
import { AppointmentFormValues } from "../schemas/appointmentFormSchema";

// Ensure Language type matches translations utility
type Language = 'en' | 'ar';

interface AppointmentTypeFieldProps {
  form: UseFormReturn<AppointmentFormValues>;
  language: string;
}

export const AppointmentTypeField = ({ form, language }: AppointmentTypeFieldProps) => {
  // Ensure language is a valid Language type
  const safeLanguage = (language === 'en' || language === 'ar') ? language as Language : 'en';
  
  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {translate("doctorChat", "appointmentType", safeLanguage) || "Appointment Type"}
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={
                  translate("doctorChat", "selectType", safeLanguage) || "Select appointment type"
                } />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="video">
                <div className="flex items-center">
                  <Video className="h-4 w-4 mr-2" />
                  <span>{translate("doctorChat", "videoCall", safeLanguage) || "Video Call"}</span>
                </div>
              </SelectItem>
              <SelectItem value="phone">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{translate("doctorChat", "phoneCall", safeLanguage) || "Phone Call"}</span>
                </div>
              </SelectItem>
              <SelectItem value="inPerson">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{translate("doctorChat", "inPerson", safeLanguage) || "In Person"}</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
