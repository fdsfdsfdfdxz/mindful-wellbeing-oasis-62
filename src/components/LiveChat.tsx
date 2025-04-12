
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { translate } from "@/utils/translations";
import { LiveChatContainer } from "./live-chat/LiveChatContainer";
import { ChatTriggerButton } from "./live-chat/ChatTriggerButton";

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isRTL } = useLanguage();
  const { toast } = useToast();
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
    
    if (!isOpen) {
      toast({
        title: translate('liveChat', 'chatOpened', language) || "Live Chat Opened",
        description: translate('liveChat', 'supportAvailable', language) || "Our support team is ready to assist you",
      });
    }
  };

  return (
    <div className={`fixed ${isRTL ? 'left-6' : 'right-6'} bottom-6 z-50`}>
      {isOpen ? (
        <LiveChatContainer onClose={toggleChat} />
      ) : (
        <ChatTriggerButton onClick={toggleChat} />
      )}
    </div>
  );
};

export default LiveChat;
