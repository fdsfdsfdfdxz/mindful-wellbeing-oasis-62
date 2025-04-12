
import React from "react";
import { CalendarIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format, addDays, isEqual, isBefore } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { getBadgeText } from "./utils";

interface DateTimeSelectorProps {
  date: Date | undefined;
  time: string;
  availableTimeSlots: string[];
  onDateChange: (date: Date | undefined) => void;
  onTimeChange: (time: string) => void;
  isWaitlisted: boolean;
  onJoinWaitlist: () => void;
  language: string;
}

export const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({
  date,
  time,
  availableTimeSlots,
  onDateChange,
  onTimeChange,
  isWaitlisted,
  onJoinWaitlist,
  language
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Date Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          {language === 'ar' ? "تاريخ الموعد" : "Appointment Date"} <span className="text-red-500">*</span>
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : language === 'ar' ? "اختر التاريخ" : "Select date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={onDateChange}
              initialFocus
              className="p-3 pointer-events-auto"
              disabled={(date) => {
                // Disable past dates and weekends
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const day = date.getDay();
                return isBefore(date, today) || day === 0 || day === 6 || isEqual(date, addDays(today, 60));
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Time Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          {language === 'ar' ? "وقت الموعد" : "Appointment Time"} <span className="text-red-500">*</span>
        </label>
        <Select
          value={time}
          onValueChange={onTimeChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={language === 'ar' ? "اختر الوقت" : "Select time"}>
              {time ? (
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  {time}
                </div>
              ) : language === 'ar' ? "اختر الوقت" : "Select time"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {availableTimeSlots.length > 0 ? (
              availableTimeSlots.map((slot) => (
                <SelectItem key={slot} value={slot}>{slot}</SelectItem>
              ))
            ) : (
              <div className="py-2 px-2 text-center">
                <p className="text-sm text-muted-foreground">{getBadgeText("No available slots", language)}</p>
                {date && !isWaitlisted && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-1 text-xs"
                    type="button"
                    onClick={onJoinWaitlist}
                  >
                    {getBadgeText("Join waitlist", language)}
                  </Button>
                )}
                {isWaitlisted && (
                  <Badge className="mt-1 bg-amber-100 text-amber-800 border-amber-300">
                    {getBadgeText("Added to waitlist", language)}
                  </Badge>
                )}
              </div>
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
