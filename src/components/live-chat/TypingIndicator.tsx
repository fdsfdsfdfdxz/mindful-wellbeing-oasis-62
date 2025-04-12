
import React from "react";
import { useTheme } from "@/components/theme/ThemeProvider";

export const TypingIndicator: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className="bg-primary/10 text-foreground p-3 rounded-lg rounded-tl-none max-w-[85%] self-start">
      <div className="flex space-x-1 items-center">
        <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
};
