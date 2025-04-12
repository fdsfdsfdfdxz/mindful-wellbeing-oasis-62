
import { useState } from "react";
import { AppointmentConfirmation } from "@/components/shared/appointments";
import { format } from "date-fns";
import { Loader2, CalendarCheck, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AppointmentSummaryProps {
  practitioner: {
    name: string;
    rate: string;
  };
  selectedDate: Date | undefined;
  selectedTime: string | null;
  isLoading: boolean;
  goBack: () => void;
  handleBookAppointment: () => void;
}

const AppointmentSummary = ({
  practitioner,
  selectedDate,
  selectedTime,
  isLoading,
  goBack,
  handleBookAppointment,
}: AppointmentSummaryProps) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = () => {
    setIsConfirming(true);
    setTimeout(() => {
      handleBookAppointment();
      setIsConfirming(false);
    }, 800);
  };

  return (
    <div className="animate-fade-in">
      <Card className="mb-6 border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <CalendarCheck className="h-5 w-5 mr-2 text-primary" />
            Appointment Summary
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">
                {selectedDate ? format(selectedDate, "PPPP") : "Not selected"}
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="font-medium flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                {selectedTime || "Not selected"}
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Practitioner</p>
              <p className="font-medium">{practitioner.name}</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Rate</p>
              <p className="font-medium">{practitioner.rate}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <AppointmentConfirmation
        practitioner={practitioner}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        isLoading={isLoading || isConfirming}
        onCancel={goBack}
        onConfirm={handleConfirm}
        cancelLabel="Back to Selection"
        confirmLabel={
          isConfirming ? (
            <>
              <Loader2 className={cn("h-4 w-4 mr-2 animate-spin")} />
              Confirming...
            </>
          ) : (
            "Confirm Appointment"
          )
        }
        className={cn(
          "transition-all duration-300",
          isConfirming ? "opacity-80" : "opacity-100"
        )}
      />
    </div>
  );
};

export default AppointmentSummary;
