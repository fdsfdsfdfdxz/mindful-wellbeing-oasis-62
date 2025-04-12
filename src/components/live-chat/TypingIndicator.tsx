
import React from "react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { cn } from "@/lib/utils";

export const TypingIndicator: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className={cn(
      "bg-primary/10 text-foreground p-3 rounded-lg rounded-tl-none max-w-[85%] self-start",
      theme === 'dark' ? "bg-primary/20" : "bg-primary/10"
    )}>
      <div className="flex space-x-1 items-center">
        <div className={cn(
          "w-2 h-2 rounded-full animate-bounce",
          theme === 'dark' ? "bg-primary/70" : "bg-primary/50"
        )} style={{ animationDelay: '0ms' }}></div>
        <div className={cn(
          "w-2 h-2 rounded-full animate-bounce",
          theme === 'dark' ? "bg-primary/70" : "bg-primary/50"
        )} style={{ animationDelay: '150ms' }}></div>
        <div className={cn(
          "w-2 h-2 rounded-full animate-bounce",
          theme === 'dark' ? "bg-primary/70" : "bg-primary/50"
        )} style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
};
