
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PractitionerCard from "@/components/appointment/PractitionerCard";
import NavigationHeader from "@/components/appointment/NavigationHeader";
import DateTimeSelectionCards from "@/components/appointment/DateTimeSelectionCards";
import AppointmentSummary from "@/components/appointment/AppointmentSummary";

// Time slots available for booking
const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM", 
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
];

// Mock unavailable slots - in a real app, this would come from an API
const UNAVAILABLE_SLOTS = {
  // Format: "YYYY-MM-DD": ["time slot", "time slot"]
  [format(new Date(), "yyyy-MM-dd")]: ["9:00 AM", "2:00 PM"]
};

const BookAppointment = () => {
  const [searchParams] = useSearchParams();
  const practitionerId = searchParams.get("practitionerId");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [practitioner, setPractitioner] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingStep, setBookingStep] = useState(1); // 1: Select date & time, 2: Confirm
  
  // Fetch practitioner data
  useEffect(() => {
    const fetchPractitioner = async () => {
      // In a real app, this would be an API call
      // For now, we'll use mock data
      const mockPractitioners = {
        "p1": { 
          id: "p1", 
          name: "Dr. Sarah Johnson",
          photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          rate: "$150/session"
        },
        "p2": {
          id: "p2",
          name: "Dr. Michael Chen",
          photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          rate: "$175/session"
        }
      };
      
      if (practitionerId && practitionerId in mockPractitioners) {
        setPractitioner(mockPractitioners[practitionerId as keyof typeof mockPractitioners]);
      } else {
        // Handle case where practitioner is not found
        toast({
          title: "Practitioner not found",
          description: "The requested practitioner could not be found.",
          variant: "destructive"
        });
        navigate("/practitioners");
      }
    };
    
    fetchPractitioner();
  }, [practitionerId, navigate, toast]);
  
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
        description: `Your appointment with ${practitioner?.name} on ${format(selectedDate, "MMMM d, yyyy")} at ${selectedTime} has been confirmed.`,
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
  
  if (!practitioner) {
    return (
      <>
        <Navbar />
        <div className="container-custom py-20 text-center">
          <p>Loading practitioner information...</p>
        </div>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Navbar />
      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto">
          <NavigationHeader bookingStep={bookingStep} goBack={goBack} />
          
          <h1 className="text-3xl font-bold mb-8 text-center">Book an Appointment</h1>
          
          <PractitionerCard practitioner={practitioner} />
          
          {bookingStep === 1 ? (
            <>
              <DateTimeSelectionCards
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                handleTimeSelect={handleTimeSelect}
                isTimeSlotAvailable={isTimeSlotAvailable}
                timeSlots={TIME_SLOTS}
              />
              
              <div className="mt-8 flex justify-end">
                <Button 
                  onClick={handleContinue}
                  className="w-full md:w-auto" 
                  disabled={!selectedDate || !selectedTime}
                >
                  Continue to Confirmation
                </Button>
              </div>
            </>
          ) : (
            <AppointmentSummary
              practitioner={practitioner}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              isLoading={isLoading}
              goBack={goBack}
              handleBookAppointment={handleBookAppointment}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookAppointment;
