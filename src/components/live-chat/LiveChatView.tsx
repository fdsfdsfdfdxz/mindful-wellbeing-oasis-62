
import React from "react";
import { LiveChatContainer } from "./LiveChatContainer";
import { ChatTriggerButton } from "./ChatTriggerButton";

interface LiveChatViewProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const LiveChatView: React.FC<LiveChatViewProps> = ({ 
  isOpen, 
  onToggle 
}) => {
  return isOpen ? (
    <LiveChatContainer onClose={onToggle} />
  ) : (
    <ChatTriggerButton onClick={onToggle} />
  );
};
