
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { DesktopNavbar } from './navbar/DesktopNavbar';
import { MobileMenu } from './navbar/MobileMenu';

const Navbar = () => {
  const { language, isRTL } = useLanguage();

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [language, isRTL]);

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          <DesktopNavbar />
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
