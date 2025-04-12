
import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { LiveChatContainer } from './LiveChatContainer';

interface LiveChatViewProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const LiveChatView: React.FC<LiveChatViewProps> = ({
  isOpen,
  onToggle
}) => {
  return (
    <div className="transition-all duration-300">
      {isOpen ? (
        <Card className="w-80 md:w-96 shadow-lg">
          <LiveChatContainer onClose={onToggle} />
        </Card>
      ) : (
        <Button 
          onClick={onToggle}
          className="rounded-full w-12 h-12 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
          aria-label="Open chat"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};
