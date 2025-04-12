
import React from 'react';
import { LiveChatView } from './live-chat/LiveChatView';
import { useLiveChat } from '@/hooks/useLiveChat';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast'; 
import { translate } from '@/utils/translations';

const LiveChat = () => {
  const { isOpen, toggleChat } = useLiveChat();
  const { language, isRTL } = useLanguage();
  const { toast } = useToast();

  const handleToggleChat = () => {
    toggleChat();
    
    if (!isOpen) {
      toast({
        title: translate('liveChat', 'chatOpened', language) || "Live Chat Opened",
        description: translate('liveChat', 'supportAvailable', language) || "Our support team is ready to assist you",
      });
    }
  };

  return (
    <div className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} z-50`}>
      <LiveChatView isOpen={isOpen} onToggle={handleToggleChat} />
    </div>
  );
};

export default LiveChat;
