
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { AppointmentFormLayout } from "./appointment-form/AppointmentFormLayout";
import { AppointmentTypeSelector } from "./appointment-form/AppointmentTypeSelector";
import { DateTimeSelector } from "./appointment-form/DateTimeSelector";
import { ReasonField } from "./appointment-form/ReasonField";
import { ReminderToggle } from "./appointment-form/ReminderToggle";
import { SubmitButton } from "./appointment-form/SubmitButton";
import { isWaitlistNeeded, formatDisplayDate } from "./appointment-form/utils";

// Define the appointment type
interface AppointmentData {
  date: string;
  time: string;
  reason: string;
  type: "video" | "phone" | "inPerson";
  timezone?: string;
  reminders?: boolean;
}

interface AppointmentFormProps {
  doctorId?: string;
  onSubmit?: (appointment: AppointmentData) => void;
}

// Define unavailable time slots for demonstration
const UNAVAILABLE_SLOTS = [
  { date: "2025-04-12", times: ["09:00 AM", "09:30 AM", "02:00 PM"] },
  { date: "2025-04-13", times: ["10:30 AM", "11:00 AM", "03:30 PM"] },
  { date: "2025-04-15", times: ["01:00 PM", "01:30 PM", "04:00 PM"] },
];

const AppointmentForm = ({ doctorId, onSubmit }: AppointmentFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [type, setType] = useState<AppointmentData["type"]>("video");
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
  const getAvailableTimeSlots = () => {
    if (!date) return timeSlots;
    
    const formattedDate = formatDisplayDate(date, "yyyy-MM-dd");
    const unavailableDay = UNAVAILABLE_SLOTS.find(slot => slot.date === formattedDate);
    
    if (!unavailableDay) return timeSlots;
    return timeSlots.filter(slot => !unavailableDay.times.includes(slot));
  };
  
  const availableTimeSlots = getAvailableTimeSlots();
  
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

  const needsWaitlist = isWaitlistNeeded(availableTimeSlots, date);

  return (
    <AppointmentFormLayout>
      <form onSubmit={handleSubmit}>
        <DateTimeSelector
          date={date}
          time={time}
          availableTimeSlots={availableTimeSlots}
          onDateChange={handleDateChange}
          onTimeChange={setTime}
          isWaitlisted={isWaitlisted}
          onJoinWaitlist={joinWaitlist}
          language={language}
        />
        
        {/* Replace TimezoneField with a simple timezone display to avoid using the command component */}
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
        />
        
        <ReasonField 
          reason={reason} 
          onChange={setReason} 
          language={language} 
        />
        
        <ReminderToggle
          reminders={reminders}
          onChange={setReminders}
          language={language}
        />

        <SubmitButton
          isDisabled={!date || !time || !reason || !type || isWaitlisted}
          isWaitlisted={isWaitlisted}
          language={language}
        />
      </form>
    </AppointmentFormLayout>
  );
};

export default AppointmentForm;
