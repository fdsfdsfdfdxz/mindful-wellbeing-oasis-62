
import { Button } from "@/components/ui/button";
import BookingSteps from "./BookingSteps";

interface NavigationHeaderProps {
  bookingStep: number;
  goBack: () => void;
}

const NavigationHeader = ({ bookingStep, goBack }: NavigationHeaderProps) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <Button 
        variant="ghost" 
        onClick={goBack}
        className="flex items-center gap-2"
      >
        ← Back
      </Button>
      
      <BookingSteps bookingStep={bookingStep} />
    </div>
  );
};

export default NavigationHeader;
