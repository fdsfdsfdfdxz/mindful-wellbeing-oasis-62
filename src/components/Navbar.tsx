
import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { DesktopNavbar } from './navbar/DesktopNavbar';
import { MobileMenu } from './navbar/MobileMenu';
import { useTheme } from '@/components/theme/ThemeProvider';

const Navbar = () => {
  const { language, isRTL } = useLanguage();
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  // Update document direction when language changes
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [language, isRTL]);

  // Track scroll position to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 animate-fade-in">
      <nav className={`bg-background/95 dark:bg-background/90 backdrop-blur-md border-b border-border sticky top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? `shadow-sm ${theme === 'dark' ? 'shadow-calmBlue-900/10' : ''}`
          : 'py-2'
      }`}>
        <div className="container-custom py-2 md:py-0">
          <div className="flex justify-between items-center">
            <div className="md:hidden">
              <MobileMenu />
            </div>
            <DesktopNavbar />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
