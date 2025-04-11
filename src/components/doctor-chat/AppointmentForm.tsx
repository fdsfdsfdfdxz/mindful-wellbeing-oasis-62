
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar as CalendarIcon, Clock, Video, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";

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
  
  const appointmentFormSchema = z.object({
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

  type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      time: "10:00",
      reason: "",
      type: "video",
    },
  });

  const handleSubmit = (values: AppointmentFormValues) => {
    onSubmit(values);
    
    // Create a properly typed object with non-optional properties for reset
    const resetValues: AppointmentFormValues = {
      date: new Date().toISOString().split("T")[0],
      time: "10:00",
      reason: "",
      type: "video",
    };
    
    form.reset(resetValues);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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

        <Button type="submit" className="w-full">
          <Calendar className="h-4 w-4 mr-2" />
          {translate("doctorChat", "requestAppointment", language) || "Request Appointment"}
        </Button>
      </form>
    </Form>
  );
};
