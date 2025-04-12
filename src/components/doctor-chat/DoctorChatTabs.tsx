
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

interface DoctorChatTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const DoctorChatTabs: React.FC<DoctorChatTabsProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  const { language } = useLanguage();
  
  return (
    <TabsList className="grid grid-cols-3 mb-8">
      <TabsTrigger 
        value="chat" 
        onClick={() => onTabChange("chat")}
      >
        {language === 'ar' ? "دردشة" : "Chat"}
      </TabsTrigger>
      <TabsTrigger 
        value="appointment" 
        onClick={() => onTabChange("appointment")}
      >
        {language === 'ar' ? "حجز موعد" : "Book Appointment"}
      </TabsTrigger>
      <TabsTrigger 
        value="appointments" 
        onClick={() => onTabChange("appointments")}
      >
        {language === 'ar' ? "مواعيدي" : "My Appointments"}
      </TabsTrigger>
    </TabsList>
  );
};
