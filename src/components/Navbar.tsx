
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { DesktopNavbar } from './navbar/DesktopNavbar';
import { MobileMenu } from './navbar/MobileMenu';
import { useTheme } from '@/components/theme/ThemeProvider';

const Navbar = () => {
  const { language, isRTL } = useLanguage();
  const { theme } = useTheme();

  // Update document direction when language changes
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [language, isRTL]);

  return (
    <header className="sticky top-0 z-50">
      <nav className={`bg-background/95 dark:bg-background/90 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-sm transition-all duration-500 ${theme === 'dark' ? 'shadow-calmBlue-900/10' : ''}`}>
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
