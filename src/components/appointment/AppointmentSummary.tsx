
import { format } from "date-fns";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

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
  return (
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
  );
};

export default AppointmentSummary;
