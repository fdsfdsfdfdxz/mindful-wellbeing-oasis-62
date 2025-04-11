
import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Image, Paperclip, Smile, CheckCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  attachment?: {
    type: 'image' | 'file';
    url: string;
    name: string;
  };
}

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isEncrypted, setIsEncrypted] = useState(true);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const { language, isRTL } = useLanguage();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize with welcome message if no messages
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        content: translate('liveChat', 'greeting', language),
        sender: 'agent',
        timestamp: new Date(),
        status: 'read'
      };
      setMessages([welcomeMessage]);
    }
  }, [language, messages.length]);
  
  // Simulate agent typing and response
  const simulateAgentResponse = () => {
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate delay for agent response (1.5 - 3.5 seconds)
    const responseTime = 1500 + Math.random() * 2000;
    
    setTimeout(() => {
      setIsTyping(false);
      
      const agentResponses = [
        translate('liveChat', 'supportResponse1', language) || "Thank you for your message! How can I help you today?",
        translate('liveChat', 'supportResponse2', language) || "I understand. Could you please provide more details?",
        translate('liveChat', 'supportResponse3', language) || "Our specialist will contact you shortly. Is there anything else you'd like to know?",
        translate('liveChat', 'supportResponse4', language) || "We're here to support you. Would you prefer to speak with a doctor directly?"
      ];
      
      const randomResponse = agentResponses[Math.floor(Math.random() * agentResponses.length)];
      
      const newAgentMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        sender: 'agent',
        timestamp: new Date(),
        status: 'read'
      };
      
      setMessages(prev => [...prev, newAgentMessage]);
    }, responseTime);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    
    if (!isOpen) {
      toast({
        title: translate('liveChat', 'chatOpened', language) || "Live Chat Opened",
        description: translate('liveChat', 'supportAvailable', language) || "Our support team is ready to assist you",
      });
    }
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim() === '') return;
    
    // Create new message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
      status: 'sending'
    };
    
    // Add to messages
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Simulate message sending process
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id ? { ...msg, status: 'sent' } : msg
        )
      );
      
      // After another delay, mark as delivered
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === userMessage.id ? { ...msg, status: 'delivered' } : msg
          )
        );
        
        // Simulate agent reading message
        setTimeout(() => {
          setMessages(prev => 
            prev.map(msg => 
              msg.id === userMessage.id ? { ...msg, status: 'read' } : msg
            )
          );
          
          // Simulate agent response
          simulateAgentResponse();
        }, 1000);
      }, 1000);
    }, 500);
  };
  
  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if image
    const isImage = file.type.startsWith('image/');
    
    // Simulate upload (in real app, would upload to server)
    toast({
      title: translate('liveChat', 'uploading', language) || "Uploading...",
      description: file.name,
    });
    
    // Simulate delay for upload
    setTimeout(() => {
      // Create message with attachment
      const fileMessage: Message = {
        id: Date.now().toString(),
        content: '',
        sender: 'user',
        timestamp: new Date(),
        status: 'sent',
        attachment: {
          type: isImage ? 'image' : 'file',
          url: URL.createObjectURL(file),
          name: file.name
        }
      };
      
      setMessages(prev => [...prev, fileMessage]);
      
      toast({
        title: translate('liveChat', 'fileUploaded', language) || "File uploaded",
        description: file.name,
      });
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Simulate agent response after a delay
      setTimeout(() => {
        simulateAgentResponse();
      }, 2000);
    }, 1500);
  };
  
  const toggleAnonymousMode = () => {
    setIsAnonymous(!isAnonymous);
    toast({
      title: !isAnonymous 
        ? translate('liveChat', 'anonymousModeOn', language) || "Anonymous Mode Activated" 
        : translate('liveChat', 'anonymousModeOff', language) || "Anonymous Mode Deactivated",
      description: !isAnonymous 
        ? translate('liveChat', 'anonymousModeDesc', language) || "Your identity is now hidden from support agents" 
        : translate('liveChat', 'identityVisible', language) || "Your identity is now visible to support agents",
    });
  };
  
  // Function to get message status icon
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
  
  // Render timestamp in appropriate format
  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'ar', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  return (
    <div className={`fixed ${isRTL ? 'left-6' : 'right-6'} bottom-6 z-50`}>
      {isOpen ? (
        <div className="bg-card text-card-foreground border border-border rounded-lg shadow-xl w-72 sm:w-96 overflow-hidden animate-scale-in">
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
              onClick={toggleChat}
              className="text-primary-foreground hover:bg-primary/90 p-1 h-auto"
              aria-label={translate('liveChat', 'close', language) || "Close chat"}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="h-80 p-4 bg-muted/50 overflow-y-auto" aria-live="polite">
            <div className={`flex flex-col space-y-4 ${isRTL ? 'items-end' : 'items-start'}`}>
              {messages.map((message) => (
                <div 
                  key={message.id} 
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
              ))}
              
              {isTyping && (
                <div className="bg-primary/10 text-foreground p-3 rounded-lg rounded-tl-none max-w-[85%] self-start">
                  <div className="flex space-x-1 items-center">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
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
