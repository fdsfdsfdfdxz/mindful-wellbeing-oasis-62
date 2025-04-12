
import { Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AppointmentTimeSelectorProps {
  timeSlots: string[];
  selectedDate: Date | undefined;
  selectedTime: string | null;
  handleTimeSelect: (time: string) => void;
  isTimeSlotAvailable: (time: string) => boolean;
}

const AppointmentTimeSelector = ({
  timeSlots,
  selectedDate,
  selectedTime,
  handleTimeSelect,
  isTimeSlotAvailable,
}: AppointmentTimeSelectorProps) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {timeSlots.map((time) => {
        const available = isTimeSlotAvailable(time);
        return (
          <Button
            key={time}
            variant={selectedTime === time ? "default" : "outline"}
            onClick={() => available && handleTimeSelect(time)}
            disabled={!selectedDate || !available}
            className={cn(
              selectedTime === time ? "bg-primary hover:bg-primary/90" : "",
              "justify-start"
            )}
          >
            <Clock className="mr-2 h-4 w-4" />
            {time}
            {selectedTime === time && <CheckCircle className="ml-auto h-4 w-4" />}
          </Button>
        );
      })}
    </div>
  );
};

export default AppointmentTimeSelector;
