
import { Apple, PlaySquare, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";

const features = [
  "Access your therapy sessions anywhere",
  "Secure messaging with your therapist",
  "Schedule appointments on the go",
  "Track your progress with mood journals",
  "Set reminders for exercises and practices",
  "Optional discreet app icon for privacy"
];

// Arabic translations for features
const featuresAr = [
  "الوصول إلى جلسات العلاج الخاصة بك في أي مكان",
  "مراسلة آمنة مع معالجك",
  "جدولة المواعيد أثناء التنقل",
  "تتبع تقدمك مع مجلات المزاج",
  "ضبط تذكيرات للتمارين والممارسات",
  "أيقونة تطبيق اختيارية غير ملفتة للنظر للخصوصية"
];

const MobileApp = () => {
  const { language, isRTL } = useLanguage();
  
  const currentFeatures = language === 'ar' ? featuresAr : features;

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container-custom">
        <div className={`flex flex-col lg:flex-row items-center ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          <div className={`lg:w-1/2 ${isRTL ? 'lg:pl-12' : 'lg:pr-12'} mb-12 lg:mb-0`}>
            <h2 className={`section-title mb-6 text-${isRTL ? 'right' : 'left'}`}>
              {translate('mobileApp', 'title', language)}
            </h2>
            <p className={`text-lg text-gray-600 mb-8 text-${isRTL ? 'right' : 'left'}`}>
              {translate('mobileApp', 'description', language)}
            </p>
            
            <div className="space-y-4 mb-8">
              {currentFeatures.map((feature, index) => (
                <div key={index} className={`flex items-center ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                  <CheckCircle2 className={`h-5 w-5 text-green-500 ${isRTL ? 'ml-3' : 'mr-3'} shrink-0`} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            
            <div className={`flex flex-col sm:flex-row space-y-4 sm:space-y-0 ${isRTL ? 'sm:space-x-reverse' : ''} sm:space-x-4`}>
              <Button 
                className="bg-gray-900 hover:bg-black text-white flex items-center justify-center px-8"
                size="lg"
              >
                <Apple className={`h-6 w-6 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                <div className={`text-${isRTL ? 'right' : 'left'}`}>
                  <div className="text-xs">{translate('mobileApp', 'downloadOn', language)}</div>
                  <div className="text-base font-medium">{translate('mobileApp', 'appStore', language)}</div>
                </div>
              </Button>
              
              <Button 
                className="bg-gray-900 hover:bg-black text-white flex items-center justify-center px-8"
                size="lg"
              >
                <PlaySquare className={`h-6 w-6 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                <div className={`text-${isRTL ? 'right' : 'left'}`}>
                  <div className="text-xs">{translate('mobileApp', 'getItOn', language)}</div>
                  <div className="text-base font-medium">{translate('mobileApp', 'googlePlay', language)}</div>
                </div>
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className={`relative z-10 transform ${isRTL ? '-translate-x-16' : 'translate-x-16'}`}>
              <img 
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Mobile app interface" 
                className="rounded-xl shadow-2xl max-w-xs mx-auto"
              />
            </div>
            <div className={`absolute top-1/4 ${isRTL ? '-right-4' : '-left-4'} z-0`}>
              <img 
                src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Modern technology interface" 
                className="rounded-xl shadow-2xl max-w-xs opacity-70"
              />
            </div>
            <div className={`absolute -bottom-4 ${isRTL ? 'left-0' : 'right-0'} z-20 hidden md:block`}>
              <div className="bg-warmNeutral-100 rounded-lg p-4 shadow-lg max-w-xs">
                <div className={`flex items-start ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                  <div className={`bg-calmBlue-500 rounded-full p-2 ${isRTL ? 'ml-3' : 'mr-3'}`}>
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">{translate('mobileApp', 'privacyDesign', language)}</h4>
                    <p className="text-sm text-gray-600">
                      {translate('mobileApp', 'privacyDesc', language)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileApp;
