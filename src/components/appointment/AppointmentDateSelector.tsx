
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

interface AppointmentDateSelectorProps {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  setSelectedTime: (time: string | null) => void;
}

const AppointmentDateSelector = ({
  selectedDate,
  setSelectedDate,
  setSelectedTime,
}: AppointmentDateSelectorProps) => {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? format(selectedDate, "PPP") : <span>Select a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              setSelectedDate(date);
              // Reset time selection when date changes
              setSelectedTime(null);
            }}
            initialFocus
            disabled={(date) => date < new Date()}
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AppointmentDateSelector;
