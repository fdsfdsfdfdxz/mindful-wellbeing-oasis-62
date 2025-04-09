
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

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
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
              Services
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-calmBlue-600 transition-colors">
              How It Works
            </a>
            <a href="#specialists" className="text-gray-700 hover:text-calmBlue-600 transition-colors">
              Specialists
            </a>
            <a href="#plans" className="text-gray-700 hover:text-calmBlue-600 transition-colors">
              Plans
            </a>
          </div>

          {/* Language Selector & Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Globe className="h-4 w-4 mr-1" /> EN
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>العربية</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="outline" size="sm">
              Login
            </Button>
            
            <Button className="bg-calmBlue-500 hover:bg-calmBlue-600">
              Register
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
                Services
              </a>
              <a 
                href="#how-it-works" 
                className="text-gray-700 hover:text-calmBlue-600 transition-colors py-2 px-4 rounded-md hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </a>
              <a 
                href="#specialists" 
                className="text-gray-700 hover:text-calmBlue-600 transition-colors py-2 px-4 rounded-md hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Specialists
              </a>
              <a 
                href="#plans" 
                className="text-gray-700 hover:text-calmBlue-600 transition-colors py-2 px-4 rounded-md hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Plans
              </a>

              <div className="flex items-center space-x-2 py-2 px-4">
                <Globe className="h-4 w-4" />
                <span>Select Language:</span>
              </div>
              <div className="flex space-x-2 px-4">
                <Button variant="outline" size="sm" className="w-full">English</Button>
                <Button variant="outline" size="sm" className="w-full">العربية</Button>
              </div>

              <div className="border-t border-gray-200 my-2"></div>

              <div className="flex space-x-2 px-4">
                <Button variant="outline" size="sm" className="w-1/2">
                  Login
                </Button>
                <Button className="bg-calmBlue-500 hover:bg-calmBlue-600 w-1/2">
                  Register
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
