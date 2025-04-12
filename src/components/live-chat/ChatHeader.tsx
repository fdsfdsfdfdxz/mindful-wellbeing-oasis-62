
import React from 'react';
import { Lock, ShieldCheck, User, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b">
      <div className="flex items-center">
        <h3 className="font-semibold text-lg mr-2">Live Support</h3>
        <div className="flex space-x-1">
          {isEncrypted && (
            <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
              <Lock className="h-3 w-3" />
              <span className="text-xs">Secure</span>
            </Badge>
          )}
          {isAnonymous && (
            <Badge variant="outline" className="flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200">
              <User className="h-3 w-3" />
              <span className="text-xs">Anonymous</span>
            </Badge>
          )}
        </div>
      </div>
      <button 
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700 transition-colors"
        aria-label="Close chat"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};
