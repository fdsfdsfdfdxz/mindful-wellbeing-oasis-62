
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarDays, MessageSquare } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useEffect, useState } from "react";

const Hero = () => {
  const { language, isRTL } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  // Set visibility after a short delay for the animation sequence
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleBookConsultation = () => {
    navigate("/services/book-session");
  };

  const handleFreeAssessment = () => {
    navigate("/services/anonymous-consultation");
  };

  return (
    <section className={`py-24 md:py-32 overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-br from-background to-background/80' : 'hero-gradient'}`}>
      <div className="container-custom">
        <div className={`flex flex-col lg:flex-row items-center ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          <div className={`lg:w-1/2 ${isRTL ? 'lg:pl-16' : 'lg:pr-16'} mb-16 lg:mb-0 text-center lg:text-${isRTL ? 'right' : 'left'}`}>
            <h1 
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight opacity-0 ${isVisible ? 'animate-[fade-in_0.6s_ease-out_forwards]' : ''} motion-reduce:animate-none`}
            >
              {translate('hero', 'title', language)}
            </h1>
            <p 
              className={`text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 opacity-0 ${isVisible ? 'animate-[fade-in_0.8s_ease-out_forwards]' : ''} motion-reduce:animate-none`}
            >
              {translate('hero', 'description', language)}
            </p>
            <div 
              className={`flex flex-col sm:flex-row items-center justify-center lg:justify-${isRTL ? 'end' : 'start'} ${isRTL ? 'sm:space-x-reverse' : ''} space-y-4 sm:space-y-0 sm:space-x-6 opacity-0 ${isVisible ? 'animate-[fade-in_1s_ease-out_forwards]' : ''} motion-reduce:animate-none`}
            >
              <Button 
                className="relative w-full sm:w-auto overflow-hidden group transition-all duration-300 hover:scale-105"
                size="lg"
                onClick={handleBookConsultation}
              >
                <span className="absolute inset-0 w-full h-full transition-transform duration-500 ease-out transform translate-x-0 -skew-x-12 bg-calmBlue-600 group-hover:translate-x-full group-hover:scale-102"></span>
                <span className="relative flex items-center">
                  <CalendarDays className={`${isRTL ? 'ml-2' : 'mr-2'} h-5 w-5 transition-transform group-hover:scale-110 group-hover:rotate-12`} /> 
                  {translate('hero', 'bookConsultation', language)}
                </span>
              </Button>
              <Button 
                variant="outline"
                className="w-full sm:w-auto border-calmBlue-400 text-calmBlue-600 dark:text-calmBlue-400 hover:bg-calmBlue-50 dark:hover:bg-calmBlue-950/30 transition-all duration-300 hover:shadow-md hover:scale-105"
                size="lg"
                onClick={handleFreeAssessment}
              >
                <MessageSquare className={`${isRTL ? 'ml-2' : 'mr-2'} h-5 w-5 transition-transform group-hover:rotate-12 animate-pulse-soft`} /> 
                {translate('hero', 'freeAssessment', language)}
              </Button>
            </div>
          </div>
          <div 
            className={`lg:w-1/2 relative opacity-0 ${isVisible ? 'animate-[fade-in_1.2s_ease-out_forwards]' : ''} motion-reduce:animate-none`}
          >
            <div className="absolute -inset-4 bg-calmBlue-200 dark:bg-calmBlue-900/50 rounded-full blur-3xl opacity-20 animate-pulse-soft"></div>
            <div className="overflow-hidden rounded-2xl shadow-2xl relative z-10 group">
              <img 
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625" 
                alt="Majestic Islamic architecture symbolizing peace and spiritual healing" 
                className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-sageGreen-500 dark:bg-sageGreen-700 rounded-full opacity-30 blur-xl animate-[pulse-soft_4s_infinite_ease-in-out_0.5s]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
