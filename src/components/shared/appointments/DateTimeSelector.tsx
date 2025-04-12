
import DateSelector from "./DateSelector";
import TimeSelector from "./TimeSelector";
import { ReactNode } from "react";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface DateTimeSelectorProps {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  selectedTime: string | null;
  onTimeChange: (time: string) => void;
  timeSlots: string[];
  isTimeSlotAvailable?: (time: string) => boolean;
  dateLabel?: string;
  timeLabel?: string;
  datePlaceholder?: string;
  timePlaceholder?: string;
  dateCardTitle?: string;
  timeCardTitle?: string;
  timeCardDescription?: ReactNode;
  useButtons?: boolean;
  className?: string;
}

const DateTimeSelector = ({
  selectedDate,
  onDateChange,
  selectedTime,
  onTimeChange,
  timeSlots,
  isTimeSlotAvailable = () => true,
  dateLabel = "Select Date",
  timeLabel = "Select Time",
  datePlaceholder = "Select a date",
  timePlaceholder = "Select a time",
  dateCardTitle = "Select Date",
  timeCardTitle = "Select Time",
  timeCardDescription,
  useButtons = true,
  className,
}: DateTimeSelectorProps) => {
  return (
    <div className={`grid md:grid-cols-2 gap-8 ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle>{dateCardTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <DateSelector 
            selectedDate={selectedDate}
            onDateChange={onDateChange}
            label={dateLabel}
            placeholder={datePlaceholder}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>{timeCardTitle}</CardTitle>
          {timeCardDescription || selectedDate ? (
            <CardDescription>
              {timeCardDescription || (
                selectedDate 
                  ? `Available times for ${selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}` 
                  : "Please select a date first"
              )}
            </CardDescription>
          ) : null}
        </CardHeader>
        <CardContent>
          <TimeSelector 
            timeSlots={timeSlots}
            selectedTime={selectedTime}
            onTimeSelect={onTimeChange}
            isTimeSlotAvailable={isTimeSlotAvailable}
            label={timeLabel}
            placeholder={timePlaceholder}
            useButtons={useButtons}
            disabled={!selectedDate}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default DateTimeSelector;
