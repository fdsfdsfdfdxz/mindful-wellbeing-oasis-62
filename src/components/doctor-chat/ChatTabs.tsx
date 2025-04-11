
import React from "react";
import { MessageSquare, Calendar, FileText } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";

type ChatTab = "message" | "appointment" | "history";

interface ChatTabsProps {
  activeTab: ChatTab;
  onTabChange: (tab: ChatTab) => void;
}

export const ChatTabs = ({ activeTab, onTabChange }: ChatTabsProps) => {
  const { language } = useLanguage();

  return (
    <TabsList>
      <TabsTrigger 
        value="message" 
        onClick={() => onTabChange("message")}
        className={activeTab === "message" ? "bg-calmBlue-500 text-white" : ""}
      >
        <MessageSquare className="h-4 w-4 mr-2" />
        {translate("doctorChat", "message", language) || "Message"}
      </TabsTrigger>
      <TabsTrigger 
        value="appointment" 
        onClick={() => onTabChange("appointment")}
        className={activeTab === "appointment" ? "bg-calmBlue-500 text-white" : ""}
      >
        <Calendar className="h-4 w-4 mr-2" />
        {translate("doctorChat", "appointment", language) || "Appointment"}
      </TabsTrigger>
      <TabsTrigger 
        value="history" 
        onClick={() => onTabChange("history")}
        className={activeTab === "history" ? "bg-calmBlue-500 text-white" : ""}
      >
        <FileText className="h-4 w-4 mr-2" />
        {translate("doctorChat", "history", language) || "History"}
      </TabsTrigger>
    </TabsList>
  );
};

