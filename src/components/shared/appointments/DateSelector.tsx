
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateSelectorProps {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  label?: string;
  placeholder?: string;
  minDate?: Date;
  disabledDates?: (date: Date) => boolean;
  className?: string;
}

const DateSelector = ({
  selectedDate,
  onDateChange,
  label = "Select Date",
  placeholder = "Select a date",
  minDate = new Date(),
  disabledDates,
  className,
}: DateSelectorProps) => {
  const handleDateSelect = (date: Date | undefined) => {
    onDateChange(date);
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium mb-2">
          {label}
        </label>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? format(selectedDate, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            initialFocus
            disabled={(date) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              
              // Default disabled dates (past dates)
              const isPastDate = date < today;
              
              // If custom disabled dates function is provided, use it in addition to default behavior
              return isPastDate || (disabledDates ? disabledDates(date) : false);
            }}
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateSelector;
