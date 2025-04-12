
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";

interface ChatHeaderProps {
  isEncrypted: boolean;
  isAnonymous: boolean;
  onClose: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  isEncrypted,
  isAnonymous,
  onClose,
}) => {
  const { language } = useLanguage();

  return (
    <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
      <div className="flex items-center">
        <h3 className="font-medium">{translate('liveChat', 'title', language)}</h3>
        {isEncrypted && (
          <span className="ml-2 text-xs bg-primary-foreground/20 text-primary-foreground px-1.5 py-0.5 rounded-full">
            🔒 {translate('liveChat', 'encrypted', language) || "Encrypted"}
          </span>
        )}
        {isAnonymous && (
          <span className="ml-2 text-xs bg-primary-foreground/20 text-primary-foreground px-1.5 py-0.5 rounded-full">
            👤 {translate('liveChat', 'anonymous', language) || "Anonymous"}
          </span>
        )}
      </div>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={onClose}
        className="text-primary-foreground hover:bg-primary/90 p-1 h-auto"
        aria-label={translate('liveChat', 'close', language) || "Close chat"}
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
};
