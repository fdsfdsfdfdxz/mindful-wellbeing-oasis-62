
import { AppointmentList } from "./AppointmentList";
import { Appointment } from "@/types/appointment";
import { BackButton } from "@/components/navigation/BackButton";

interface AppointmentsContentProps {
  appointments: Appointment[];
  onJoinCall: (appointmentId: number) => void;
  onScheduleAppointment: () => void;
}

export const AppointmentsContent = ({
  appointments,
  onJoinCall,
  onScheduleAppointment,
}: AppointmentsContentProps) => {
  return (
    <div className="space-y-6">
      <AppointmentList
        appointments={appointments}
        onJoinCall={onJoinCall}
        onScheduleAppointment={onScheduleAppointment}
      />
    </div>
  );
};
