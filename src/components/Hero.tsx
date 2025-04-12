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
    <section className="hero-gradient py-20 md:py-28">
      <div className="container-custom">
        <div className={`flex flex-col lg:flex-row items-center ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          <div className={`lg:w-1/2 ${isRTL ? 'lg:pl-12' : 'lg:pr-12'} mb-12 lg:mb-0 text-center lg:text-${isRTL ? 'right' : 'left'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight animate-fade-in">
              {translate('hero', 'title', language)}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              {translate('hero', 'description', language)}
            </p>
            <div className={`flex flex-col sm:flex-row items-center justify-center lg:justify-${isRTL ? 'end' : 'start'} ${isRTL ? 'sm:space-x-reverse' : ''} space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in`} style={{ animationDelay: "0.4s" }}>
              <Button 
                className="button-primary w-full sm:w-auto" 
                size="lg"
                onClick={handleBookConsultation}
              >
                <CalendarDays className={`${isRTL ? 'ml-2' : 'mr-2'} h-5 w-5`} /> 
                {translate('hero', 'bookConsultation', language)}
              </Button>
              <Button 
                className="button-secondary w-full sm:w-auto" 
                size="lg"
                onClick={handleFreeAssessment}
              >
                <MessageSquare className={`${isRTL ? 'ml-2' : 'mr-2'} h-5 w-5`} /> 
                {translate('hero', 'freeAssessment', language)}
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <img 
              src="https://images.unsplash.com/photo-1487958449943-2429e8be8625" 
              alt="Peaceful professional workspace symbolizing mental wellness" 
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
