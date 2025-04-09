
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  AlertTriangle 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">MindfulCare</h3>
            <p className="mb-4">
              Professional mental health services accessible from anywhere. Secure, confidential, and personalized care.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Helpful Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="hover:text-white transition-colors">Our Services</a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#specialists" className="hover:text-white transition-colors">Our Specialists</a>
              </li>
              <li>
                <a href="#plans" className="hover:text-white transition-colors">Pricing Plans</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">FAQs</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                <span>123 Healing Street, Wellness City, 10001</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 shrink-0" />
                <a href="tel:+1800123456" className="hover:text-white transition-colors">+1 (800) 123-456</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 shrink-0" />
                <a href="mailto:support@mindfulcare.com" className="hover:text-white transition-colors">support@mindfulcare.com</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Newsletter</h3>
            <p className="mb-4">Subscribe to receive updates on mental health resources and tips.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 rounded-l-md text-gray-900 w-full focus:outline-none focus:ring-2 focus:ring-calmBlue-500"
              />
              <Button className="bg-calmBlue-500 hover:bg-calmBlue-600 rounded-l-none">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm mb-4 md:mb-0">
              © 2025 MindfulCare. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-red-900/20 border border-red-900/30 rounded-lg">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5 mr-3" />
            <div>
              <h4 className="text-white font-medium mb-1">Mental Health Emergency Resources</h4>
              <p className="text-sm">
                If you're experiencing a mental health emergency or having thoughts of self-harm, please call the National 
                Mental Health Hotline at <a href="tel:988" className="text-white underline">988</a> or text HOME to 741741 to reach the Crisis Text Line.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
