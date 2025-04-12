
import { cn } from "@/lib/utils";

interface BookingStepsProps {
  bookingStep: number;
}

const BookingSteps = ({ bookingStep }: BookingStepsProps) => {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <div className={cn("flex h-6 w-6 items-center justify-center rounded-full", bookingStep >= 1 ? "bg-primary text-primary-foreground" : "border border-input")}>
        1
      </div>
      <span className={bookingStep >= 1 ? "font-medium text-foreground" : ""}>Select Time</span>
      <span className="mx-2">→</span>
      <div className={cn("flex h-6 w-6 items-center justify-center rounded-full", bookingStep >= 2 ? "bg-primary text-primary-foreground" : "border border-input")}>
        2
      </div>
      <span className={bookingStep >= 2 ? "font-medium text-foreground" : ""}>Confirm</span>
    </div>
  );
};

export default BookingSteps;
