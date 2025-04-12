
import { cn } from "@/lib/utils";

interface BookingStepsProps {
  currentStep: number;
  steps: { id: number; label: string }[];
  className?: string;
}

const BookingSteps = ({
  currentStep,
  steps,
  className
}: BookingStepsProps) => {
  return (
    <div className={cn("flex items-center gap-2 text-sm text-muted-foreground", className)}>
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div 
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full",
              currentStep >= step.id ? "bg-primary text-primary-foreground" : "border border-input"
            )}
          >
            {step.id}
          </div>
          <span className={currentStep >= step.id ? "ml-2 font-medium text-foreground" : "ml-2"}>
            {step.label}
          </span>
          
          {index < steps.length - 1 && (
            <span className="mx-2">→</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default BookingSteps;
