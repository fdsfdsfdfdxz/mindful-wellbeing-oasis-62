
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

// Time slots available for booking
export const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM", 
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
];

// Mock unavailable slots - in a real app, this would come from an API
export const UNAVAILABLE_SLOTS = {
  // Format: "YYYY-MM-DD": ["time slot", "time slot"]
  [format(new Date(), "yyyy-MM-dd")]: ["9:00 AM", "2:00 PM"]
};

export function useAppointmentBooking(practitionerId: string | null) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState(1); // 1: Select date & time, 2: Confirm
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const isTimeSlotAvailable = (time: string): boolean => {
    if (!selectedDate) return true;
    
    const dateKey = format(selectedDate, "yyyy-MM-dd");
    return !UNAVAILABLE_SLOTS[dateKey]?.includes(time);
  };
  
  const handleContinue = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Incomplete selection",
        description: "Please select both a date and time for your appointment.",
        variant: "destructive"
      });
      return;
    }
    
    setBookingStep(2);
    window.scrollTo(0, 0);
  };
  
  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Incomplete booking",
        description: "Please select both a date and time for your appointment.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call to book appointment
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Appointment booked!",
        description: `Your appointment with ${practitionerId} on ${format(selectedDate, "MMMM d, yyyy")} at ${selectedTime} has been confirmed.`,
      });
      
      // Navigate back to practitioner profile or to a confirmation page
      navigate(`/practitioners/${practitionerId}`);
    }, 1500);
  };
  
  const goBack = () => {
    if (bookingStep === 2) {
      setBookingStep(1);
    } else {
      navigate(`/practitioners/${practitionerId}`);
    }
  };
  
  return {
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    bookingStep,
    isLoading,
    handleTimeSelect,
    isTimeSlotAvailable,
    handleContinue,
    handleBookAppointment,
    goBack
  };
}
