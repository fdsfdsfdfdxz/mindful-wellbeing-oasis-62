
import { BookingSteps as SharedBookingSteps } from "@/components/shared/appointments";
import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingStepsProps {
  bookingStep: number;
}

const BookingSteps = ({ bookingStep }: BookingStepsProps) => {
  const steps = [
    { id: 1, label: "Select Time" },
    { id: 2, label: "Confirm" }
  ];
  
  const progressValue = ((bookingStep - 1) / (steps.length - 1)) * 100;
  
  return (
    <div className="space-y-4">
      <SharedBookingSteps
        currentStep={bookingStep}
        steps={steps}
        className="mb-2"
      />
      
      <div className="space-y-2">
        <Progress value={progressValue} className="h-2" />
        
        <div className="flex justify-between">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              <div 
                className={cn(
                  "h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium",
                  bookingStep >= step.id 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                )}
              >
                {bookingStep > step.id ? <Check className="h-4 w-4" /> : step.id}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingSteps;
