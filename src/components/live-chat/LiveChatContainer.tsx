
import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { translate } from "@/utils/translations";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { MessageForm } from "./MessageForm";
import { Message } from "./types";

interface LiveChatContainerProps {
  onClose: () => void;
}

export const LiveChatContainer: React.FC<LiveChatContainerProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isEncrypted, setIsEncrypted] = useState(true);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const { language } = useLanguage();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className="bg-card text-card-foreground border border-border rounded-lg shadow-xl w-72 sm:w-96 overflow-hidden animate-scale-in">
      <ChatHeader 
        isEncrypted={isEncrypted}
        isAnonymous={isAnonymous}
        onClose={onClose}
      />
      
      <MessageList 
        messages={messages}
        isTyping={isTyping}
      />
      
      <MessageForm 
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
        handleFileButtonClick={handleFileButtonClick}
        handleFileUpload={handleFileUpload}
        toggleAnonymousMode={toggleAnonymousMode}
        isAnonymous={isAnonymous}
      />
    </div>
  );
};
