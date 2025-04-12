import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  CalendarIcon, 
  Clock, 
  Save, 
  Trash, 
  Plus,
  Calendar as CalendarIcon2
} from "lucide-react";
import { format, addDays, setHours, setMinutes, parseISO } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { TimezoneSelect } from "./TimezoneSelect";
import { useLanguage } from "@/contexts/LanguageContext";

const badgeTranslations: Record<string, { en: string; ar: string }> = {
  "Available": { en: "Available", ar: "متاح" },
  "Booked": { en: "Booked", ar: "محجوز" },
  "Time Slot": { en: "Time Slot", ar: "فترة زمنية" }
};

interface TimeSlot {
  start: string;
  end: string;
}

interface DayAvailability {
  date: Date;
  slots: TimeSlot[];
}

interface AvailabilityManagerProps {
  doctorId?: string;
  initialAvailability?: DayAvailability[];
  onSave?: (availability: DayAvailability[]) => void;
}

export function AvailabilityManager({ doctorId, initialAvailability = [], onSave }: AvailabilityManagerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [availability, setAvailability] = useState<DayAvailability[]>(initialAvailability);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([]);
  const [startTime, setStartTime] = useState<string>("09:00");
  const [endTime, setEndTime] = useState<string>("17:00");
  const [timezone, setTimezone] = useState<string>("");
  const { toast } = useToast();
  const { language } = useLanguage();
  
  const translateBadge = (text: string) => {
    return badgeTranslations[text] ? 
      (language === 'ar' ? badgeTranslations[text].ar : badgeTranslations[text].en) : 
      text;
  };
  
  const timeOptions = Array.from({ length: 24 * 2 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = (i % 2) * 30;
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  });
  
  const handleAddTimeSlot = () => {
    if (!selectedDate) return;
    
    if (startTime >= endTime) {
      toast({
        title: language === 'ar' ? "نطاق زمني غير صالح" : "Invalid time range",
        description: language === 'ar' ? "يجب أن يكون وقت الانتهاء بعد وقت البدء" : "End time must be later than start time",
        variant: "destructive"
      });
      return;
    }
    
    const newSlot = { start: startTime, end: endTime };
    setSelectedTimeSlots([...selectedTimeSlots, newSlot]);
  };
  
  const handleRemoveTimeSlot = (index: number) => {
    const updatedSlots = [...selectedTimeSlots];
    updatedSlots.splice(index, 1);
    setSelectedTimeSlots(updatedSlots);
  };
  
  const handleSaveAvailability = () => {
    if (!selectedDate || selectedTimeSlots.length === 0) return;
    
    const dateExists = availability.findIndex(
      item => format(item.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
    );
    
    const updatedAvailability = [...availability];
    
    if (dateExists >= 0) {
      updatedAvailability[dateExists] = {
        date: selectedDate,
        slots: selectedTimeSlots
      };
    } else {
      updatedAvailability.push({
        date: selectedDate,
        slots: selectedTimeSlots
      });
    }
    
    setAvailability(updatedAvailability);
    setSelectedTimeSlots([]);
    
    toast({
      title: language === 'ar' ? "تم تحديث التوفر" : "Availability updated",
      description: language === 'ar' 
        ? `تم حفظ توفرك ليوم ${format(selectedDate, 'EEEE, MMMM d, yyyy')}.`
        : `Your availability for ${format(selectedDate, 'EEEE, MMMM d, yyyy')} has been saved.`,
    });
    
    if (onSave) {
      onSave(updatedAvailability);
    }
  };
  
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    
    if (date) {
      const existingAvailability = availability.find(
        item => format(item.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      );
      
      if (existingAvailability) {
        setSelectedTimeSlots(existingAvailability.slots);
      } else {
        setSelectedTimeSlots([]);
      }
    }
  };

  const formatTimeDisplay = (time: string) => {
    const [hour, minute] = time.split(':').map(Number);
    return new Date(2022, 0, 1, hour, minute).toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <CalendarIcon className="mr-2 h-5 w-5" />
            {language === 'ar' ? "حدد التواريخ والأوقات" : "Select Dates & Times"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="p-3 pointer-events-auto"
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date < today;
              }}
            />
          </div>
          
          {selectedDate && (
            <>
              <div className="mb-4">
                <h3 className="font-medium mb-2">
                  {language === 'ar' 
                    ? `التوفر ليوم ${format(selectedDate, 'EEEE, MMMM d, yyyy')}` 
                    : `Availability for ${format(selectedDate, 'EEEE, MMMM d, yyyy')}`
                  }
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">
                      {language === 'ar' ? "وقت البدء" : "Start Time"}
                    </label>
                    <Select value={startTime} onValueChange={setStartTime}>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'ar' ? "وقت البدء" : "Start time"} />
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.map((time) => (
                          <SelectItem key={`start-${time}`} value={time}>
                            {formatTimeDisplay(time)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">
                      {language === 'ar' ? "وقت الانتهاء" : "End Time"}
                    </label>
                    <Select value={endTime} onValueChange={setEndTime}>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'ar' ? "وقت الانتهاء" : "End time"} />
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.map((time) => (
                          <SelectItem key={`end-${time}`} value={time}>
                            {formatTimeDisplay(time)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  type="button" 
                  onClick={handleAddTimeSlot} 
                  variant="outline" 
                  size="sm"
                  className="mb-4"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  {language === 'ar' ? "إضافة فترة زمنية" : "Add Time Slot"}
                </Button>
                
                <div className="space-y-2">
                  {selectedTimeSlots.length > 0 ? (
                    selectedTimeSlots.map((slot, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-500" />
                          <span>
                            {formatTimeDisplay(slot.start)} - {formatTimeDisplay(slot.end)}
                          </span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveTimeSlot(index)}>
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center p-4 bg-gray-50 rounded-md">
                      <p className="text-sm text-muted-foreground">
                        {language === 'ar' ? "لم يتم إضافة أي فترات زمنية بعد" : "No time slots added yet"}
                      </p>
                    </div>
                  )}
                </div>
                
                {selectedTimeSlots.length > 0 && (
                  <Button 
                    onClick={handleSaveAvailability} 
                    className="w-full mt-4"
                  >
                    <Save className="h-4 w-4 mr-1" />
                    {language === 'ar' ? "حفظ التوفر" : "Save Availability"}
                  </Button>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <CalendarIcon2 className="mr-2 h-5 w-5" />
            {language === 'ar' ? "توفرك" : "Your Availability"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block">
              {language === 'ar' ? "المنطقة الزمنية للمواعيد" : "Timezone for Appointments"}
            </label>
            <TimezoneSelect value={timezone} onChange={setTimezone} />
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium mb-4">
              {language === 'ar' ? "الأيام المتاحة" : "Available Days"}
            </h3>
            {availability.length > 0 ? (
              <div className="space-y-4">
                {availability.map((day, dayIndex) => (
                  <div key={dayIndex} className="border rounded-md p-3">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{format(day.date, 'EEEE, MMMM d, yyyy')}</h4>
                    </div>
                    <div className="space-y-1">
                      {day.slots.map((slot, slotIndex) => (
                        <Badge 
                          key={slotIndex}
                          variant="outline" 
                          className="mr-1 mb-1 bg-calmBlue-50 text-calmBlue-700 border-calmBlue-200"
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          {formatTimeDisplay(slot.start)} - {formatTimeDisplay(slot.end)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-6 bg-gray-50 rounded-md">
                <CalendarIcon className="h-10 w-10 mx-auto text-gray-300 mb-2" />
                <p className="text-muted-foreground">
                  {language === 'ar' ? "لم يتم تعيين التوفر" : "No availability set"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {language === 'ar' 
                    ? "اختر تواريخ من التقويم لإضافة توفرك" 
                    : "Select dates from the calendar to add your availability"
                  }
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
