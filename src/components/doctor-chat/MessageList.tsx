
import React from "react";
import { User, MessageSquare } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";
import { Message } from "@/types/chat";
import { Doctor } from "@/types/doctor";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  selectedDoctor: string | null;
  doctors: Doctor[];
}

export const MessageList = ({ messages, isLoading, selectedDoctor, doctors }: MessageListProps) => {
  const { language } = useLanguage();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-calmBlue-500"></div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <MessageSquare className="h-10 w-10 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500">
            {translate("doctorChat", "noMessages", language) ||
              "No messages yet. Start the conversation!"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {message.sender === "doctor" && selectedDoctor && (
            <div className="mr-2">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src={doctors.find((d) => d.id === selectedDoctor)?.photo}
                  alt="Doctor"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
          <div
            className={`max-w-[75%] rounded-lg p-3 ${
              message.sender === "user"
                ? "bg-calmBlue-500 text-white"
                : "bg-white border border-gray-200"
            }`}
          >
            <p className="whitespace-pre-wrap break-words">{message.text}</p>
            <p
              className={`text-xs mt-1 ${
                message.sender === "user" ? "text-calmBlue-100" : "text-gray-500"
              }`}
            >
              {formatDate(message.timestamp)}
            </p>
          </div>
          {message.sender === "user" && (
            <div className="ml-2">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-calmBlue-100 flex items-center justify-center">
                <User className="h-4 w-4 text-calmBlue-500" />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

