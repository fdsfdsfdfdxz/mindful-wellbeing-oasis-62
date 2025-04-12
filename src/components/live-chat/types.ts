
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  status: MessageStatus;
  attachment?: {
    type: 'image' | 'file';
    url: string;
    name: string;
  };
}

export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read';
