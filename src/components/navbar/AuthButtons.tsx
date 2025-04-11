
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import { translate } from '@/utils/translations';

interface AuthButtonsProps {
  setIsMenuOpen?: (isOpen: boolean) => void;
  isMobile?: boolean;
}

export const AuthButtons = ({ 
  setIsMenuOpen, 
  isMobile = false 
}: AuthButtonsProps) => {
  const { language, isRTL } = useLanguage();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
    if (setIsMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const handleRegister = () => {
    navigate('/register');
    if (setIsMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  if (isMobile) {
    return (
      <div className={`flex ${isRTL ? 'flex-row-reverse' : ''} space-x-2 ${isRTL ? 'space-x-reverse' : ''} px-4`}>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-1/2 flex items-center justify-center"
          onClick={handleLogin}
        >
          <LogIn className="h-4 w-4 mr-1" />
          {translate('navbar', 'login', language)}
        </Button>
        <Button 
          variant="blue" 
          size="sm"
          className="w-1/2 flex items-center justify-center"
          onClick={handleRegister}
        >
          <UserPlus className="h-4 w-4 mr-1" />
          {translate('navbar', 'register', language)}
        </Button>
      </div>
    );
  }

  return (
    <>
      <Button variant="outline" size="sm" onClick={handleLogin}>
        <LogIn className="h-4 w-4 mr-1" />
        {translate('navbar', 'login', language)}
      </Button>
      
      <Button variant="blue" size="sm" onClick={handleRegister}>
        <UserPlus className="h-4 w-4 mr-1" />
        {translate('navbar', 'register', language)}
      </Button>
    </>
  );
};
