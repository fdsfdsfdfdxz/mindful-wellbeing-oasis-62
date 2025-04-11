
import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, isRTL } = useLanguage();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`fixed ${isRTL ? 'left-6' : 'right-6'} bottom-6 z-50`}>
      {isOpen ? (
        <div className="bg-card text-card-foreground border border-border rounded-lg shadow-xl w-72 sm:w-80 overflow-hidden animate-scale-in">
          <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
            <h3 className="font-medium">{translate('liveChat', 'title', language)}</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={toggleChat}
              className="text-primary-foreground hover:bg-primary/90 p-1 h-auto"
              aria-label={translate('liveChat', 'close', language) || "Close chat"}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="h-80 p-4 bg-muted/50 overflow-y-auto" aria-live="polite">
            <div className={`flex flex-col space-y-4 ${isRTL ? 'items-end' : 'items-start'}`}>
              <div className={`bg-primary/10 text-foreground p-3 rounded-lg ${isRTL ? 'rounded-tr-none' : 'rounded-tl-none'} max-w-[85%]`}>
                <p className="text-sm">{translate('liveChat', 'greeting', language)}</p>
                <p className="text-xs text-muted-foreground mt-1">{translate('liveChat', 'supportTeam', language)} • {translate('liveChat', 'justNow', language)}</p>
              </div>
              
              <div className="text-center my-2 w-full">
                <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded-full">
                  {translate('liveChat', 'preview', language)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="p-3 border-t border-border">
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="text" 
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
            <div className="mt-2 text-xs text-muted-foreground text-center">
              {translate('liveChat', 'emergency', language)} <br />
              <a href="tel:+1800123456" className="text-primary underline font-medium">{translate('liveChat', 'hotline', language)}</a>
            </div>
          </div>
        </div>
      ) : (
        <Button 
          onClick={toggleChat}
          className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-lg flex items-center justify-center"
          aria-label={translate('liveChat', 'openChat', language) || "Open chat"}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default LiveChat;
