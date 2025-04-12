
import React from 'react';
import { X, Lock, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { translate } from '@/utils/translations';

export interface ChatHeaderProps {
  isEncrypted: boolean;
  isAnonymous: boolean;
  onClose: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  isEncrypted,
  isAnonymous,
  onClose
}) => {
  const { language, isRTL } = useLanguage();
  
  return (
    <div className={`flex items-center justify-between p-4 border-b ${isRTL ? 'flex-row-reverse' : ''}`}>
      <div className="flex items-center">
        <h2 className={`text-lg font-semibold ${isRTL ? 'ml-2' : 'mr-2'}`}>
          {translate('liveChat', 'title', language) || "Live Support"}
        </h2>
        
        {isEncrypted && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="ml-2">
                  <Lock className="h-3 w-3 mr-1" />
                  {translate('liveChat', 'encrypted', language) || "Encrypted"}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                {translate('liveChat', 'encryptedDesc', language) || "Your conversation is end-to-end encrypted"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      
      <div className="flex items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle 
                aria-label={translate('liveChat', 'anonymousToggle', language) || "Toggle anonymous mode"}
                pressed={isAnonymous}
                className="mr-2"
              >
                <UserRound className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              {isAnonymous ? 
                (translate('liveChat', 'anonymousModeOn', language) || "Anonymous mode is on") : 
                (translate('liveChat', 'goAnonymous', language) || "Go anonymous")}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <Button 
          size="icon" 
          variant="ghost" 
          onClick={onClose}
          aria-label={translate('liveChat', 'close', language) || "Close chat"}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
