
import {
  UserPlus,
  ClipboardCheck,
  Search,
  Calendar,
  MessageSquare,
  Video,
  PhoneCall
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";

const HowItWorks = () => {
  const { language, isRTL } = useLanguage();
  
  const steps = [
    {
      icon: <UserPlus className="w-10 h-10 text-calmBlue-500" />,
      title: translate('howItWorks', 'step1', language),
      description: translate('howItWorks', 'step1Desc', language)
    },
    {
      icon: <ClipboardCheck className="w-10 h-10 text-calmBlue-500" />,
      title: translate('howItWorks', 'step2', language),
      description: translate('howItWorks', 'step2Desc', language)
    },
    {
      icon: <Search className="w-10 h-10 text-calmBlue-500" />,
      title: translate('howItWorks', 'step3', language),
      description: translate('howItWorks', 'step3Desc', language)
    },
    {
      icon: <MessageSquare className="w-10 h-10 text-calmBlue-500" />,
      title: translate('howItWorks', 'step4', language),
      description: translate('howItWorks', 'step4Desc', language)
    },
    {
      icon: <Calendar className="w-10 h-10 text-calmBlue-500" />,
      title: translate('howItWorks', 'step5', language),
      description: translate('howItWorks', 'step5Desc', language)
    },
    {
      icon: <Video className="w-10 h-10 text-calmBlue-500" />,
      title: translate('howItWorks', 'step6', language),
      description: translate('howItWorks', 'step6Desc', language)
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container-custom">
        <h2 className="section-title text-center">
          {translate('howItWorks', 'title', language)}
        </h2>
        <p className="section-subtitle text-center">
          {translate('howItWorks', 'description', language)}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {steps.map((step, index) => (
            <div key={index} className={`bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center transition-transform hover:transform hover:scale-105 ${isRTL ? 'rtl' : ''}`}>
              <div className="relative mb-6">
                <div className="absolute -inset-3 rounded-full bg-calmBlue-100 opacity-50"></div>
                <div className="relative">
                  {step.icon}
                </div>
                <div className={`absolute -top-3 ${isRTL ? '-left-3' : '-right-3'} bg-calmBlue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold`}>
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-gray-800 text-center">
            {translate('howItWorks', 'consultationMethods', language)}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className={`flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-calmBlue-300 transition-colors ${isRTL ? 'rtl' : ''}`}>
              <MessageSquare className="w-10 h-10 text-calmBlue-500 mb-3" />
              <h4 className="text-lg font-medium mb-2">{translate('howItWorks', 'textChat', language)}</h4>
              <p className="text-gray-600 text-center text-sm">{translate('howItWorks', 'textChatDesc', language)}</p>
            </div>
            <div className={`flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-calmBlue-300 transition-colors ${isRTL ? 'rtl' : ''}`}>
              <PhoneCall className="w-10 h-10 text-calmBlue-500 mb-3" />
              <h4 className="text-lg font-medium mb-2">{translate('howItWorks', 'voiceCall', language)}</h4>
              <p className="text-gray-600 text-center text-sm">{translate('howItWorks', 'voiceCallDesc', language)}</p>
            </div>
            <div className={`flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-calmBlue-300 transition-colors ${isRTL ? 'rtl' : ''}`}>
              <Video className="w-10 h-10 text-calmBlue-500 mb-3" />
              <h4 className="text-lg font-medium mb-2">{translate('howItWorks', 'videoSession', language)}</h4>
              <p className="text-gray-600 text-center text-sm">{translate('howItWorks', 'videoSessionDesc', language)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
