
import { Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TimeSelectorProps {
  timeSlots: string[];
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
  isTimeSlotAvailable?: (time: string) => boolean;
  label?: string;
  placeholder?: string;
  useButtons?: boolean;
  className?: string;
  disabled?: boolean;
}

const TimeSelector = ({
  timeSlots,
  selectedTime,
  onTimeSelect,
  isTimeSlotAvailable = () => true,
  label = "Select Time",
  placeholder = "Select a time",
  useButtons = true,
  className,
  disabled = false,
}: TimeSelectorProps) => {
  // If there are no available time slots, show a message
  const hasAvailableSlots = timeSlots.some(time => isTimeSlotAvailable(time));

  // Render time slots as buttons
  if (useButtons) {
    return (
      <div className={className}>
        {label && (
          <label className="block text-sm font-medium mb-2">
            {label}
          </label>
        )}
        
        {hasAvailableSlots ? (
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((time) => {
              const available = isTimeSlotAvailable(time);
              return (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  onClick={() => available && onTimeSelect(time)}
                  disabled={disabled || !available}
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
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            No available time slots for the selected date.
          </p>
        )}
      </div>
    );
  }
  
  // Render time slots as a dropdown
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium mb-2">
          {label}
        </label>
      )}
      
      <Select 
        value={selectedTime || ''} 
        onValueChange={onTimeSelect}
        disabled={disabled}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder}>
            {selectedTime ? (
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                {selectedTime}
              </div>
            ) : placeholder}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {hasAvailableSlots ? (
            timeSlots
              .filter(time => isTimeSlotAvailable(time))
              .map(time => (
                <SelectItem key={time} value={time}>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    {time}
                  </div>
                </SelectItem>
              ))
          ) : (
            <div className="text-center py-2 text-sm text-muted-foreground">
              No available time slots
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TimeSelector;
