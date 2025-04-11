import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Globe, 
  User,
  LogOut,
  UserPlus,
  MoonStar,
  Sun,
  LogIn
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { translate } from '@/utils/translations';
import { useToast } from "@/components/ui/use-toast";
import { ThemeToggle } from './theme/ThemeToggle';
import { useTheme } from './theme/ThemeProvider';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, switchLanguage, isRTL } = useLanguage();
  const { isLoggedIn, userEmail, logout } = useAuth();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLanguageChange = (newLanguage: 'en' | 'ar') => {
    if (newLanguage !== language) {
      switchLanguage(newLanguage);
      
      toast({
        title: newLanguage === 'en' ? "Language Changed" : "تم تغيير اللغة",
        description: newLanguage === 'en' 
          ? "The site language has been changed to English" 
          : "تم تغيير لغة الموقع إلى العربية",
        duration: 3000
      });
    }
    
    setIsMenuOpen(false);
  };

  const handleLogin = () => {
    navigate('/login');
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: translate('auth', 'logoutSuccess', language),
      description: translate('auth', 'comeBackSoon', language),
      duration: 3000
    });
    setIsMenuOpen(false);
  };

  const handleRegister = () => {
    navigate('/register');
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setIsMenuOpen(false);
  };

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [language, isRTL]);

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">
              MindfulCare
            </span>
          </Link>

          <div className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-8`}>
            <a href="#services" className="text-foreground hover:text-primary transition-colors">
              {translate('navbar', 'services', language)}
            </a>
            <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">
              {translate('navbar', 'howItWorks', language)}
            </a>
            <a href="#specialists" className="text-foreground hover:text-primary transition-colors">
              {translate('navbar', 'specialists', language)}
            </a>
            <a href="#plans" className="text-foreground hover:text-primary transition-colors">
              {translate('navbar', 'plans', language)}
            </a>
          </div>

          <div className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-4`}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Globe className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} /> 
                  {language === 'en' ? 'EN' : 'عربي'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRTL ? "start" : "end"}>
                <DropdownMenuItem 
                  onClick={() => handleLanguageChange('en')}
                  className={language === 'en' ? "bg-muted" : ""}
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleLanguageChange('ar')}
                  className={language === 'ar' ? "bg-muted" : ""}
                >
                  العربية
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <ThemeToggle />
            
            {isLoggedIn ? (
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
            ) : (
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
            )}
          </div>

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

        {isMenuOpen && (
          <div className={`md:hidden py-4 animate-fade-in ${isRTL ? 'rtl' : ''}`}>
            <div className="flex flex-col space-y-4">
              <a 
                href="#services" 
                className="text-foreground hover:text-primary transition-colors py-2 px-4 rounded-md hover:bg-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                {translate('navbar', 'services', language)}
              </a>
              <a 
                href="#how-it-works" 
                className="text-foreground hover:text-primary transition-colors py-2 px-4 rounded-md hover:bg-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                {translate('navbar', 'howItWorks', language)}
              </a>
              <a 
                href="#specialists" 
                className="text-foreground hover:text-primary transition-colors py-2 px-4 rounded-md hover:bg-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                {translate('navbar', 'specialists', language)}
              </a>
              <a 
                href="#plans" 
                className="text-foreground hover:text-primary transition-colors py-2 px-4 rounded-md hover:bg-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                {translate('navbar', 'plans', language)}
              </a>

              <div className="border-t border-border my-2"></div>
              
              <button 
                className="flex items-center justify-between py-2 px-4 rounded-md hover:bg-muted"
                onClick={toggleTheme}
              >
                <span>{translate("theme", theme === "dark" ? "switchToLight" : "switchToDark", language)}</span>
                {theme === "dark" ? 
                  <Sun className="h-4 w-4" /> : 
                  <MoonStar className="h-4 w-4" />
                }
              </button>

              <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''} py-2 px-4`}>
                <Globe className="h-4 w-4" />
                <span className={`${isRTL ? 'mr-2' : 'ml-2'}`}>
                  {isRTL ? 'اختر اللغة:' : 'Select Language:'}
                </span>
              </div>
              <div className={`flex ${isRTL ? 'flex-row-reverse' : ''} space-x-2 ${isRTL ? 'space-x-reverse' : ''} px-4`}>
                <Button 
                  variant={language === 'en' ? "default" : "outline"}
                  size="sm" 
                  className="w-full" 
                  onClick={() => handleLanguageChange('en')}
                >
                  English
                </Button>
                <Button 
                  variant={language === 'ar' ? "default" : "outline"}
                  size="sm" 
                  className="w-full" 
                  onClick={() => handleLanguageChange('ar')}
                >
                  العربية
                </Button>
              </div>

              <div className="border-t border-border my-2"></div>

              {isLoggedIn ? (
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
              ) : (
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
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
