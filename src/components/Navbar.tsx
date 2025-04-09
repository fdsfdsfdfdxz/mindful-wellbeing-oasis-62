
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Globe, 
  User
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useLanguage } from '@/contexts/LanguageContext';
import { translate } from '@/utils/translations';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, switchLanguage } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLanguageChange = (newLanguage: 'en' | 'ar') => {
    switchLanguage(newLanguage);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <span className="text-2xl font-bold text-calmBlue-600">
              MindfulCare
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-gray-700 hover:text-calmBlue-600 transition-colors">
              {translate('navbar', 'services', language)}
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-calmBlue-600 transition-colors">
              {translate('navbar', 'howItWorks', language)}
            </a>
            <a href="#specialists" className="text-gray-700 hover:text-calmBlue-600 transition-colors">
              {translate('navbar', 'specialists', language)}
            </a>
            <a href="#plans" className="text-gray-700 hover:text-calmBlue-600 transition-colors">
              {translate('navbar', 'plans', language)}
            </a>
          </div>

          {/* Language Selector & Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Globe className="h-4 w-4 mr-1" /> {language.toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('ar')}>
                  العربية
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="outline" size="sm">
              {translate('navbar', 'login', language)}
            </Button>
            
            <Button className="bg-calmBlue-500 hover:bg-calmBlue-600">
              {translate('navbar', 'register', language)}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleMenu}
              className="p-1"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <a 
                href="#services" 
                className="text-gray-700 hover:text-calmBlue-600 transition-colors py-2 px-4 rounded-md hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {translate('navbar', 'services', language)}
              </a>
              <a 
                href="#how-it-works" 
                className="text-gray-700 hover:text-calmBlue-600 transition-colors py-2 px-4 rounded-md hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {translate('navbar', 'howItWorks', language)}
              </a>
              <a 
                href="#specialists" 
                className="text-gray-700 hover:text-calmBlue-600 transition-colors py-2 px-4 rounded-md hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {translate('navbar', 'specialists', language)}
              </a>
              <a 
                href="#plans" 
                className="text-gray-700 hover:text-calmBlue-600 transition-colors py-2 px-4 rounded-md hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {translate('navbar', 'plans', language)}
              </a>

              <div className="flex items-center space-x-2 py-2 px-4">
                <Globe className="h-4 w-4" />
                <span>Select Language:</span>
              </div>
              <div className="flex space-x-2 px-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full" 
                  onClick={() => handleLanguageChange('en')}
                >
                  English
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full" 
                  onClick={() => handleLanguageChange('ar')}
                >
                  العربية
                </Button>
              </div>

              <div className="border-t border-gray-200 my-2"></div>

              <div className="flex space-x-2 px-4">
                <Button variant="outline" size="sm" className="w-1/2">
                  {translate('navbar', 'login', language)}
                </Button>
                <Button className="bg-calmBlue-500 hover:bg-calmBlue-600 w-1/2">
                  {translate('navbar', 'register', language)}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
