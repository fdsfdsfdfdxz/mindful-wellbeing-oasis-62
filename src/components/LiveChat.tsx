
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/components/theme/ThemeProvider";
import { cn } from "@/lib/utils";
import { useLiveChat } from "@/hooks/useLiveChat";
import { LiveChatView } from "./live-chat/LiveChatView";

const LiveChat = () => {
  const { isOpen, toggleChat } = useLiveChat();
  const { isRTL } = useLanguage();
  const { theme } = useTheme();
  
  return (
    <div 
      className={cn(
        "fixed bottom-6 z-50 transition-all duration-300 ease-in-out",
        isRTL ? "left-6" : "right-6",
        theme === 'dark' ? "dark:text-gray-200" : "text-gray-800"
      )}
    >
      <LiveChatView 
        isOpen={isOpen}
        onToggle={toggleChat}
      />
    </div>
  );
};

export default LiveChat;
