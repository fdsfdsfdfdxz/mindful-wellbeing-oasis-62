
import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface ReasonFieldProps {
  reason: string;
  onChange: (reason: string) => void;
  language: string;
}

export const ReasonField: React.FC<ReasonFieldProps> = ({ reason, onChange, language }) => {
  return (
    <div className="mb-6 space-y-2">
      <label className="block text-sm font-medium">
        {language === 'ar' ? "سبب الزيارة" : "Reason for Visit"} <span className="text-red-500">*</span>
      </label>
      <Textarea 
        placeholder={language === 'ar' 
          ? "يرجى وصف مخاوفك أو ما تود مناقشته..." 
          : "Please describe your concerns or what you would like to discuss..."
        }
        value={reason}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="resize-none"
      />
    </div>
  );
};
