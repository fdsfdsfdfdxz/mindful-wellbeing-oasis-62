
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NavigationHeader from "@/components/appointment/NavigationHeader";
import BookingSteps from "@/components/appointment/BookingSteps";
import DateTimeSelectionCards from "@/components/appointment/DateTimeSelectionCards";
import PractitionerCard from "@/components/appointment/PractitionerCard";
import AppointmentSummary from "@/components/appointment/AppointmentSummary";
import { usePractitionerData } from "@/hooks/usePractitionerData";
import { useAppointmentBooking, TIME_SLOTS } from "@/hooks/useAppointmentBooking";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarRange, CheckCircle2 } from "lucide-react";

const BookAppointment = () => {
  const [searchParams] = useSearchParams();
  const practitionerId = searchParams.get("practitionerId");
  
  const { practitioner } = usePractitionerData(practitionerId);
  const {
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
  } = useAppointmentBooking(practitionerId);
  
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
  
  // Add additional details to practitioner for enhanced display
  const enhancedPractitioner = {
    ...practitioner,
    specialties: ["Cognitive Behavioral Therapy", "Anxiety", "Depression"],
    rating: 4.9,
    availabilityText: "Usually responds within 24 hours",
    appointmentTypes: ["video", "phone", "inPerson"] as const
  };
  
  return (
    <>
      <Navbar />
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          <NavigationHeader bookingStep={bookingStep} goBack={goBack} />
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4 text-center">Book an Appointment</h1>
            <BookingSteps bookingStep={bookingStep} />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <PractitionerCard practitioner={enhancedPractitioner} />
            </div>
            
            <div className="md:col-span-2">
              {bookingStep === 1 ? (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <CalendarRange className="h-5 w-5 mr-2 text-primary" />
                      <h2 className="text-xl font-semibold">Select Date & Time</h2>
                    </div>
                    
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
                        {(!selectedDate || !selectedTime) ? (
                          "Select Date & Time"
                        ) : (
                          <span className="flex items-center">
                            Continue to Confirmation
                            <CheckCircle2 className="ml-2 h-4 w-4" />
                          </span>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookAppointment;
