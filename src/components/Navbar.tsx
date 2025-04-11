
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { DesktopNavbar } from './navbar/DesktopNavbar';
import { MobileMenu } from './navbar/MobileMenu';

const Navbar = () => {
  const { language, isRTL } = useLanguage();

  // Update document direction when language changes
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [language, isRTL]);

  return (
    <header>
      <nav className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container-custom py-4">
          <div className="flex justify-between items-center">
            <DesktopNavbar />
            <MobileMenu />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
