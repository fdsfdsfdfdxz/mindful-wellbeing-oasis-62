
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";
import { useToast } from "@/components/ui/use-toast";
import { servicesData } from "@/data/services";
import ServiceList from "./services/ServiceList";
import { useIntersectionAnimation } from "@/hooks/useIntersectionAnimation";

const Services = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const [sectionRef, animateSection] = useIntersectionAnimation();
  
  const handleServiceClick = (link: string, index: number) => {
    setActiveCardIndex(index);
    
    toast({
      title: translate('services', 'navigating', language),
      description: translate('services', 'redirecting', language),
      duration: 1500,
    });
    
    setTimeout(() => {
      navigate(link);
    }, 300);
  };

  return (
    <section id="services" className="py-24 bg-white dark:bg-background overflow-hidden" ref={sectionRef}>
      <div className="container-custom">
        <h2 className="section-title text-center animate-fade-in">
          {translate('services', 'title', language)}
        </h2>
        <p className="section-subtitle text-center mb-12 animate-fade-in animation-delay-200">
          {translate('services', 'subtitle', language)}
        </p>

        <ServiceList 
          categories={servicesData} 
          activeCardIndex={activeCardIndex}
          onServiceClick={handleServiceClick}
        />
      </div>
    </section>
  );
};

export default Services;
