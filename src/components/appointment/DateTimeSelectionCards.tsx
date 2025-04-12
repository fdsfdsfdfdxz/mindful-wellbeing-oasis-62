
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import AppointmentDateSelector from "./AppointmentDateSelector";
import AppointmentTimeSelector from "./AppointmentTimeSelector";

interface DateTimeSelectionCardsProps {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
  handleTimeSelect: (time: string) => void;
  isTimeSlotAvailable: (time: string) => boolean;
  timeSlots: string[];
}

const DateTimeSelectionCards = ({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  handleTimeSelect,
  isTimeSlotAvailable,
  timeSlots,
}: DateTimeSelectionCardsProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Select Date</CardTitle>
        </CardHeader>
        <CardContent>
          <AppointmentDateSelector 
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setSelectedTime={setSelectedTime}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Select Time</CardTitle>
          <CardDescription>
            {selectedDate 
              ? `Available times for ${selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}` 
              : "Please select a date first"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AppointmentTimeSelector 
            timeSlots={timeSlots}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            handleTimeSelect={handleTimeSelect}
            isTimeSlotAvailable={isTimeSlotAvailable}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default DateTimeSelectionCards;
