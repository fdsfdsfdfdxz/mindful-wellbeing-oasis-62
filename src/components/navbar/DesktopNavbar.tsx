
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { NavLinks } from './NavLinks';
import { ThemeToggleButton } from './ThemeToggleButton';
import { LanguageSelector } from './LanguageSelector';
import { UserMenu } from './UserMenu';
import { AuthButtons } from './AuthButtons';
import { useLanguage } from '@/contexts/LanguageContext';

export const DesktopNavbar = () => {
  const { isLoggedIn } = useAuth();
  const { isRTL } = useLanguage();

  return (
    <>
      <Link to="/" className="flex items-center">
        <span className="text-2xl font-bold text-primary">
          MindfulCare
        </span>
      </Link>

      <NavLinks />

      <div className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-4`}>
        <LanguageSelector />
        
        <ThemeToggleButton />
        
        {isLoggedIn ? (
          <UserMenu />
        ) : (
          <AuthButtons />
        )}
      </div>
    </>
  );
};
