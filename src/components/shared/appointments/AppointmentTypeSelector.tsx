
import { VideoIcon, Phone, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

export type AppointmentType = "video" | "phone" | "inPerson";

interface AppointmentTypeSelectorProps {
  selectedType: AppointmentType;
  onTypeChange: (type: AppointmentType) => void;
  label?: string;
  language?: string;
  className?: string;
}

const AppointmentTypeSelector = ({
  selectedType,
  onTypeChange,
  label = "Appointment Type",
  language = "en",
  className,
}: AppointmentTypeSelectorProps) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium">
        {language === 'ar' ? "نوع الموعد" : label} <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-3 gap-3">
        <Button
          type="button"
          variant={selectedType === "video" ? "default" : "outline"}
          className="flex flex-col items-center justify-center h-24"
          onClick={() => onTypeChange("video")}
        >
          <VideoIcon className="h-6 w-6 mb-2" />
          <span>{language === 'ar' ? "مكالمة فيديو" : "Video Call"}</span>
        </Button>
        <Button
          type="button"
          variant={selectedType === "phone" ? "default" : "outline"}
          className="flex flex-col items-center justify-center h-24"
          onClick={() => onTypeChange("phone")}
        >
          <Phone className="h-6 w-6 mb-2" />
          <span>{language === 'ar' ? "مكالمة هاتفية" : "Phone Call"}</span>
        </Button>
        <Button
          type="button"
          variant={selectedType === "inPerson" ? "default" : "outline"}
          className="flex flex-col items-center justify-center h-24"
          onClick={() => onTypeChange("inPerson")}
        >
          <UserRound className="h-6 w-6 mb-2" />
          <span>{language === 'ar' ? "حضور شخصي" : "In Person"}</span>
        </Button>
      </div>
    </div>
  );
};

export default AppointmentTypeSelector;
