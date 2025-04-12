
import React from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { translate } from '@/utils/translations';

export interface MessageFormProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: (e: React.FormEvent) => void;
  handleFileButtonClick: () => void;
  isRecording: boolean;
  toggleRecording: () => void;
  isSubmitting: boolean;
}

export const MessageForm: React.FC<MessageFormProps> = ({
  newMessage,
  setNewMessage,
  handleSendMessage,
  handleFileButtonClick,
  isRecording,
  toggleRecording,
  isSubmitting
}) => {
  const { language, isRTL } = useLanguage();
  
  return (
    <form onSubmit={handleSendMessage} className="p-4 border-t">
      <Textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder={translate('liveChat', 'typePlaceholder', language) || "Type your message..."}
        className="w-full resize-none mb-2"
        rows={3}
        disabled={isSubmitting}
      />
      
      <div className={cn("flex", isRTL ? "flex-row-reverse" : "")}>
        <div className="flex-1 flex items-center space-x-2">
          <Button 
            type="button" 
            variant="ghost" 
            size="icon"
            onClick={handleFileButtonClick}
            disabled={isSubmitting}
            title={translate('liveChat', 'attachment', language) || "Attach file"}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          
          <Button 
            type="button" 
            variant={isRecording ? "destructive" : "ghost"}
            size="icon"
            onClick={toggleRecording}
            disabled={isSubmitting}
            title={isRecording ? 
              (translate('liveChat', 'recordingStopped', language) || "Stop recording") : 
              (translate('liveChat', 'recording', language) || "Start recording")}
          >
            <Mic className="h-4 w-4" />
          </Button>
        </div>
        
        <Button 
          type="submit" 
          disabled={!newMessage.trim() || isSubmitting}
          className={cn(isRTL ? "ml-0 mr-auto" : "mr-0 ml-auto")}
        >
          {translate('liveChat', 'send', language) || "Send"}
          <Send className={cn("h-4 w-4", isRTL ? "mr-2" : "ml-2")} />
        </Button>
      </div>
    </form>
  );
};
