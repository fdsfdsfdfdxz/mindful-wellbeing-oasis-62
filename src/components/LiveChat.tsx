
import React from 'react';
import { LiveChatView } from './live-chat/LiveChatView';
import { useLiveChat } from '@/hooks/useLiveChat';

const LiveChat = () => {
  const { isOpen, toggleChat } = useLiveChat();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <LiveChatView isOpen={isOpen} onToggle={toggleChat} />
    </div>
  );
};

export default LiveChat;
