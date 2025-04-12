
import React, { useRef } from "react";
import { Paperclip, Send, Image, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";
import { cn } from "@/lib/utils";

interface MessageFormProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: (e: React.FormEvent) => void;
  handleFileButtonClick: () => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleAnonymousMode: () => void;
  isAnonymous: boolean;
}

export const MessageForm: React.FC<MessageFormProps> = ({
  newMessage,
  setNewMessage,
  handleSendMessage,
  handleFileButtonClick,
  handleFileUpload,
  toggleAnonymousMode,
  isAnonymous
}) => {
  const { language, isRTL } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="p-3 border-t border-border">
      <form className="flex" onSubmit={handleSendMessage}>
        <input 
          type="text" 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={translate('liveChat', 'typePlaceholder', language)}
          className={`flex-1 bg-background border border-input ${isRTL ? 'rounded-r-md' : 'rounded-l-md'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent`}
          aria-label={translate('liveChat', 'messageInput', language) || "Type your message"}
        />
        <Button 
          className={`bg-primary text-primary-foreground hover:bg-primary/90 ${isRTL ? 'rounded-r-none' : 'rounded-l-none'} flex items-center`}
          type="submit"
          aria-label={translate('liveChat', 'send', language) || "Send message"}
        >
          {isRTL && <Send className="h-4 w-4 ml-2" />}
          {translate('liveChat', 'send', language)}
          {!isRTL && <Send className="h-4 w-4 ml-2" />}
        </Button>
      </form>
      
      <div className="mt-3 flex justify-between items-center">
        <div className="flex space-x-2">
          <button 
            onClick={handleFileButtonClick}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label={translate('liveChat', 'attachment', language) || "Attach file"}
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={handleFileUpload}
            accept="image/*,.pdf,.doc,.docx,.txt"
          />
          <button 
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label={translate('liveChat', 'image', language) || "Attach image"}
          >
            <Image className="h-5 w-5" />
          </button>
          <button 
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label={translate('liveChat', 'emoji', language) || "Insert emoji"}
          >
            <Smile className="h-5 w-5" />
          </button>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleAnonymousMode}
          className={cn(
            "text-xs", 
            isAnonymous ? "bg-primary/10 text-primary" : "text-muted-foreground"
          )}
        >
          {isAnonymous 
            ? translate('liveChat', 'anonymousActive', language) || "Anonymous" 
            : translate('liveChat', 'goAnonymous', language) || "Go Anonymous"}
        </Button>
      </div>
      
      <div className="mt-2 text-xs text-muted-foreground text-center">
        {translate('liveChat', 'emergency', language)} <br />
        <a href="tel:+1800123456" className="text-primary underline font-medium">{translate('liveChat', 'hotline', language)}</a>
      </div>
    </div>
  );
};
