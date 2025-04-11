
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CalendarIcon, 
  Clock, 
  MessageSquare, 
  VideoIcon, 
  Phone, 
  UserRound,
  Calendar,
  BellRing
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format, addDays, isEqual, isBefore, addMinutes } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { TimezoneSelect } from "./TimezoneSelect";
import { Badge } from "@/components/ui/badge";

// Define the appointment type using non-optional properties since they're required
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
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [type, setType] = useState<AppointmentData["type"]>("video");
  const [timezone, setTimezone] = useState<string>("UTC");  // Default to UTC
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
    
    const formattedDate = format(date, "yyyy-MM-dd");
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
      title: "Added to Waitlist",
      description: "You'll be notified if this slot becomes available.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Make sure all required fields are filled
    if (!date || !time || !reason || !type) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields to book your appointment.",
        variant: "destructive"
      });
      return;
    }

    // Create appointment data with all required fields
    const appointmentData: AppointmentData = {
      date: format(date, "yyyy-MM-dd"),
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
        title: "Appointment Scheduled",
        description: `Your ${type} appointment has been booked for ${format(date, "MMMM d, yyyy")} at ${time}.`,
      });
      navigate(`/doctor-chat?appointment=${type}`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">Schedule an Appointment</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Date Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Appointment Date <span className="text-red-500">*</span>
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
                  {date ? format(date, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={handleDateChange}
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
              Appointment Time <span className="text-red-500">*</span>
            </label>
            <Select
              value={time}
              onValueChange={setTime}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select time">
                  {time ? (
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      {time}
                    </div>
                  ) : "Select time"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {availableTimeSlots.length > 0 ? (
                  availableTimeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                  ))
                ) : (
                  <div className="py-2 px-2 text-center">
                    <p className="text-sm text-muted-foreground">No available slots</p>
                    {date && !isWaitlisted && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mt-1 text-xs"
                        type="button"
                        onClick={joinWaitlist}
                      >
                        Join waitlist
                      </Button>
                    )}
                    {isWaitlisted && (
                      <Badge className="mt-1 bg-amber-100 text-amber-800 border-amber-300">
                        Added to waitlist
                      </Badge>
                    )}
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Timezone Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Your Timezone
          </label>
          <TimezoneSelect value={timezone} onChange={setTimezone} />
          <p className="text-xs text-muted-foreground mt-1">
            Appointment times will be displayed in this timezone
          </p>
        </div>

        {/* Appointment Type */}
        <div className="mb-6 space-y-2">
          <label className="block text-sm font-medium">
            Appointment Type <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            <Button
              type="button"
              variant={type === "video" ? "default" : "outline"}
              className="flex flex-col items-center justify-center h-24"
              onClick={() => setType("video")}
            >
              <VideoIcon className="h-6 w-6 mb-2" />
              <span>Video Call</span>
            </Button>
            <Button
              type="button"
              variant={type === "phone" ? "default" : "outline"}
              className="flex flex-col items-center justify-center h-24"
              onClick={() => setType("phone")}
            >
              <Phone className="h-6 w-6 mb-2" />
              <span>Phone Call</span>
            </Button>
            <Button
              type="button"
              variant={type === "inPerson" ? "default" : "outline"}
              className="flex flex-col items-center justify-center h-24"
              onClick={() => setType("inPerson")}
            >
              <UserRound className="h-6 w-6 mb-2" />
              <span>In Person</span>
            </Button>
          </div>
        </div>

        {/* Reason for Visit */}
        <div className="mb-6 space-y-2">
          <label className="block text-sm font-medium">
            Reason for Visit <span className="text-red-500">*</span>
          </label>
          <Textarea 
            placeholder="Please describe your concerns or what you would like to discuss..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>

        {/* Reminder Preferences */}
        <div className="mb-6 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium">Appointment Reminders</label>
              <p className="text-xs text-muted-foreground">Receive reminders 24h and 1h before appointment</p>
            </div>
            <Switch 
              checked={reminders} 
              onCheckedChange={setReminders} 
              className="data-[state=checked]:bg-green-500" 
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full"
          disabled={!date || !time || !reason || !type || isWaitlisted}
        >
          {isWaitlisted ? (
            <>
              <BellRing className="mr-2 h-4 w-4" />
              On Waitlist
            </>
          ) : (
            <>
              <Calendar className="mr-2 h-4 w-4" />
              Book Appointment
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default AppointmentForm;
