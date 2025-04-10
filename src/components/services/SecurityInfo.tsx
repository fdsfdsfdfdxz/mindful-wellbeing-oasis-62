
import { ShieldCheck, Zap, Lock, UserCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";
import { useAuth } from "@/contexts/AuthContext";

const SecurityInfo = () => {
  const { language } = useLanguage();
  const { isLoggedIn } = useAuth();

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
      
      <div className="flex items-center mb-6">
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

      <div className="flex items-center mb-6">
        <div className="p-3 rounded-full bg-amber-100 mr-4">
          <Lock className="h-8 w-8 text-amber-500" />
        </div>
        <div>
          <h3 className="text-xl font-bold">
            {translate('auth', 'secureLogin', language) || "Secure Login"}
          </h3>
          <p className="text-gray-600">
            {translate('auth', 'secureLoginDesc', language) || 
              "Your login information is protected with advanced encryption technology."}
          </p>
        </div>
      </div>

      {isLoggedIn && (
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-emerald-100 mr-4">
            <UserCheck className="h-8 w-8 text-emerald-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold">
              {translate('auth', 'accountVerified', language) || "Account Verified"}
            </h3>
            <p className="text-gray-600">
              {translate('auth', 'accountVerifiedDesc', language) || 
                "Your account is active and verified. You have access to all available services."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityInfo;
