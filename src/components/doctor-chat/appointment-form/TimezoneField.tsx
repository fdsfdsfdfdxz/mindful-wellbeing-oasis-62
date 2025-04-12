
import React from "react";
import { TimezoneSelect } from "../TimezoneSelect";

interface TimezoneFieldProps {
  timezone: string;
  onChange: (timezone: string) => void;
  language: string;
}

export const TimezoneField: React.FC<TimezoneFieldProps> = ({ timezone, onChange, language }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">
        {language === 'ar' ? "المنطقة الزمنية الخاصة بك" : "Your Timezone"}
      </label>
      <TimezoneSelect value={timezone} onChange={onChange} />
      <p className="text-xs text-muted-foreground mt-1">
        {language === 'ar' 
          ? "سيتم عرض أوقات المواعيد بهذه المنطقة الزمنية" 
          : "Appointment times will be displayed in this timezone"}
      </p>
    </div>
  );
};
