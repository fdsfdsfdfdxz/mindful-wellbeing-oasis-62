
import { 
  MessageSquare, 
  PhoneCall, 
  Video, 
  Lock, 
  FileText, 
  Brain, 
  Users, 
  Heart, 
  BookOpen, 
  Clock,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";
import { useToast } from "@/components/ui/use-toast";

const Services = () => {
  const { language, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  
  // Enhanced service data with more details
  const serviceData = [
    {
      title: translate('services', 'privateConsultations', language),
      description: translate('services', 'privateConsultationsDesc', language),
      icon: <MessageSquare className="h-10 w-10 text-calmBlue-500" />,
      iconBg: "bg-calmBlue-100",
      cta: translate('services', 'bookSession', language),
      link: "/services/book-session"
    },
    {
      title: translate('services', 'anonymousConsultations', language),
      description: translate('services', 'anonymousConsultationsDesc', language),
      icon: <Lock className="h-10 w-10 text-calmBlue-500" />,
      iconBg: "bg-calmBlue-100",
      cta: translate('services', 'startAnonymously', language),
      link: "/services/anonymous-consultation"
    },
    {
      title: translate('services', 'psychologicalAssessments', language),
      description: translate('services', 'psychologicalAssessmentsDesc', language),
      icon: <FileText className="h-10 w-10 text-sageGreen-500" />,
      iconBg: "bg-sageGreen-100",
      cta: translate('services', 'takeAssessment', language),
      link: "/services/psychological-assessment"
    },
    {
      title: translate('services', 'specializedTherapy', language),
      description: translate('services', 'specializedTherapyDesc', language),
      icon: <Brain className="h-10 w-10 text-sageGreen-500" />,
      iconBg: "bg-sageGreen-100",
      cta: translate('services', 'explorePrograms', language),
      link: "/services/specialized-therapy"
    },
    {
      title: translate('services', 'marriageCounseling', language),
      description: translate('services', 'marriageCounselingDesc', language),
      icon: <Users className="h-10 w-10 text-warmNeutral-500" />,
      iconBg: "bg-warmNeutral-100",
      cta: translate('services', 'familySolutions', language),
      link: "/services/marriage-counseling"
    },
    {
      title: translate('services', 'selfDevelopment', language),
      description: translate('services', 'selfDevelopmentDesc', language),
      icon: <Heart className="h-10 w-10 text-warmNeutral-500" />,
      iconBg: "bg-warmNeutral-100",
      cta: translate('services', 'startGrowing', language),
      link: "/services/self-development"
    },
    {
      title: translate('services', 'educationalResources', language),
      description: translate('services', 'educationalResourcesDesc', language),
      icon: <BookOpen className="h-10 w-10 text-calmBlue-500" />,
      iconBg: "bg-calmBlue-100",
      cta: translate('services', 'browseLibrary', language),
      link: "/services/educational-resources"
    },
    {
      title: translate('services', 'followupCare', language),
      description: translate('services', 'followupCareDesc', language),
      icon: <Clock className="h-10 w-10 text-sageGreen-500" />,
      iconBg: "bg-sageGreen-100",
      cta: translate('services', 'learnMore', language),
      link: "/services/followup-care"
    }
  ];

  // Additional service features
  const serviceFeatures = [
    translate('services', 'feature1', language),
    translate('services', 'feature2', language),
    translate('services', 'feature3', language),
    translate('services', 'feature4', language)
  ];
  
  const handleServiceClick = (link: string, index: number) => {
    setActiveCardIndex(index);
    
    toast({
      title: translate('services', 'navigating', language) || "Navigating to service",
      description: translate('services', 'redirecting', language) || "You're being redirected to the selected service page",
      duration: 1500,
    });
    
    // Short delay for visual feedback before navigation
    setTimeout(() => {
      navigate(link);
    }, 300);
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container-custom">
        <h2 className="section-title text-center">
          {translate('services', 'title', language)}
        </h2>
        <p className="section-subtitle text-center">
          {translate('services', 'subtitle', language)}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {serviceData.map((service, index) => (
            <Card 
              key={index} 
              className={`card-hover border border-gray-100 h-full transition-all duration-300 hover:shadow-md ${activeCardIndex === index ? 'ring-2 ring-calmBlue-500 shadow-lg' : ''}`}
            >
              <CardHeader className="pb-2">
                <div className={`${service.iconBg} p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4 transition-transform duration-300 ${activeCardIndex === index ? 'scale-110' : ''}`}>
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 min-h-[80px]">
                  {service.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button 
                  variant={activeCardIndex === index ? "default" : "outline"}
                  className={`w-full group ${isRTL ? 'flex-row-reverse' : ''}`}
                  onClick={() => handleServiceClick(service.link, index)}
                >
                  <span>{service.cta}</span>
                  <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${isRTL ? 'mr-2 group-hover:-translate-x-1' : 'ml-2 group-hover:translate-x-1'}`} />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 max-w-3xl mx-auto bg-gray-50 p-8 rounded-lg shadow-sm">
          <h3 className="text-2xl font-bold mb-6 text-center">
            {translate('services', 'whyChooseUs', language)}
          </h3>
          
          <div className="space-y-4">
            {serviceFeatures.map((feature, index) => (
              <div key={index} className={`flex items-center ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                <CheckCircle2 className={`h-6 w-6 text-calmBlue-500 flex-shrink-0 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                <p className="text-gray-700">{feature}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button 
              className="button-primary group"
              onClick={() => navigate('/services/book-session')}
            >
              {translate('services', 'getStarted', language)}
              <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${isRTL ? 'mr-2 group-hover:-translate-x-1' : 'ml-2 group-hover:translate-x-1'}`} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
