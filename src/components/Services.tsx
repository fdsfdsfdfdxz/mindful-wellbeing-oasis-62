
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";
import { useToast } from "@/components/ui/use-toast";
import ServiceCategory from "./services/ServiceCategory";
import ServiceCard from "./services/ServiceCard";
import { servicesData } from "@/data/services";

const Services = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const [animateCards, setAnimateCards] = useState<boolean>(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimateCards(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
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

  let globalIndex = 0;

  return (
    <section id="services" className="py-24 bg-white dark:bg-background overflow-hidden" ref={servicesRef}>
      <div className="container-custom">
        <h2 className="section-title text-center animate-fade-in">
          {translate('services', 'title', language)}
        </h2>
        <p className="section-subtitle text-center mb-12 animate-fade-in animation-delay-200">
          {translate('services', 'subtitle', language)}
        </p>

        <div className="space-y-20">
          {servicesData.map((category) => (
            <ServiceCategory 
              key={category.title}
              title={translate('services', category.title.toLowerCase().replace(/\s+/g, ''), language) || category.title}
              description={translate('services', category.description.toLowerCase().replace(/\s+/g, ''), language) || category.description}
            >
              {category.services.map((service) => {
                const currentIndex = globalIndex++;
                return (
                  <ServiceCard
                    key={service.id}
                    {...service}
                    isSelected={activeCardIndex === currentIndex}
                    isProcessing={false}
                    isActive={false}
                    hasAccess={false}
                    onSelect={() => handleServiceClick(service.link, currentIndex)}
                  />
                );
              })}
            </ServiceCategory>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
