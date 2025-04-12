
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Paperclip, Send, Mic, Image } from 'lucide-react';

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (newMessage.trim()) {
        handleSendMessage(e as unknown as React.FormEvent);
      }
    }
  };

  return (
    <form onSubmit={handleSendMessage} className="border-t p-3">
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="resize-none min-h-[60px] pr-10"
            disabled={isSubmitting}
          />
          <button
            type="button"
            onClick={handleFileButtonClick}
            className="absolute bottom-2 right-2 text-gray-400 hover:text-gray-600"
            aria-label="Attach file"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*,application/pdf"
          />
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            size="icon"
            variant={isRecording ? "destructive" : "secondary"}
            onClick={toggleRecording}
            className="rounded-full h-10 w-10"
            aria-label={isRecording ? "Stop recording" : "Start recording"}
          >
            <Mic className="h-5 w-5" />
          </Button>
          <Button
            type="submit"
            size="icon"
            disabled={!newMessage.trim() || isSubmitting}
            className="rounded-full h-10 w-10"
            aria-label="Send message"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </form>
  );
};
