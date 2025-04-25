
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  MessageSquare, PhoneCall, Video, Lock, FileText, 
  Brain, Users, Heart, BookOpen, Clock, Shield, 
  HeartHandshake, ShieldAlert
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";
import { useToast } from "@/components/ui/use-toast";
import ServiceCategory from "./services/ServiceCategory";
import ServiceCard from "./services/ServiceCard";

const Services = () => {
  const { language, isRTL } = useLanguage();
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

  // Group services by category
  const consultationServices = [
    {
      id: "private",
      title: translate('services', 'privateConsultations', language),
      description: translate('services', 'privateConsultationsDesc', language),
      icon: <MessageSquare className="h-10 w-10 text-calmBlue-500" />,
      iconBg: "bg-calmBlue-100",
      link: "/services/book-session",
      badges: ["Secure Chat", "File Sharing"],
      benefits: ["Secure Chat", "File Sharing"]
    },
    {
      id: "anonymous",
      title: translate('services', 'anonymousConsultations', language),
      description: translate('services', 'anonymousConsultationsDesc', language),
      icon: <Lock className="h-10 w-10 text-calmBlue-500" />,
      iconBg: "bg-calmBlue-100",
      link: "/services/anonymous-consultation",
      badges: ["Anonymous", "No Registration"],
      benefits: ["Anonymous", "No Registration"]
    },
    {
      id: "audio",
      title: translate('services', 'audioConsultations', language),
      description: translate('services', 'audioConsultationsDesc', language),
      icon: <PhoneCall className="h-10 w-10 text-sageGreen-500" />,
      iconBg: "bg-sageGreen-100",
      link: "/doctor-chat?appointment=audio",
      badges: ["End-to-end encrypted", "Low bandwidth"],
      benefits: ["End-to-end encrypted", "Low bandwidth"]
    }
  ];

  const specializedServices = [
    {
      id: "marriage",
      title: translate('services', 'marriageCounseling', language),
      description: translate('services', 'marriageCounselingDesc', language),
      icon: <Heart className="h-10 w-10 text-red-500" />,
      iconBg: "bg-red-100",
      link: "/services/marriage-counseling",
      badges: ["Couples", "Family"],
      benefits: ["Couples", "Family"],
      isNew: true
    },
    {
      id: "groups",
      title: translate('services', 'supportGroups', language),
      description: translate('services', 'supportGroupsDesc', language),
      icon: <Users className="h-10 w-10 text-indigo-500" />,
      iconBg: "bg-indigo-100",
      link: "/services/support-groups",
      badges: ["Anonymous", "Moderated"],
      benefits: ["Anonymous", "Moderated"],
      isNew: true
    },
    {
      id: "crisis",
      title: translate('services', 'crisisSupport', language),
      description: translate('services', 'crisisSupportDesc', language),
      icon: <ShieldAlert className="h-10 w-10 text-red-500" />,
      iconBg: "bg-red-100",
      link: "/services/crisis-intervention",
      badges: ["24/7", "Emergency"],
      benefits: ["24/7", "Emergency"],
      isNew: true
    }
  ];

  const assessmentServices = [
    {
      id: "assessment",
      title: translate('services', 'psychologicalAssessments', language),
      description: translate('services', 'psychologicalAssessmentsDesc', language),
      icon: <FileText className="h-10 w-10 text-sageGreen-500" />,
      iconBg: "bg-sageGreen-100",
      link: "/services/psychological-assessment",
      badges: ["Evidence-based"],
      benefits: ["Evidence-based"]
    },
    {
      id: "educational",
      title: translate('services', 'educationalResources', language),
      description: translate('services', 'educationalResourcesDesc', language),
      icon: <BookOpen className="h-10 w-10 text-calmBlue-500" />,
      iconBg: "bg-calmBlue-100",
      link: "/services/educational-resources",
      badges: ["Research-backed"],
      benefits: ["Research-backed"]
    },
    {
      id: "followup",
      title: translate('services', 'followupCare', language),
      description: translate('services', 'followupCareDesc', language),
      icon: <Clock className="h-10 w-10 text-sageGreen-500" />,
      iconBg: "bg-sageGreen-100",
      link: "/services/followup-care",
      badges: ["Continuous Support"],
      benefits: ["Continuous Support"]
    }
  ];

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
          <ServiceCategory 
            title={translate('services', 'consultationTitle', language) || "Professional Consultations"}
            description={translate('services', 'consultationDesc', language) || "Connect with our mental health professionals through various consultation formats"}
          >
            {consultationServices.map((service, index) => (
              <ServiceCard
                key={service.id}
                {...service}
                isSelected={activeCardIndex === index}
                isProcessing={false}
                isActive={false}
                hasAccess={false}
                onSelect={() => handleServiceClick(service.link, index)}
              />
            ))}
          </ServiceCategory>

          <ServiceCategory
            title={translate('services', 'specializedTitle', language) || "Specialized Care"}
            description={translate('services', 'specializedDesc', language) || "Targeted support for specific needs and situations"}
          >
            {specializedServices.map((service, index) => (
              <ServiceCard
                key={service.id}
                {...service}
                isSelected={activeCardIndex === index + consultationServices.length}
                isProcessing={false}
                isActive={false}
                hasAccess={false}
                onSelect={() => handleServiceClick(service.link, index + consultationServices.length)}
              />
            ))}
          </ServiceCategory>

          <ServiceCategory
            title={translate('services', 'assessmentTitle', language) || "Assessment & Resources"}
            description={translate('services', 'assessmentDesc', language) || "Tools and resources for understanding and improving your mental health"}
          >
            {assessmentServices.map((service, index) => (
              <ServiceCard
                key={service.id}
                {...service}
                isSelected={activeCardIndex === index + consultationServices.length + specializedServices.length}
                isProcessing={false}
                isActive={false}
                hasAccess={false}
                onSelect={() => handleServiceClick(service.link, index + consultationServices.length + specializedServices.length)}
              />
            ))}
          </ServiceCategory>
        </div>
      </div>
    </section>
  );
};

export default Services;
