
import React from "react";
import { Video, Phone, Calendar } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { translate } from "@/utils/translations";
import { UseFormReturn } from "react-hook-form";
import { AppointmentFormValues } from "../schemas/appointmentFormSchema";

interface AppointmentTypeFieldProps {
  form: UseFormReturn<AppointmentFormValues>;
  language: string;
}

export const AppointmentTypeField = ({ form, language }: AppointmentTypeFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {translate("doctorChat", "appointmentType", language) || "Appointment Type"}
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={
                  translate("doctorChat", "selectType", language) || "Select appointment type"
                } />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="video">
                <div className="flex items-center">
                  <Video className="h-4 w-4 mr-2" />
                  <span>{translate("doctorChat", "videoCall", language) || "Video Call"}</span>
                </div>
              </SelectItem>
              <SelectItem value="phone">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{translate("doctorChat", "phoneCall", language) || "Phone Call"}</span>
                </div>
              </SelectItem>
              <SelectItem value="inPerson">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{translate("doctorChat", "inPerson", language) || "In Person"}</span>
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
