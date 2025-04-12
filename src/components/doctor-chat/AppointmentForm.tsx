
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  AppointmentTypeSelector,
  DateSelector,
  TimeSelector,
  ReasonField,
  ReminderToggle,
  AppointmentType
} from "@/components/shared/appointments";
import { Button } from "@/components/ui/button";
import { formatDisplayDate } from "./appointment-form/utils";

// Define unavailable time slots for demonstration
const UNAVAILABLE_SLOTS = [
  { date: "2025-04-12", times: ["09:00 AM", "09:30 AM", "02:00 PM"] },
  { date: "2025-04-13", times: ["10:30 AM", "11:00 AM", "03:30 PM"] },
  { date: "2025-04-15", times: ["01:00 PM", "01:30 PM", "04:00 PM"] },
];

interface AppointmentData {
  date: string;
  time: string;
  reason: string;
  type: AppointmentType;
  timezone?: string;
  reminders?: boolean;
}

interface AppointmentFormProps {
  doctorId?: string;
  onSubmit?: (appointment: AppointmentData) => void;
}

const AppointmentForm = ({ doctorId, onSubmit }: AppointmentFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [type, setType] = useState<AppointmentType>("video");
  const [timezone, setTimezone] = useState<string>("America/New_York"); // Use a default timezone instead of UTC
  const [reminders, setReminders] = useState<boolean>(true);
  const [isWaitlisted, setIsWaitlisted] = useState<boolean>(false);
  
  // Define available time slots
  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", 
    "04:00 PM", "04:30 PM"
  ];
  
  // Filter out unavailable time slots for the selected date
  const isTimeSlotAvailable = (time: string): boolean => {
    if (!date) return true;
    
    const formattedDate = formatDisplayDate(date, "yyyy-MM-dd");
    const unavailableDay = UNAVAILABLE_SLOTS.find(slot => slot.date === formattedDate);
    
    if (!unavailableDay) return true;
    return !unavailableDay.times.includes(time);
  };
  
  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    setTime(""); // Reset time when date changes
    setIsWaitlisted(false); // Reset waitlist status
  };

  const joinWaitlist = () => {
    setIsWaitlisted(true);
    toast({
      title: language === 'ar' ? "تمت الإضافة إلى قائمة الانتظار" : "Added to Waitlist",
      description: language === 'ar' ? "سيتم إخطارك إذا أصبح هذا الموعد متاحًا." : "You'll be notified if this slot becomes available.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Make sure all required fields are filled
    if (!date || !time || !reason || !type) {
      toast({
        title: language === 'ar' ? "معلومات مفقودة" : "Missing information",
        description: language === 'ar' ? "يرجى ملء جميع الحقول المطلوبة لحجز موعدك." : "Please fill all required fields to book your appointment.",
        variant: "destructive"
      });
      return;
    }

    // Create appointment data with all required fields
    const appointmentData: AppointmentData = {
      date: formatDisplayDate(date, "yyyy-MM-dd"),
      time,
      reason, 
      type,
      timezone,
      reminders
    };

    // If onSubmit prop is provided, call it
    if (onSubmit) {
      onSubmit(appointmentData);
    } else {
      // Default behavior - show success toast and navigate
      toast({
        title: language === 'ar' ? "تم تحديد الموعد" : "Appointment Scheduled",
        description: language === 'ar' 
          ? `تم حجز موعد ${type === 'video' ? 'الفيديو' : type === 'phone' ? 'المكالمة الهاتفية' : 'الحضور الشخصي'} الخاص بك ليوم ${formatDisplayDate(date, "MMMM d, yyyy")} في ${time}.`
          : `Your ${type} appointment has been booked for ${formatDisplayDate(date, "MMMM d, yyyy")} at ${time}.`,
      });
      navigate(`/doctor-chat?appointment=${type}`);
    }
  };

  const getAvailableTimeSlots = () => {
    return timeSlots.filter(time => isTimeSlotAvailable(time));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">
        {language === 'ar' ? "تحديد موعد" : "Schedule an Appointment"}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <DateSelector
            label={language === 'ar' ? "تاريخ الموعد" : "Appointment Date"}
            placeholder={language === 'ar' ? "اختر التاريخ" : "Select date"}
            selectedDate={date}
            onDateChange={handleDateChange}
            disabledDates={(date) => {
              // Disable weekends (0 = Sunday, 6 = Saturday)
              const day = date.getDay();
              return day === 0 || day === 6;
            }}
          />
          
          <TimeSelector
            label={language === 'ar' ? "وقت الموعد" : "Appointment Time"}
            placeholder={language === 'ar' ? "اختر الوقت" : "Select time"}
            timeSlots={timeSlots}
            selectedTime={time}
            onTimeSelect={setTime}
            isTimeSlotAvailable={isTimeSlotAvailable}
            useButtons={false}
            disabled={!date}
          />
        </div>
        
        {/* Replace TimezoneField with a simple timezone display */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            {language === 'ar' ? "المنطقة الزمنية الخاصة بك" : "Your Timezone"}
          </label>
          <div className="border border-input rounded-md p-2">
            {timezone}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {language === 'ar' 
              ? "سيتم عرض أوقات المواعيد بهذه المنطقة الزمنية" 
              : "Appointment times will be displayed in this timezone"}
          </p>
        </div>
        
        <AppointmentTypeSelector
          selectedType={type}
          onTypeChange={setType}
          language={language}
          className="mb-6"
        />
        
        <ReasonField 
          reason={reason} 
          onChange={setReason}
          language={language}
          className="mb-6"
        />
        
        <ReminderToggle
          reminders={reminders}
          onChange={setReminders}
          language={language}
          className="mb-6"
        />

        <Button 
          type="submit" 
          className="w-full"
          disabled={!date || !time || !reason || !type || isWaitlisted}
        >
          {isWaitlisted 
            ? (language === 'ar' ? "في قائمة الانتظار" : "On Waitlist")
            : (language === 'ar' ? "حجز موعد" : "Book Appointment")
          }
        </Button>
      </form>
    </div>
  );
};

export default AppointmentForm;
