
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarDays, MessageSquare } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";

const Hero = () => {
  const { language, isRTL } = useLanguage();
  const navigate = useNavigate();

  const handleBookConsultation = () => {
    navigate("/services/book-session");
  };

  const handleFreeAssessment = () => {
    navigate("/services/anonymous-consultation");
  };

  return (
    <section className="hero-gradient py-24 md:py-32 overflow-hidden">
      <div className="container-custom">
        <div className={`flex flex-col lg:flex-row items-center ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          <div className={`lg:w-1/2 ${isRTL ? 'lg:pl-16' : 'lg:pr-16'} mb-16 lg:mb-0 text-center lg:text-${isRTL ? 'right' : 'left'}`}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-8 leading-tight animate-fade-in">
              {translate('hero', 'title', language)}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0 animate-fade-in animation-delay-200">
              {translate('hero', 'description', language)}
            </p>
            <div className={`flex flex-col sm:flex-row items-center justify-center lg:justify-${isRTL ? 'end' : 'start'} ${isRTL ? 'sm:space-x-reverse' : ''} space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in animation-delay-400`}>
              <Button 
                className="button-primary w-full sm:w-auto group relative overflow-hidden"
                size="lg"
                onClick={handleBookConsultation}
              >
                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-calmBlue-600 group-hover:translate-x-full group-hover:scale-102"></span>
                <span className="relative flex items-center">
                  <CalendarDays className={`${isRTL ? 'ml-2' : 'mr-2'} h-5 w-5`} /> 
                  {translate('hero', 'bookConsultation', language)}
                </span>
              </Button>
              <Button 
                className="button-secondary w-full sm:w-auto shadow-smooth-hover"
                size="lg"
                onClick={handleFreeAssessment}
              >
                <MessageSquare className={`${isRTL ? 'ml-2' : 'mr-2'} h-5 w-5`} /> 
                {translate('hero', 'freeAssessment', language)}
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 relative animate-fade-in animation-delay-600">
            <div className="absolute -inset-4 bg-calmBlue-200 rounded-full blur-3xl opacity-20 animate-pulse-soft"></div>
            <img 
              src="https://images.unsplash.com/photo-1487958449943-2429e8be8625" 
              alt="Majestic Islamic architecture symbolizing peace and spiritual healing" 
              className="rounded-2xl shadow-2xl relative z-10 transform transition-transform duration-700 hover:scale-[1.02]"
            />
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-sageGreen-500 rounded-full opacity-30 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
