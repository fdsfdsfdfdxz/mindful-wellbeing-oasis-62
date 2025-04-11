
import { Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from "@/components/ui/use-toast";
import { translate } from '@/utils/translations';

interface LanguageSelectorProps {
  setIsMenuOpen?: (isOpen: boolean) => void;
  isMobile?: boolean;
}

export const LanguageSelector = ({ 
  setIsMenuOpen, 
  isMobile = false 
}: LanguageSelectorProps) => {
  const { language, switchLanguage, isRTL } = useLanguage();
  const { toast } = useToast();

  const handleLanguageChange = (newLanguage: 'en' | 'ar') => {
    if (newLanguage !== language) {
      switchLanguage(newLanguage);
      
      toast({
        title: newLanguage === 'en' ? "Language Changed" : "تم تغيير اللغة",
        description: newLanguage === 'en' 
          ? "The site language has been changed to English" 
          : "تم تغيير لغة الموقع إلى العربية",
        duration: 3000
      });
    }
    
    if (setIsMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  if (isMobile) {
    return (
      <>
        <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''} py-2 px-4`}>
          <Globe className="h-4 w-4" />
          <span className={`${isRTL ? 'mr-2' : 'ml-2'}`}>
            {isRTL ? 'اختر اللغة:' : 'Select Language:'}
          </span>
        </div>
        <div className={`flex ${isRTL ? 'flex-row-reverse' : ''} space-x-2 ${isRTL ? 'space-x-reverse' : ''} px-4`}>
          <Button 
            variant={language === 'en' ? "default" : "outline"}
            size="sm" 
            className="w-full" 
            onClick={() => handleLanguageChange('en')}
          >
            English
          </Button>
          <Button 
            variant={language === 'ar' ? "default" : "outline"}
            size="sm" 
            className="w-full" 
            onClick={() => handleLanguageChange('ar')}
          >
            العربية
          </Button>
        </div>
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-full">
          <Globe className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} /> 
          {language === 'en' ? 'EN' : 'عربي'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={isRTL ? "start" : "end"}>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('en')}
          className={language === 'en' ? "bg-muted" : ""}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('ar')}
          className={language === 'ar' ? "bg-muted" : ""}
        >
          العربية
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
