
import React from "react";
import { AppointmentList } from "@/components/doctor-chat/AppointmentList";
import { useLanguage } from "@/contexts/LanguageContext";
import { Appointment } from "@/types/appointment";

interface AppointmentsContentProps {
  appointments: Appointment[];
  onJoinCall: (appointmentId: number) => void;
  onScheduleAppointment: () => void;
}

export const AppointmentsContent: React.FC<AppointmentsContentProps> = ({
  appointments,
  onJoinCall,
  onScheduleAppointment
}) => {
  const { language } = useLanguage();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">
        {language === 'ar' ? "مواعيدي" : "My Appointments"}
      </h2>
      <AppointmentList 
        appointments={appointments}
        onJoinCall={onJoinCall}
        onScheduleAppointment={onScheduleAppointment}
      />
    </div>
  );
};
