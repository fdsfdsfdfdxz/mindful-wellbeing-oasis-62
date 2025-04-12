
import React from 'react';
import { cn } from '@/lib/utils';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

export interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  isRTL?: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  isTyping,
  isRTL = false
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "flex",
            message.sender === 'user' 
              ? isRTL ? "justify-start" : "justify-end" 
              : isRTL ? "justify-end" : "justify-start"
          )}
        >
          <div
            className={cn(
              "max-w-[80%] rounded-lg px-4 py-2",
              message.sender === 'user'
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground",
              isRTL && message.sender === 'user' 
                ? "rounded-l-lg rounded-r-none" 
                : isRTL && message.sender === 'agent'
                ? "rounded-r-lg rounded-l-none"
                : message.sender === 'user'
                ? "rounded-l-lg rounded-r-none"
                : "rounded-r-lg rounded-l-none"
            )}
          >
            <p className="whitespace-pre-wrap">{message.content}</p>
            <div className={cn(
              "text-xs mt-1",
              message.sender === 'user' ? "text-primary-foreground/70" : "text-secondary-foreground/70",
              isRTL ? "text-right" : "text-left"
            )}>
              {message.timestamp.toLocaleTimeString(isRTL ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      ))}
      
      {isTyping && (
        <div className={cn("flex", isRTL ? "justify-end" : "justify-start")}>
          <div className="max-w-[80%] rounded-lg px-4 py-2 bg-secondary text-secondary-foreground">
            <div className="flex space-x-1">
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '300ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '600ms' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
