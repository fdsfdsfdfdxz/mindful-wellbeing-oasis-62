
import { CalendarDays, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";

const CTA = () => {
  const { language, isRTL } = useLanguage();

  return (
    <section className="py-20 bg-calmBlue-600 text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {translate('cta', 'title', language)}
          </h2>
          <p className="text-calmBlue-100 text-lg mb-10 max-w-2xl mx-auto">
            {translate('cta', 'description', language)}
          </p>
          
          <div className={`flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 ${isRTL ? 'sm:space-x-reverse' : ''} sm:space-x-6`}>
            <Button 
              size="lg" 
              className="bg-white text-calmBlue-600 hover:bg-calmBlue-50 w-full sm:w-auto"
            >
              <CalendarDays className={`${isRTL ? 'ml-2' : 'mr-2'} h-5 w-5`} /> 
              {translate('cta', 'bookConsultation', language)}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-transparent border-white text-white hover:bg-calmBlue-700 w-full sm:w-auto"
            >
              <MessageSquare className={`${isRTL ? 'ml-2' : 'mr-2'} h-5 w-5`} /> 
              {translate('cta', 'freeAssessment', language)}
            </Button>
          </div>
          
          <p className="mt-8 text-calmBlue-200 text-sm">
            {translate('cta', 'needHelp', language)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
