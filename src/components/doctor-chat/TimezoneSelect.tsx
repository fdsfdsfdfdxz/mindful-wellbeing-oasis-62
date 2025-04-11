
import { useState, useEffect } from "react";
import { Check, Globe } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";

// Common timezones - in a real app, you'd fetch all IANA timezones
const TIMEZONES = [
  { value: "America/New_York", label: "Eastern Time (ET)", labelAr: "التوقيت الشرقي (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)", labelAr: "التوقيت المركزي (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)", labelAr: "توقيت الجبال (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)", labelAr: "توقيت المحيط الهادئ (PT)" },
  { value: "Europe/London", label: "Greenwich Mean Time (GMT)", labelAr: "توقيت غرينتش (GMT)" },
  { value: "Europe/Paris", label: "Central European Time (CET)", labelAr: "توقيت وسط أوروبا (CET)" },
  { value: "Asia/Tokyo", label: "Japan Standard Time (JST)", labelAr: "توقيت اليابان القياسي (JST)" },
  { value: "Australia/Sydney", label: "Australian Eastern Time (AET)", labelAr: "توقيت شرق أستراليا (AET)" },
];

interface TimezoneSelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function TimezoneSelect({ value, onChange, className }: TimezoneSelectProps) {
  const [open, setOpen] = useState(false);
  const { language } = useLanguage();
  
  // Get user's local timezone on component mount
  useEffect(() => {
    if (!value) {
      try {
        const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        onChange(localTimezone);
      } catch (error) {
        // Fallback to a common timezone if browser API fails
        onChange("America/New_York");
      }
    }
  }, [value, onChange]);

  const selectedTimezone = TIMEZONES.find(tz => tz.value === value) || 
    { 
      value: value || "UTC", 
      label: value?.replace('_', ' ').replace(/\//g, ' - ') || "UTC",
      labelAr: value?.replace('_', ' ').replace(/\//g, ' - ') || "توقيت عالمي منسق"
    };

  const noTimezoneFound = language === 'ar' ? "لم يتم العثور على منطقة زمنية." : "No timezone found.";
  const searchTimezone = language === 'ar' ? "البحث عن منطقة زمنية..." : "Search timezone...";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          <div className="flex items-center">
            <Globe className="mr-2 h-4 w-4" />
            {language === 'ar' ? selectedTimezone.labelAr || selectedTimezone.label : selectedTimezone.label}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder={searchTimezone} />
          <CommandEmpty>{noTimezoneFound}</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-auto">
            {TIMEZONES.map((timezone) => (
              <CommandItem
                key={timezone.value}
                value={timezone.value}
                onSelect={() => {
                  onChange(timezone.value);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === timezone.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {language === 'ar' ? timezone.labelAr : timezone.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
