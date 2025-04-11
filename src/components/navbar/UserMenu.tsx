
import { useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { translate } from '@/utils/translations';
import { useToast } from "@/components/ui/use-toast";

interface UserMenuProps {
  setIsMenuOpen?: (isOpen: boolean) => void;
  isMobile?: boolean;
}

export const UserMenu = ({ 
  setIsMenuOpen, 
  isMobile = false 
}: UserMenuProps) => {
  const { isLoggedIn, userEmail, logout } = useAuth();
  const { language, isRTL } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast({
      title: translate('auth', 'logoutSuccess', language),
      description: translate('auth', 'comeBackSoon', language),
      duration: 3000
    });
    
    if (setIsMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  if (!isLoggedIn) return null;

  if (isMobile) {
    return (
      <div className="px-4 space-y-2">
        <div className="flex items-center py-2">
          <User className="h-4 w-4" />
          <span className="ml-2 font-medium">{userEmail}</span>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full flex items-center justify-center"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          {translate('auth', 'logout', language)}
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-full">
          <User className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
          {userEmail ? userEmail.split('@')[0] : translate('auth', 'account', language)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={isRTL ? "start" : "end"}>
        <DropdownMenuItem>
          {translate('auth', 'profile', language)}
        </DropdownMenuItem>
        <DropdownMenuItem>
          {translate('auth', 'settings', language)}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {translate('auth', 'logout', language)}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
