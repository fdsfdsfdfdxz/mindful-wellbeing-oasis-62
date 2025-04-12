
import React, { useState } from 'react';
import { CardContent, CardHeader } from '@/components/ui/card';
import { ChatHeader, ChatHeaderProps } from './ChatHeader';
import { MessageList, MessageListProps, Message } from './MessageList';
import { MessageForm, MessageFormProps } from './MessageForm';
import { useToast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';

interface LiveChatContainerProps {
  onClose: () => void;
}

export const LiveChatContainer: React.FC<LiveChatContainerProps> = ({ onClose }) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! How can I help you today?',
      sender: 'agent',
      timestamp: new Date(),
      status: 'read'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Header props
  const headerProps: ChatHeaderProps = {
    isEncrypted: true,
    isAnonymous: false,
    onClose: onClose
  };

  // Message list props
  const messageListProps: MessageListProps = {
    messages,
    isTyping
  };

  // Handle sending messages
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsSubmitting(true);
    
    // Simulate agent typing
    setIsTyping(true);
    
    // Simulate agent response
    setTimeout(() => {
      setIsTyping(false);
      
      const agentMessage: Message = {
        id: uuidv4(),
        content: "Thank you for your message. One of our mental health professionals will respond shortly. Is there anything specific you'd like to discuss today?",
        sender: 'agent',
        timestamp: new Date(),
        status: 'sent'
      };
      
      setMessages(prev => [...prev, agentMessage]);
      setIsSubmitting(false);
    }, 2000);
  };

  // Handle file uploads
  const handleFileButtonClick = () => {
    toast({
      title: "File uploads",
      description: "File upload functionality will be available soon.",
    });
  };

  // Toggle recording
  const toggleRecording = () => {
    setIsRecording(prev => !prev);
    
    if (!isRecording) {
      toast({
        title: "Recording started",
        description: "Voice recording functionality will be available soon.",
      });
    } else {
      toast({
        title: "Recording stopped",
      });
    }
  };

  // Message form props
  const messageFormProps: MessageFormProps = {
    newMessage,
    setNewMessage,
    handleSendMessage,
    handleFileButtonClick,
    isRecording,
    toggleRecording,
    isSubmitting
  };

  return (
    <>
      <CardHeader className="p-0">
        <ChatHeader {...headerProps} />
      </CardHeader>
      <CardContent className="p-0 flex flex-col h-[400px]">
        <MessageList {...messageListProps} />
        <MessageForm {...messageFormProps} />
      </CardContent>
    </>
  );
};
