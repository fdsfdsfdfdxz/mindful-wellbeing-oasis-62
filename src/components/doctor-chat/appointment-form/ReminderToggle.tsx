
import React from "react";
import { Switch } from "@/components/ui/switch";

interface ReminderToggleProps {
  reminders: boolean;
  onChange: (checked: boolean) => void;
  language: string;
}

export const ReminderToggle: React.FC<ReminderToggleProps> = ({ 
  reminders, 
  onChange,
  language 
}) => {
  return (
    <div className="mb-6 space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-medium">
            {language === 'ar' ? "تذكيرات المواعيد" : "Appointment Reminders"}
          </label>
          <p className="text-xs text-muted-foreground">
            {language === 'ar' 
              ? "تلقي تذكيرات قبل 24 ساعة وساعة واحدة من الموعد" 
              : "Receive reminders 24h and 1h before appointment"
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
