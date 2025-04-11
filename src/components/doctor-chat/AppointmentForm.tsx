
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { createAppointmentFormSchema, AppointmentFormValues } from "./schemas/appointmentFormSchema";
import { DateTimeFields } from "./appointment-form/DateTimeFields";
import { AppointmentTypeField } from "./appointment-form/AppointmentTypeField";
import { ReasonField } from "./appointment-form/ReasonField";
import { translate } from "@/utils/translations";
import { getDefaultAppointmentValues, resetAppointmentForm } from "./utils/formUtils";

interface AppointmentFormProps {
  onSubmit: (data: {
    date: string;
    time: string;
    reason: string;
    type: "video" | "phone" | "inPerson";
  }) => void;
}

export const AppointmentForm = ({ onSubmit }: AppointmentFormProps) => {
  const { language } = useLanguage();
  
  const appointmentFormSchema = createAppointmentFormSchema(language);
  const defaultValues = getDefaultAppointmentValues();

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues,
  });

  const handleSubmit = (values: AppointmentFormValues) => {
    onSubmit(values);
    resetAppointmentForm(form);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <DateTimeFields form={form} language={language} />
        <AppointmentTypeField form={form} language={language} />
        <ReasonField form={form} language={language} />

        <Button type="submit" className="w-full">
          <Calendar className="h-4 w-4 mr-2" />
          {translate("doctorChat", "requestAppointment", language) || "Request Appointment"}
        </Button>
      </form>
    </Form>
  );
};
