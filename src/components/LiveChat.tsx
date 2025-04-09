
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-72 sm:w-80 overflow-hidden animate-scale-in">
          <div className="bg-calmBlue-600 text-white p-4 flex items-center justify-between">
            <h3 className="font-medium">Live Support</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={toggleChat}
              className="text-white hover:bg-calmBlue-700 p-1 h-auto"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="h-80 p-4 bg-gray-50 overflow-y-auto">
            <div className="flex flex-col space-y-4">
              <div className="bg-calmBlue-100 text-calmBlue-800 p-3 rounded-lg rounded-tl-none max-w-[85%] self-start">
                <p className="text-sm">Hello! How can I help you today?</p>
                <p className="text-xs text-calmBlue-500 mt-1">Support Team • Just now</p>
              </div>
              
              <div className="text-center my-2">
                <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                  This is a live chat preview
                </span>
              </div>
            </div>
          </div>
          
          <div className="p-3 border-t border-gray-200">
            <div className="flex">
              <input 
                type="text" 
                placeholder="Type your message..." 
                className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-calmBlue-500 focus:border-transparent"
              />
              <Button 
                className="bg-calmBlue-500 hover:bg-calmBlue-600 rounded-l-none"
              >
                Send
              </Button>
            </div>
            <div className="mt-2 text-xs text-gray-500 text-center">
              For emergencies, please call our hotline at <br />
              <a href="tel:+1800123456" className="text-calmBlue-600 font-medium">1-800-123-456</a>
            </div>
          </div>
        </div>
      ) : (
        <Button 
          onClick={toggleChat}
          className="rounded-full w-14 h-14 bg-calmBlue-500 hover:bg-calmBlue-600 shadow-lg flex items-center justify-center"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default LiveChat;
