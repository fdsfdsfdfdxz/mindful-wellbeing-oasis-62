
import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Time slots available for booking
const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM", 
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
];

const BookAppointment = () => {
  const [searchParams] = useSearchParams();
  const practitionerId = searchParams.get("practitionerId");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [practitioner, setPractitioner] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  
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
                      onSelect={setSelectedDate}
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
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {TIME_SLOTS.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      onClick={() => handleTimeSelect(time)}
                      className={selectedTime === time ? "bg-calmBlue-500 hover:bg-calmBlue-600" : ""}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Appointment Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Practitioner:</strong> {practitioner.name}</p>
                <p><strong>Date:</strong> {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Not selected"}</p>
                <p><strong>Time:</strong> {selectedTime || "Not selected"}</p>
                <p><strong>Fee:</strong> {practitioner.rate}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleBookAppointment} 
                className="w-full" 
                disabled={!selectedDate || !selectedTime || isLoading}
              >
                {isLoading ? "Processing..." : "Confirm Booking"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookAppointment;
