
import React from "react";
import { BellRing, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  isDisabled: boolean;
  isWaitlisted: boolean;
  language: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isDisabled,
  isWaitlisted,
  language
}) => {
  return (
    <Button 
      type="submit" 
      className="w-full"
      disabled={isDisabled}
    >
      {isWaitlisted ? (
        <>
          <BellRing className="mr-2 h-4 w-4" />
          {language === 'ar' ? "في قائمة الانتظار" : "On Waitlist"}
        </>
      ) : (
        <>
          <Calendar className="mr-2 h-4 w-4" />
          {language === 'ar' ? "حجز موعد" : "Book Appointment"}
        </>
      )}
    </Button>
  );
};
