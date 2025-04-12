
import React from "react";
import { CheckCheck, Clock, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { Message } from "./types";

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { language, isRTL } = useLanguage();
  
  const getMessageStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sending':
        return <Clock className="h-3 w-3 text-muted-foreground" />;
      case 'sent':
        return <CheckCheck className="h-3 w-3 text-muted-foreground" />;
      case 'delivered':
        return <CheckCheck className="h-3 w-3 text-blue-500" />;
      case 'read':
        return <CheckCheck className="h-3 w-3 text-green-500" />;
      default:
        return null;
    }
  };
  
  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'ar', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  return (
    <div 
      className={cn(
        "max-w-[85%]",
        message.sender === "user" ? "self-end" : "self-start"
      )}
    >
      <div 
        className={cn(
          "p-3 rounded-lg",
          message.sender === "user" 
            ? "bg-primary text-primary-foreground rounded-br-none" 
            : "bg-primary/10 text-foreground rounded-tl-none"
        )}
      >
        {message.attachment && (
          <div className="mb-2">
            {message.attachment.type === 'image' ? (
              <img 
                src={message.attachment.url} 
                alt={message.attachment.name}
                className="rounded-md max-h-32 max-w-full"
              />
            ) : (
              <div className="bg-background/50 rounded p-2 flex items-center">
                <Paperclip className="h-4 w-4 mr-2" />
                <span className="text-sm truncate">{message.attachment.name}</span>
              </div>
            )}
          </div>
        )}
        {message.content && <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>}
        <div className="flex items-center justify-end mt-1 text-xs">
          <span className={message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}>
            {formatTimestamp(message.timestamp)}
          </span>
          {message.sender === 'user' && (
            <span className="ml-1">{getMessageStatusIcon(message.status)}</span>
          )}
        </div>
      </div>
    </div>
  );
};
