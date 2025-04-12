
import { Switch } from "@/components/ui/switch";

interface ReminderToggleProps {
  reminders: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  language?: string;
  className?: string;
}

const ReminderToggle = ({ 
  reminders, 
  onChange,
  label = "Appointment Reminders",
  description = "Receive reminders 24h and 1h before appointment",
  language = "en",
  className,
}: ReminderToggleProps) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-medium">
            {language === 'ar' ? "تذكيرات المواعيد" : label}
          </label>
          <p className="text-xs text-muted-foreground">
            {language === 'ar' 
              ? "تلقي تذكيرات قبل 24 ساعة وساعة واحدة من الموعد" 
              : description
            }
          </p>
        </div>
        <Switch 
          checked={reminders} 
          onCheckedChange={onChange} 
          className="data-[state=checked]:bg-green-500" 
        />
      </div>
    </div>
  );
};

export default ReminderToggle;
