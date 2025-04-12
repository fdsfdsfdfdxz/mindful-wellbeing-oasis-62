import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';  // Correct import for v4 uuid generation
import { CardContent, CardHeader } from '@/components/ui/card';
import { ChatHeader, ChatHeaderProps } from './ChatHeader';
import { MessageList, MessageListProps, Message } from './types';  // Importing from types file
import { MessageForm, MessageFormProps } from './MessageForm';
import { useToast } from '@/components/ui/use-toast';

export const LiveChatContainer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(), // Use uuidv4() here
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
