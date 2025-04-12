
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AppointmentSuccessProps {
  appointmentData?: {
    type: string;
    date: string;
    time: string;
  };
}

export const AppointmentSuccess: React.FC<AppointmentSuccessProps> = ({ appointmentData }) => {
  const { language } = useLanguage();
  
  if (!appointmentData) return null;
  
  const getTypeTranslation = (type: string) => {
    if (language !== 'ar') return type;
    
    switch (type) {
      case "video":
        return "الفيديو";
      case "phone":
        return "المكالمة الهاتفية";
      case "inPerson":
        return "الحضور الشخصي";
      default:
        return type;
    }
  };
  
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
      <h3 className="font-medium text-green-800">
        {language === 'ar' ? "تم تحديد الموعد بنجاح" : "Appointment Successfully Scheduled"}
      </h3>
      <p className="text-green-700 mt-1">
        {language === 'ar'
          ? `تم حجز موعد ${getTypeTranslation(appointmentData.type)} الخاص بك ليوم ${appointmentData.date} في ${appointmentData.time}.`
          : `Your ${appointmentData.type} appointment has been booked for ${appointmentData.date} at ${appointmentData.time}.`
        }
      </p>
    </div>
  );
};
