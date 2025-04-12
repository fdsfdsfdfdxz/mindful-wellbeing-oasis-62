
import { AppointmentConfirmation } from "@/components/shared/appointments";

interface AppointmentSummaryProps {
  practitioner: {
    name: string;
    rate: string;
  };
  selectedDate: Date | undefined;
  selectedTime: string | null;
  isLoading: boolean;
  goBack: () => void;
  handleBookAppointment: () => void;
}

const AppointmentSummary = ({
  practitioner,
  selectedDate,
  selectedTime,
  isLoading,
  goBack,
  handleBookAppointment,
}: AppointmentSummaryProps) => {
  return (
    <AppointmentConfirmation
      practitioner={practitioner}
      selectedDate={selectedDate}
      selectedTime={selectedTime}
      isLoading={isLoading}
      onCancel={goBack}
      onConfirm={handleBookAppointment}
      cancelLabel="Back to Selection"
    />
  );
};

export default AppointmentSummary;
