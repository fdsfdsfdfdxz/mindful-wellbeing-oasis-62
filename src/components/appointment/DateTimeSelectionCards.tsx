
import { useState } from "react";
import { DateTimeSelector } from "@/components/shared/appointments";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Calendar, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface DateTimeSelectionCardsProps {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
  handleTimeSelect: (time: string) => void;
  isTimeSlotAvailable: (time: string) => boolean;
  timeSlots: string[];
}

const DateTimeSelectionCards = ({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  handleTimeSelect,
  isTimeSlotAvailable,
  timeSlots,
}: DateTimeSelectionCardsProps) => {
  const [isDateChanging, setIsDateChanging] = useState(false);

  const handleDateChange = (date: Date | undefined) => {
    setIsDateChanging(true);
    setSelectedDate(date);
    
    // Simulate loading state for better UX
    setTimeout(() => {
      setIsDateChanging(false);
    }, 500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        {selectedDate ? (
          <Badge variant="outline" className="py-2 px-3 flex items-center gap-2 bg-secondary">
            <Calendar className="h-4 w-4" />
            <span>{selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
            {selectedTime && (
              <>
                <span className="mx-1">•</span>
                <Clock className="h-4 w-4 ml-1" />
                <span>{selectedTime}</span>
              </>
            )}
            {selectedDate && selectedTime && (
              <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
            )}
          </Badge>
        ) : (
          <span className="text-sm text-muted-foreground">Select a date and time for your appointment</span>
        )}
      </div>

      <DateTimeSelector
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        selectedTime={selectedTime}
        onTimeChange={handleTimeSelect}
        timeSlots={timeSlots}
        isTimeSlotAvailable={isTimeSlotAvailable}
        useButtons={true}
        dateCardTitle="Select Appointment Date"
        timeCardTitle="Select Appointment Time"
        timeCardDescription={
          isDateChanging ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin inline" />
              Loading available times...
            </>
          ) : selectedDate ? (
            `Available times for ${selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`
          ) : (
            "Please select a date first"
          )
        }
        className={cn(
          "transition-opacity duration-300",
          isDateChanging ? "opacity-80 pointer-events-none" : "opacity-100"
        )}
      />

      {selectedDate && selectedTime && (
        <div className="bg-green-50 border border-green-200 rounded-md p-3 text-green-700 text-sm flex items-center animate-scale-in">
          <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
          Your appointment slot is available and ready to be confirmed!
        </div>
      )}
    </div>
  );
};

export default DateTimeSelectionCards;
