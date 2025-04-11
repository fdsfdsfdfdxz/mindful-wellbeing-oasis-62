
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarIcon, Clock, MessageSquare, VideoIcon, Phone, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

// Define the appointment type using non-optional properties since they're required
interface AppointmentData {
  date: string;
  time: string;
  reason: string;
  type: "video" | "phone" | "inPerson";
}

interface AppointmentFormProps {
  doctorId?: string;
  onSubmit?: (appointment: AppointmentData) => void;
}

const AppointmentForm = ({ doctorId, onSubmit }: AppointmentFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [type, setType] = useState<AppointmentData["type"]>("video");
  
  // Define available time slots
  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", 
    "04:00 PM", "04:30 PM"
  ];

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
      type
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
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => {
                    // Disable past dates and weekends
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const day = date.getDay();
                    return date < today || day === 0 || day === 6;
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
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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

        <Button 
          type="submit" 
          className="w-full"
          disabled={!date || !time || !reason || !type}
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Book Appointment
        </Button>
      </form>
    </div>
  );
};

export default AppointmentForm;
