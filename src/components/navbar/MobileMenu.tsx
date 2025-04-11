
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { NavLinks } from './NavLinks';
import { ThemeToggleButton } from './ThemeToggleButton';
import { LanguageSelector } from './LanguageSelector';
import { UserMenu } from './UserMenu';
import { AuthButtons } from './AuthButtons';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

export const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const { isRTL } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="md:hidden mobile-menu-container">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={toggleMenu}
        className="p-1"
      >
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {isMenuOpen && (
        <div className={`md:hidden py-4 animate-fade-in ${isRTL ? 'rtl' : ''}`}>
          <NavLinks setIsMenuOpen={setIsMenuOpen} isMobile />
          
          <div className="border-t border-border my-2"></div>
          
          <ThemeToggleButton setIsMenuOpen={setIsMenuOpen} isMobile />

          <LanguageSelector setIsMenuOpen={setIsMenuOpen} isMobile />

          <div className="border-t border-border my-2"></div>

          {isLoggedIn ? (
            <UserMenu setIsMenuOpen={setIsMenuOpen} isMobile />
          ) : (
            <AuthButtons setIsMenuOpen={setIsMenuOpen} isMobile />
          )}
        </div>
      )}
    </div>
  );
};
