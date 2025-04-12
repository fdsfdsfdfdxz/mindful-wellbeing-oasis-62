
import { useState, useCallback } from 'react';

export const useLiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);
  
  return {
    isOpen,
    toggleChat
  };
};
