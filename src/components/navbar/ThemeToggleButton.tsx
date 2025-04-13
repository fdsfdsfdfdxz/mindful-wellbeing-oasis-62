
import { MoonStar, Sun } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useTheme } from '@/components/theme/ThemeProvider';
import { useLanguage } from '@/contexts/LanguageContext';
import { translate } from '@/utils/translations';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

interface ThemeToggleButtonProps {
  setIsMenuOpen?: (isOpen: boolean) => void;
  isMobile?: boolean;
}

export const ThemeToggleButton = ({ 
  setIsMenuOpen, 
  isMobile = false 
}: ThemeToggleButtonProps) => {
  const { theme, setTheme } = useTheme();
  const { language } = useLanguage();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    if (setIsMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  if (isMobile) {
    return (
      <button 
        className="flex items-center justify-between py-3 px-4 rounded-md hover:bg-muted w-full text-left transition-colors group"
        onClick={toggleTheme}
      >
        <span className="font-medium">
          {translate("theme", theme === "dark" ? "switchToLight" : "switchToDark", language)}
        </span>
        <div className="relative">
          {theme === "dark" ? (
            <Sun className="h-5 w-5 animate-spin-slow group-hover:animate-pulse" />
          ) : (
            <MoonStar className="h-5 w-5 group-hover:animate-pulse" />
          )}
        </div>
      </button>
    );
  }

  return <ThemeToggle />;
};
