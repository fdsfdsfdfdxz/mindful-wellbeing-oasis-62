
import { DateTimeSelector } from "@/components/shared/appointments";

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
    <DateTimeSelector
      selectedDate={selectedDate}
      onDateChange={setSelectedDate}
      selectedTime={selectedTime}
      onTimeChange={handleTimeSelect}
      timeSlots={timeSlots}
      isTimeSlotAvailable={isTimeSlotAvailable}
      useButtons={true}
    />
  );
};

export default DateTimeSelectionCards;
