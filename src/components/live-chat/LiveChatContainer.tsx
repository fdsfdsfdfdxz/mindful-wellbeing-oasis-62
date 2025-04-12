
import { BackButton } from "@/components/navigation/BackButton";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { MessageForm } from "./MessageForm";

interface LiveChatContainerProps {
  onClose: () => void;
}

export const LiveChatContainer = ({ onClose }: LiveChatContainerProps) => {
  return (
    <div className="bg-background border border-border rounded-lg shadow-lg w-[350px] h-[500px] flex flex-col overflow-hidden">
      <ChatHeader onClose={onClose} />
      <div className="flex items-center px-4 py-2 border-b">
        <BackButton />
      </div>
      <div className="flex-1 overflow-hidden">
        <MessageList />
      </div>
      <MessageForm />
    </div>
  );
};
