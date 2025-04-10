
import { ShieldCheck, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";

const SecurityInfo = () => {
  const { language } = useLanguage();

  return (
    <div className="mt-16 bg-white p-8 rounded-lg shadow-sm max-w-3xl mx-auto">
      <div className="flex items-center mb-6">
        <div className="p-3 rounded-full bg-calmBlue-100 mr-4">
          <ShieldCheck className="h-8 w-8 text-calmBlue-500" />
        </div>
        <div>
          <h3 className="text-xl font-bold">
            {translate('gainService', 'securePayment', language)}
          </h3>
          <p className="text-gray-600">
            {translate('gainService', 'securePaymentDesc', language)}
          </p>
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-sageGreen-100 mr-4">
          <Zap className="h-8 w-8 text-sageGreen-500" />
        </div>
        <div>
          <h3 className="text-xl font-bold">
            {translate('gainService', 'instantAccess', language)}
          </h3>
          <p className="text-gray-600">
            {translate('gainService', 'instantAccessDesc', language)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecurityInfo;
