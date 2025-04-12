
import React from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";

interface ChatTriggerButtonProps {
  onClick: () => void;
}

export const ChatTriggerButton: React.FC<ChatTriggerButtonProps> = ({ onClick }) => {
  const { language } = useLanguage();
  
  return (
    <Button 
      onClick={onClick}
      className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-lg flex items-center justify-center"
      aria-label={translate('liveChat', 'openChat', language) || "Open chat"}
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  );
};
