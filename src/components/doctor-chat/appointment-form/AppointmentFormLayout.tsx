
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AppointmentFormLayoutProps {
  children: React.ReactNode;
}

export const AppointmentFormLayout: React.FC<AppointmentFormLayoutProps> = ({ children }) => {
  const { language } = useLanguage();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">
        {language === 'ar' ? "تحديد موعد" : "Schedule an Appointment"}
      </h2>
      {children}
    </div>
  );
};
