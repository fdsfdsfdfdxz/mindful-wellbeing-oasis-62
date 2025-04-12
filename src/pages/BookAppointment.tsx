
import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { format, isSameDay } from "date-fns";
import { CalendarIcon, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
          <div className="mb-6 flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={goBack}
              className="flex items-center gap-2"
            >
              ← Back
            </Button>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className={cn("flex h-6 w-6 items-center justify-center rounded-full", bookingStep >= 1 ? "bg-primary text-primary-foreground" : "border border-input")}>
                1
              </div>
              <span className={bookingStep >= 1 ? "font-medium text-foreground" : ""}>Select Time</span>
              <span className="mx-2">→</span>
              <div className={cn("flex h-6 w-6 items-center justify-center rounded-full", bookingStep >= 2 ? "bg-primary text-primary-foreground" : "border border-input")}>
                2
              </div>
              <span className={bookingStep >= 2 ? "font-medium text-foreground" : ""}>Confirm</span>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-8 text-center">Book an Appointment</h1>
          
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <img 
                  src={practitioner.photo} 
                  alt={practitioner.name} 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <CardTitle>{practitioner.name}</CardTitle>
                  <CardDescription>Rate: {practitioner.rate}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
          
          {bookingStep === 1 ? (
            <>
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Select Date</CardTitle>
                  </CardHeader>
                  <CardContent>
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
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Select Time</CardTitle>
                    <CardDescription>
                      {selectedDate 
                        ? `Available times for ${format(selectedDate, "MMMM d, yyyy")}` 
                        : "Please select a date first"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {TIME_SLOTS.map((time) => {
                        const available = isTimeSlotAvailable(time);
                        return (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            onClick={() => available && handleTimeSelect(time)}
                            disabled={!selectedDate || !available}
                            className={cn(
                              selectedTime === time ? "bg-primary hover:bg-primary/90" : "",
                              "justify-start"
                            )}
                          >
                            <Clock className="mr-2 h-4 w-4" />
                            {time}
                            {selectedTime === time && <CheckCircle className="ml-auto h-4 w-4" />}
                          </Button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
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
            <Card>
              <CardHeader>
                <CardTitle>Appointment Summary</CardTitle>
                <CardDescription>Please review your appointment details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Practitioner</p>
                      <p className="text-lg font-medium">{practitioner.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Fee</p>
                      <p className="text-lg font-medium">{practitioner.rate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Date</p>
                      <p className="text-lg font-medium">{selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Not selected"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Time</p>
                      <p className="text-lg font-medium">{selectedTime || "Not selected"}</p>
                    </div>
                  </div>
                  
                  <Alert className="mt-4">
                    <AlertDescription>
                      Your appointment will be confirmed immediately. Cancellation is available up to 24 hours before your scheduled time.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-3">
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto" 
                  onClick={goBack}
                >
                  Back to Selection
                </Button>
                <Button 
                  onClick={handleBookAppointment} 
                  className="w-full sm:w-auto" 
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Confirm Booking"}
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookAppointment;
