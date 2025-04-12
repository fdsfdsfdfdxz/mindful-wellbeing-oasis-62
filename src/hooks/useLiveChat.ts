
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/components/theme/ThemeProvider";
import { translate } from "@/utils/translations";

export function useLiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const { toast } = useToast();
  const { theme } = useTheme();
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
    
    if (!isOpen) {
      toast({
        title: translate('liveChat', 'chatOpened', language) || "Live Chat Opened",
        description: translate('liveChat', 'supportAvailable', language) || "Our support team is ready to assist you",
        variant: theme === 'dark' ? 'destructive' : 'default'
      });
    }
  };

  return {
    isOpen,
    toggleChat
  };
}
