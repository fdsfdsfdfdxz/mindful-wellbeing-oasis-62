
import { format } from "date-fns";

export const formatDisplayDate = (date: Date, formatStr: string): string => {
  return format(date, formatStr);
};

export const isWaitlistNeeded = (availableTimeSlots: string[], date?: Date): boolean => {
  return date !== undefined && availableTimeSlots.length === 0;
};

export const getBadgeText = (text: string, language: string): string => {
  if (language !== 'ar') return text;
  
  switch (text) {
    case "No available slots":
      return "لا توجد مواعيد متاحة";
    case "Join waitlist":
      return "الانضمام إلى قائمة الانتظار";
    case "Added to waitlist":
      return "تمت الإضافة إلى قائمة الانتظار";
    default:
      return text;
  }
};
