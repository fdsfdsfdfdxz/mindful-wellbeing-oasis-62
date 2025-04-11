
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

// Common timezones - in a real app, you'd fetch all IANA timezones
const TIMEZONES = [
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
  { value: "Europe/Paris", label: "Central European Time (CET)" },
  { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
  { value: "Australia/Sydney", label: "Australian Eastern Time (AET)" },
];

interface TimezoneSelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function TimezoneSelect({ value, onChange, className }: TimezoneSelectProps) {
  const [open, setOpen] = useState(false);
  
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
    { value, label: value?.replace('_', ' ').replace(/\//g, ' - ') };

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
            {selectedTimezone ? selectedTimezone.label : "Select timezone..."}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search timezone..." />
          <CommandEmpty>No timezone found.</CommandEmpty>
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
                {timezone.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
