
import { Textarea } from "@/components/ui/textarea";

interface ReasonFieldProps {
  reason: string;
  onChange: (reason: string) => void;
  label?: string;
  placeholder?: string;
  language?: string;
  required?: boolean;
  className?: string;
}

const ReasonField = ({
  reason,
  onChange,
  label = "Reason for Visit",
  placeholder = "Please describe your concerns or what you would like to discuss...",
  language = "en",
  required = true,
  className,
}: ReasonFieldProps) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium">
        {language === 'ar' ? "سبب الزيارة" : label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <Textarea 
        placeholder={
          language === 'ar' 
            ? "يرجى وصف مخاوفك أو ما تود مناقشته..." 
            : placeholder
        }
        value={reason}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="resize-none"
      />
    </div>
  );
};

export default ReasonField;
