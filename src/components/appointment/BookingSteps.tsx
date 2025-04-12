
import { BookingSteps as SharedBookingSteps } from "@/components/shared/appointments";

interface BookingStepsProps {
  bookingStep: number;
}

const BookingSteps = ({ bookingStep }: BookingStepsProps) => {
  const steps = [
    { id: 1, label: "Select Time" },
    { id: 2, label: "Confirm" }
  ];
  
  return (
    <SharedBookingSteps
      currentStep={bookingStep}
      steps={steps}
    />
  );
};

export default BookingSteps;
