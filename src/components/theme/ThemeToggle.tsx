
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { language, isRTL } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="w-9 h-9 px-0 rounded-full transition-all duration-300 hover:bg-calmBlue-50 dark:hover:bg-calmBlue-900/30 hover:scale-110">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={isRTL ? "start" : "end"} className="animate-in zoom-in-90 backdrop-blur-sm bg-background/95 dark:bg-background/90 border-calmBlue-100 dark:border-gray-700">
        <DropdownMenuItem 
          onClick={() => setTheme("light")} 
          className={`cursor-pointer ${theme === 'light' ? 'bg-muted text-foreground' : ''} transition-colors hover:bg-calmBlue-50 dark:hover:bg-calmBlue-900/40`}
        >
          <Sun className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
          <span>{translate('theme', 'light', language) || "Light"}</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")} 
          className={`cursor-pointer ${theme === 'dark' ? 'bg-muted text-foreground' : ''} transition-colors hover:bg-calmBlue-50 dark:hover:bg-calmBlue-900/40`}
        >
          <Moon className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
          <span>{translate('theme', 'dark', language) || "Dark"}</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")} 
          className={`cursor-pointer ${theme === 'system' ? 'bg-muted text-foreground' : ''} transition-colors hover:bg-calmBlue-50 dark:hover:bg-calmBlue-900/40`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`}
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
          <span>{translate('theme', 'system', language) || "System"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
