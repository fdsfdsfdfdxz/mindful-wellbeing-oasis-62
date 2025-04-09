
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
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";

const Footer = () => {
  const { language, isRTL } = useLanguage();
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className={`text-${isRTL ? 'right' : 'left'}`}>
            <h3 className="text-xl font-bold text-white mb-4">MindfulCare</h3>
            <p className="mb-4">
              {translate('footer', 'about', language)}
            </p>
            <div className={`flex space-x-4 ${isRTL ? 'justify-end' : ''}`}>
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
          
          <div className={`text-${isRTL ? 'right' : 'left'}`}>
            <h3 className="text-lg font-bold text-white mb-4">{translate('footer', 'helpfulLinks', language)}</h3>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  {translate('footer', 'services', language)}
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  {translate('footer', 'howItWorks', language)}
                </a>
              </li>
              <li>
                <a href="#specialists" className="hover:text-white transition-colors">
                  {translate('footer', 'specialists', language)}
                </a>
              </li>
              <li>
                <a href="#plans" className="hover:text-white transition-colors">
                  {translate('footer', 'plans', language)}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {translate('footer', 'aboutUs', language)}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {translate('footer', 'faqs', language)}
                </a>
              </li>
            </ul>
          </div>
          
          <div className={`text-${isRTL ? 'right' : 'left'}`}>
            <h3 className="text-lg font-bold text-white mb-4">{translate('footer', 'contactUs', language)}</h3>
            <ul className="space-y-3">
              <li className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                <MapPin className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'} shrink-0 mt-0.5`} />
                <span>123 Healing Street, Wellness City, 10001</span>
              </li>
              <li className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Phone className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'} shrink-0`} />
                <a href="tel:+1800123456" className="hover:text-white transition-colors">+1 (800) 123-456</a>
              </li>
              <li className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Mail className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'} shrink-0`} />
                <a href="mailto:support@mindfulcare.com" className="hover:text-white transition-colors">support@mindfulcare.com</a>
              </li>
            </ul>
          </div>
          
          <div className={`text-${isRTL ? 'right' : 'left'}`}>
            <h3 className="text-lg font-bold text-white mb-4">{translate('footer', 'newsletter', language)}</h3>
            <p className="mb-4">{translate('footer', 'newsletterDesc', language)}</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder={translate('footer', 'yourEmail', language)}
                className="px-4 py-2 rounded-l-md text-gray-900 w-full focus:outline-none focus:ring-2 focus:ring-calmBlue-500"
              />
              <Button className="bg-calmBlue-500 hover:bg-calmBlue-600 rounded-l-none">
                {translate('footer', 'subscribe', language)}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm mb-4 md:mb-0">
              {translate('footer', 'copyright', language)}
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="#" className="hover:text-white transition-colors">{translate('footer', 'privacy', language)}</a>
              <a href="#" className="hover:text-white transition-colors">{translate('footer', 'terms', language)}</a>
              <a href="#" className="hover:text-white transition-colors">{translate('footer', 'cookie', language)}</a>
              <a href="#" className="hover:text-white transition-colors">{translate('footer', 'accessibility', language)}</a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-red-900/20 border border-red-900/30 rounded-lg">
          <div className={`flex items-start ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
            <AlertTriangle className={`h-5 w-5 text-red-400 shrink-0 mt-0.5 ${isRTL ? 'ml-3' : 'mr-3'}`} />
            <div>
              <h4 className="text-white font-medium mb-1">{translate('footer', 'emergency', language)}</h4>
              <p className="text-sm">
                {translate('footer', 'emergencyDesc', language)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
