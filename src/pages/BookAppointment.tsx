
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PractitionerCard from "@/components/appointment/PractitionerCard";
import NavigationHeader from "@/components/appointment/NavigationHeader";
import DateTimeSelectionCards from "@/components/appointment/DateTimeSelectionCards";
import AppointmentSummary from "@/components/appointment/AppointmentSummary";
import { usePractitionerData } from "@/hooks/usePractitionerData";
import { useAppointmentBooking, TIME_SLOTS } from "@/hooks/useAppointmentBooking";

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
