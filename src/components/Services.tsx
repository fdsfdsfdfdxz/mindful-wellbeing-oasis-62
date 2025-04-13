
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
  ArrowRight,
  Shield,
  Share2,
  ShieldAlert,
  Headphones
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

const badgeTranslations: Record<string, { en: string; ar: string }> = {
  "Secure Chat": { en: "Secure Chat", ar: "محادثة آمنة" },
  "File Sharing": { en: "File Sharing", ar: "مشاركة الملفات" },
  "Anonymous": { en: "Anonymous", ar: "مجهول الهوية" },
  "No Registration": { en: "No Registration", ar: "بدون تسجيل" },
  "Evidence-based": { en: "Evidence-based", ar: "قائم على الأدلة" },
  "End-to-end encrypted": { en: "End-to-end encrypted", ar: "تشفير طرفي" },
  "Low bandwidth": { en: "Low bandwidth", ar: "نطاق ترددي منخفض" },
  "HD Quality": { en: "HD Quality", ar: "جودة عالية" },
  "Screen Sharing": { en: "Screen Sharing", ar: "مشاركة الشاشة" },
  "Couples": { en: "Couples", ar: "أزواج" },
  "Family": { en: "Family", ar: "عائلة" },
  "24/7": { en: "24/7", ar: "24/7" },
  "Emergency": { en: "Emergency", ar: "طوارئ" },
  "Encrypted": { en: "Encrypted", ar: "مشفر" },
  "Read Receipts": { en: "Read Receipts", ar: "إشعارات القراءة" },
  "Research-backed": { en: "Research-backed", ar: "مدعوم بالأبحاث" },
  "Continuous Support": { en: "Continuous Support", ar: "دعم مستمر" },
  "Moderated": { en: "Moderated", ar: "مُدار" }
};

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
  
  const translateBadge = (text: string) => {
    return badgeTranslations[text] ? 
      (language === 'ar' ? badgeTranslations[text].ar : badgeTranslations[text].en) : 
      text;
  };
  
  // Service data is kept the same... (too long to include entirely)
  const serviceData = [
    {
      title: translate('services', 'privateConsultations', language),
      description: translate('services', 'privateConsultationsDesc', language),
      icon: <MessageSquare className="h-10 w-10 text-calmBlue-500" />,
      iconBg: "bg-calmBlue-100",
      cta: translate('services', 'bookSession', language),
      link: "/services/book-session",
      badges: [
        { text: "Secure Chat", color: "bg-green-100 text-green-800 border-green-200" },
        { text: "File Sharing", color: "bg-blue-100 text-blue-800 border-blue-200" }
      ]
    },
    {
      title: translate('services', 'anonymousConsultations', language),
      description: translate('services', 'anonymousConsultationsDesc', language),
      icon: <Lock className="h-10 w-10 text-calmBlue-500" />,
      iconBg: "bg-calmBlue-100",
      cta: translate('services', 'startAnonymously', language),
      link: "/services/anonymous-consultation",
      badges: [
        { text: "Anonymous", color: "bg-indigo-100 text-indigo-800 border-indigo-200" },
        { text: "No Registration", color: "bg-purple-100 text-purple-800 border-purple-200" }
      ]
    },
    {
      title: translate('services', 'psychologicalAssessments', language),
      description: translate('services', 'psychologicalAssessmentsDesc', language),
      icon: <FileText className="h-10 w-10 text-sageGreen-500" />,
      iconBg: "bg-sageGreen-100",
      cta: translate('services', 'takeAssessment', language),
      link: "/services/psychological-assessment",
      badges: [
        { text: "Evidence-based", color: "bg-teal-100 text-teal-800 border-teal-200" }
      ]
    },
    {
      title: translate('services', 'audioConsultations', language) || "Audio Consultations",
      description: translate('services', 'audioConsultationsDesc', language) || "Connect with a therapist through voice calls for more personal conversations.",
      icon: <PhoneCall className="h-10 w-10 text-sageGreen-500" />,
      iconBg: "bg-sageGreen-100",
      cta: translate('services', 'startVoiceCall', language) || "Start Voice Call",
      link: "/doctor-chat?appointment=audio",
      badges: [
        { text: "End-to-end encrypted", color: "bg-green-100 text-green-800 border-green-200" },
        { text: "Low bandwidth", color: "bg-blue-100 text-blue-800 border-blue-200" }
      ]
    },
    {
      title: translate('services', 'videoConsultations', language) || "Video Consultations",
      description: translate('services', 'videoConsultationsDesc', language) || "Face-to-face virtual therapy sessions with screen sharing capabilities.",
      icon: <Video className="h-10 w-10 text-warmNeutral-500" />,
      iconBg: "bg-warmNeutral-100",
      cta: translate('services', 'startVideoCall', language) || "Start Video Session",
      link: "/doctor-chat?appointment=video",
      badges: [
        { text: "HD Quality", color: "bg-amber-100 text-amber-800 border-amber-200" },
        { text: "Screen Sharing", color: "bg-blue-100 text-blue-800 border-blue-200" }
      ]
    },
    {
      title: translate('services', 'marriageCounseling', language) || "Relationship Counseling",
      description: translate('services', 'marriageCounselingDesc', language) || "Expert guidance for couples seeking to improve communication and resolve conflicts.",
      icon: <Heart className="h-10 w-10 text-red-500" />,
      iconBg: "bg-red-100",
      cta: translate('services', 'learnMore', language) || "Learn More",
      link: "/services/marriage-counseling",
      badges: [
        { text: "Couples", color: "bg-red-100 text-red-800 border-red-200" },
        { text: "Family", color: "bg-orange-100 text-orange-800 border-orange-200" }
      ],
      isNew: true
    },
    {
      title: translate('services', 'supportGroups', language) || "Support Groups",
      description: translate('services', 'supportGroupsDesc', language) || "Join moderated anonymous groups focused on specific mental health topics and challenges.",
      icon: <Users className="h-10 w-10 text-indigo-500" />,
      iconBg: "bg-indigo-100",
      cta: translate('services', 'joinGroup', language) || "Join a Group",
      link: "/services/support-groups",
      badges: [
        { text: "Anonymous", color: "bg-indigo-100 text-indigo-800 border-indigo-200" },
        { text: "Moderated", color: "bg-violet-100 text-violet-800 border-violet-200" }
      ],
      isNew: true
    },
    {
      title: translate('services', 'crisisSupport', language) || "Crisis Support",
      description: translate('services', 'crisisSupportDesc', language) || "Immediate help during difficult moments with trained crisis intervention specialists.",
      icon: <ShieldAlert className="h-10 w-10 text-red-500" />,
      iconBg: "bg-red-100",
      cta: translate('services', 'getHelp', language) || "Get Help",
      link: "/services/crisis-intervention",
      badges: [
        { text: "24/7", color: "bg-red-100 text-red-800 border-red-200" },
        { text: "Emergency", color: "bg-red-100 text-red-800 border-red-200" }
      ],
      isNew: true
    },
    {
      title: translate('services', 'secureMessaging', language) || "Secure Messaging",
      description: translate('services', 'secureMessagingDesc', language) || "Private encrypted communication with mental health professionals.",
      icon: <Shield className="h-10 w-10 text-warmNeutral-500" />,
      iconBg: "bg-warmNeutral-100",
      cta: translate('services', 'sendMessage', language) || "Send Message",
      link: "/doctor-chat",
      badges: [
        { text: "Encrypted", color: "bg-green-100 text-green-800 border-green-200" },
        { text: "Read Receipts", color: "bg-purple-100 text-purple-800 border-purple-200" }
      ]
    },
    {
      title: translate('services', 'educationalResources', language),
      description: translate('services', 'educationalResourcesDesc', language),
      icon: <BookOpen className="h-10 w-10 text-calmBlue-500" />,
      iconBg: "bg-calmBlue-100",
      cta: translate('services', 'browseLibrary', language),
      link: "/services/educational-resources",
      badges: [
        { text: "Research-backed", color: "bg-sky-100 text-sky-800 border-sky-200" }
      ]
    },
    {
      title: translate('services', 'followupCare', language),
      description: translate('services', 'followupCareDesc', language),
      icon: <Clock className="h-10 w-10 text-sageGreen-500" />,
      iconBg: "bg-sageGreen-100",
      cta: translate('services', 'learnMore', language),
      link: "/services/followup-care",
      badges: [
        { text: "Continuous Support", color: "bg-teal-100 text-teal-800 border-teal-200" }
      ]
    }
  ];

  const serviceFeatures = [
    {
      icon: <Lock className="h-6 w-6 text-calmBlue-500 flex-shrink-0" />,
      title: translate('services', 'secureEncryption', language) || "End-to-End Encryption",
      description: translate('services', 'secureEncryptionDesc', language) || "All communications are protected with enterprise-grade encryption."
    },
    {
      icon: <Share2 className="h-6 w-6 text-calmBlue-500 flex-shrink-0" />,
      title: translate('services', 'fileSharingCapabilities', language) || "File Sharing Capabilities",
      description: translate('services', 'fileSharingDesc', language) || "Securely share documents, images, and assessment results."
    },
    {
      icon: <Shield className="h-6 w-6 text-calmBlue-500 flex-shrink-0" />,
      title: translate('services', 'dataPrivacy', language) || "Enhanced Data Privacy",
      description: translate('services', 'dataPrivacyDesc', language) || "Your personal data is protected and never shared with third parties."
    },
    {
      icon: <CheckCircle2 className="h-6 w-6 text-calmBlue-500 flex-shrink-0" />,
      title: translate('services', 'accessibleAnywhere', language) || "Accessible Anywhere",
      description: translate('services', 'accessibleAnywhereDesc', language) || "Connect from any device with no plugins or downloads required."
    }
  ];
  
  const specializedFeatures = [
    {
      icon: <Users className="h-6 w-6 text-indigo-500 flex-shrink-0" />,
      title: "Anonymous Support Groups",
      description: "Join moderated groups focused on specific topics with privacy-preserving participation options."
    },
    {
      icon: <Heart className="h-6 w-6 text-red-500 flex-shrink-0" />,
      title: "Relationship Counseling",
      description: "Multi-participant video sessions with specialized assessment tools and shared homework."
    },
    {
      icon: <ShieldAlert className="h-6 w-6 text-red-500 flex-shrink-0" />,
      title: "Crisis Intervention",
      description: "24/7 emergency support with escalation protocols for high-risk situations."
    },
    {
      icon: <Headphones className="h-6 w-6 text-amber-500 flex-shrink-0" />,
      title: "Audio/Video Sessions",
      description: "High-quality remote consultations with screen sharing and recording capabilities."
    }
  ];
  
  const handleServiceClick = (link: string, index: number) => {
    setActiveCardIndex(index);
    
    toast({
      title: translate('services', 'navigating', language) || "Navigating to service",
      description: translate('services', 'redirecting', language) || "You're being redirected to the selected service page",
      duration: 1500,
    });
    
    setTimeout(() => {
      navigate(link);
    }, 300);
  };

  return (
    <section id="services" className="py-24 bg-white overflow-hidden" ref={servicesRef}>
      <div className="container-custom">
        <h2 className="section-title text-center animate-fade-in">
          {translate('services', 'title', language)}
        </h2>
        <p className="section-subtitle text-center mb-6 animate-fade-in animation-delay-200">
          {translate('services', 'subtitle', language)}
        </p>
        
        <div className="flex justify-center mb-12 animate-fade-in animation-delay-300">
          <Badge variant="outline" className="px-4 py-2 text-base bg-calmBlue-50 border-calmBlue-200 text-calmBlue-700 shadow-sm">
            <span className="mr-2 bg-calmBlue-500 w-2 h-2 rounded-full inline-block animate-pulse"></span>
            {translate('services', 'newFeature', language) || "New Feature"}: 
            <span className="font-semibold ml-1">
              {translate('services', 'specializedServices', language) || "Specialized Mental Health Services"}
            </span>
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {serviceData.map((service, index) => (
            <Card 
              key={index} 
              className={`border border-gray-100 h-full transition-all duration-500 hover:shadow-lg ${activeCardIndex === index ? 'ring-2 ring-calmBlue-500 shadow-lg scale-[1.02]' : ''} ${animateCards ? 'animate-scale-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className={`${service.iconBg} p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4 transition-all duration-500 ${activeCardIndex === index ? 'scale-110 shadow-md' : ''}`}>
                    {service.icon}
                  </div>
                  {service.isNew && (
                    <Badge className="bg-calmBlue-500 animate-pulse-soft">
                      {translate('services', 'new', language) || "New"}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 min-h-[80px]">
                  {service.description}
                </CardDescription>
                
                {service.badges && service.badges.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {service.badges.map((badge, i) => (
                      <Badge key={i} className={`${badge.color} font-normal text-xs shadow-sm transition-all hover:scale-105`}>
                        {translateBadge(badge.text)}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  variant={activeCardIndex === index ? "default" : "outline"}
                  className={`w-full group ${isRTL ? 'flex-row-reverse' : ''} overflow-hidden relative`}
                  onClick={() => handleServiceClick(service.link, index)}
                >
                  <span className="relative z-10">{service.cta}</span>
                  <span className="relative z-10">
                    <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${isRTL ? 'mr-2 group-hover:-translate-x-2' : 'ml-2 group-hover:translate-x-2'}`} />
                  </span>
                  <span className="absolute inset-0 bg-calmBlue-500 transform transition-transform duration-300 -translate-x-full group-hover:translate-x-0"></span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-20 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center animate-fade-in">
            {translate('services', 'specializedServices', language) || "Our Specialized Services"}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {specializedFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex gap-4 hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${(index + 4) * 100}ms` }}
              >
                <div className={`p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0 ${
                  index === 0 ? "bg-indigo-100" : 
                  index === 1 ? "bg-red-100" : 
                  index === 2 ? "bg-red-100" : 
                  "bg-amber-100"
                }`}>
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg shadow-sm animate-fade-in animation-delay-800 transform transition-all duration-500 hover:shadow-md">
            <h3 className="text-xl font-bold mb-6 text-center">
              {translate('services', 'consultationFeatures', language) || "Our Consultation System Features"}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {serviceFeatures.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex space-x-4 animate-fade-in-right"
                  style={{ animationDelay: `${(index + 8) * 100}ms` }}
                >
                  <div className="bg-white p-3 rounded-full shadow-sm">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-2">{feature.title}</h4>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button 
                className="bg-calmBlue-500 hover:bg-calmBlue-600 text-white group relative overflow-hidden px-6 py-3 rounded-lg"
                onClick={() => navigate('/doctor-chat')}
              >
                <span className="relative z-10 flex items-center">
                  {translate('services', 'startConsultation', language) || "Start Consultation"}
                  <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${isRTL ? 'mr-2 group-hover:-translate-x-2' : 'ml-2 group-hover:translate-x-2'}`} />
                </span>
                <span className="absolute inset-0 w-0 bg-calmBlue-600 transition-all duration-300 ease-out group-hover:w-full"></span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
