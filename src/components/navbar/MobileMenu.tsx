
import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { NavLinks } from './NavLinks';
import { ThemeToggleButton } from './ThemeToggleButton';
import { LanguageSelector } from './LanguageSelector';
import { UserMenu } from './UserMenu';
import { AuthButtons } from './AuthButtons';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

export const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { isLoggedIn } = useAuth();
  const { isRTL } = useLanguage();
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsAnimating(true);
    if (isMenuOpen) {
      // Start closing animation
      document.body.style.overflow = 'auto';
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsAnimating(false);
      }, 300); // Match with CSS transition duration
    } else {
      // Open immediately and animate in
      setIsMenuOpen(true);
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && isMenuOpen) {
        toggleMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  // Handle escape key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        toggleMenu();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isMenuOpen]);

  return (
    <div className="block md:hidden mobile-menu-container" ref={menuRef}>
      <div className="flex items-center">
        <Link to="/" className="mr-auto">
          <span className="text-xl font-bold text-calmBlue-600 dark:text-calmBlue-400 hover:scale-105 transition-transform duration-300">MindfulCare</span>
        </Link>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleMenu}
          className="p-1 rounded-full hover:bg-calmBlue-50 dark:hover:bg-calmBlue-900/30 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? 
            <X className="h-6 w-6 transition-transform duration-300 rotate-0 animate-in" /> : 
            <Menu className="h-6 w-6 transition-transform duration-300 hover:scale-110" />
          }
        </Button>
      </div>

      {isMenuOpen && (
        <>
          <div 
            className={`fixed inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm z-40 ${isAnimating ? 'animate-fade-in' : ''}`} 
            aria-hidden="true" 
            onClick={toggleMenu}
          ></div>
          <div 
            className={`fixed top-16 ${isRTL ? 'right-0' : 'left-0'} bottom-0 w-4/5 max-w-sm bg-background/98 dark:bg-background/95 p-4 shadow-lg border-r border-border z-50 transform transition-all duration-300 ease-in-out ${
              isAnimating 
                ? isRTL 
                  ? 'animate-slide-in-left' 
                  : 'animate-slide-in-right' 
                : ''
            }`}
          >
            <div className={`flex flex-col h-full overflow-y-auto py-4 ${isRTL ? 'rtl' : ''}`}>
              <NavLinks setIsMenuOpen={setIsMenuOpen} isMobile />
              
              <div className="border-t border-border my-4"></div>
              
              <ThemeToggleButton setIsMenuOpen={setIsMenuOpen} isMobile />
              <LanguageSelector setIsMenuOpen={setIsMenuOpen} isMobile />

              <div className="border-t border-border my-4"></div>

              {isLoggedIn ? (
                <UserMenu setIsMenuOpen={setIsMenuOpen} isMobile />
              ) : (
                <AuthButtons setIsMenuOpen={setIsMenuOpen} isMobile />
              )}
              
              <div className="mt-auto pt-6">
                <div className="text-xs text-muted-foreground text-center">
                  © 2025 MindfulCare. All rights reserved.
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
