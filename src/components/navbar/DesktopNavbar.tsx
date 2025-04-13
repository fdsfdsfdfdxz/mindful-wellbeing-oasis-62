
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ChevronDown, 
  User, 
  LogIn, 
  Languages,
  Sun,
  Moon
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { translate } from "@/utils/translations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "../theme/ThemeToggle";

export const DesktopNavbar = () => {
  const { language, switchLanguage, isRTL } = useLanguage();
  const { isLoggedIn, userEmail, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Track scroll position to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const servicesMenu = [
    { name: "Book Session", path: "/services/book-session" },
    { name: "Anonymous Consultation", path: "/services/anonymous-consultation" },
    { name: "Psychological Assessment", path: "/services/psychological-assessment" },
    { name: "Marriage Counseling", path: "/services/marriage-counseling" }
  ];

  return (
    <div className={`flex items-center justify-between w-full transition-all duration-300 ${
      isScrolled ? 'py-2 bg-white/95 backdrop-blur shadow-sm' : 'py-4'
    }`}>
      <div className="flex items-center">
        <Link to="/" className="flex items-center mr-10">
          <span className="text-2xl font-bold text-calmBlue-600 transition-transform duration-300 hover:scale-105">MindfulCare</span>
        </Link>
        
        <nav className={`hidden lg:flex items-center space-x-1 ${isRTL ? 'space-x-reverse' : ''}`}>
          <Link to="/" className="px-3 py-2 text-gray-700 hover:text-calmBlue-600 font-medium transition-colors relative group">
            {translate("nav", "home", language)}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-calmBlue-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="px-3 py-2 text-gray-700 hover:text-calmBlue-600 font-medium transition-colors flex items-center outline-none relative group">
                {translate("nav", "services", language)}
                <ChevronDown className="ml-1 h-4 w-4" />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-calmBlue-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 animate-in zoom-in-90 backdrop-blur-sm bg-white/95 border-calmBlue-100">
              {servicesMenu.map((item) => (
                <DropdownMenuItem key={item.path} className="focus:bg-calmBlue-50 focus:text-calmBlue-600">
                  <Link to={item.path} className="w-full py-1">
                    {translate("nav", item.name.toLowerCase().replace(/\s+/g, ""), language) || item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="focus:bg-calmBlue-50 focus:text-calmBlue-600">
                <Link to="/practitioners" className="w-full py-1">
                  {translate("nav", "findSpecialist", language) || "Find a Specialist"}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link to="#how-it-works" className="px-3 py-2 text-gray-700 hover:text-calmBlue-600 font-medium transition-colors relative group">
            {translate("nav", "howItWorks", language)}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-calmBlue-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          
          <Link to="/about" className="px-3 py-2 text-gray-700 hover:text-calmBlue-600 font-medium transition-colors relative group">
            {translate("nav", "about", language)}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-calmBlue-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          
          <Link to="/contact" className="px-3 py-2 text-gray-700 hover:text-calmBlue-600 font-medium transition-colors relative group">
            {translate("nav", "contact", language)}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-calmBlue-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>
      </div>
      
      <div className="flex items-center space-x-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-gray-700 hover:text-calmBlue-600">
              <Languages className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="animate-in zoom-in-90 backdrop-blur-sm bg-white/95 border-calmBlue-100">
            <DropdownMenuItem onClick={() => switchLanguage('en')} className={`${language === 'en' ? 'bg-calmBlue-50 text-calmBlue-600' : ''}`}>
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => switchLanguage('ar')} className={`${language === 'ar' ? 'bg-calmBlue-50 text-calmBlue-600' : ''}`}>
              العربية
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <ThemeToggle />
        
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative hover:bg-calmBlue-50 hover:text-calmBlue-600 transition-colors rounded-full p-0 w-10 h-10">
                <User className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-calmBlue-500 rounded-full"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 animate-in zoom-in-90 backdrop-blur-sm bg-white/95 border-calmBlue-100">
              <div className="px-3 py-2 text-sm font-medium text-gray-700">
                {userEmail || translate("nav", "account", language)}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/profile" className="w-full">
                  {translate("nav", "profile", language)}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/appointments" className="w-full">
                  {translate("nav", "appointments", language)}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/settings" className="w-full">
                  {translate("nav", "settings", language)}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-red-600 hover:text-red-700 focus:text-red-700">
                {translate("nav", "logout", language)}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className={`hidden sm:flex items-center ${isRTL ? 'mr-3' : 'ml-3'} space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
            <Link to="/login">
              <Button variant="ghost" className="flex items-center transition-transform hover:scale-105">
                <LogIn className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {translate("nav", "login", language)}
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-calmBlue-500 hover:bg-calmBlue-600 transition-all hover:shadow-md">
                {translate("nav", "register", language)}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
