
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";
import { 
  CalendarClock, 
  CreditCard, 
  Gift, 
  HeartHandshake
} from "lucide-react";
import { useService } from "@/contexts/ServiceContext";
import { ServiceAccessMethod, processServiceAccess, saveAccessToken } from "@/services/paymentService";
import ServiceCard from "./services/ServiceCard";
import PromoForm from "./services/PromoForm";
import ServiceDialog from "./services/ServiceDialog";
import SecurityInfo from "./services/SecurityInfo";

const GainService = () => {
  const { language } = useLanguage();
  const { hasAccess, accessMethod, setAccessResult, lastResult } = useService();
  
  const [selectedMethod, setSelectedMethod] = useState<ServiceAccessMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [userEmail, setUserEmail] = useState("");
  
  // Handle method selection
  const handleMethodSelect = (method: ServiceAccessMethod) => {
    setSelectedMethod(method);
    
    // If method is referral or requires additional info, open dialog
    if (method === 'referral') {
      setIsDialogOpen(true);
    } else {
      handleServiceAccess(method);
    }
  };
  
  // Process the selected payment method
  const handleServiceAccess = async (method = selectedMethod) => {
    if (!method) return;
    
    setIsProcessing(true);
    
    try {
      const result = await processServiceAccess({
        method: method,
        referralCode: method === 'referral' ? referralCode : undefined,
        email: userEmail || undefined
      });
      
      if (result.success) {
        saveAccessToken(result);
        setAccessResult(result, method);
        
        // Close dialog if open
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Error processing service access:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Ways to gain services 
  const gainMethods = [
    {
      id: "subscription" as ServiceAccessMethod,
      title: translate('gainService', 'subscription', language),
      description: translate('gainService', 'subscriptionDesc', language),
      icon: <CalendarClock className="h-10 w-10 text-calmBlue-500" />,
      iconBg: "bg-calmBlue-100",
      benefits: [
        translate('gainService', 'subscriptionBenefit1', language),
        translate('gainService', 'subscriptionBenefit2', language),
        translate('gainService', 'subscriptionBenefit3', language)
      ]
    },
    {
      id: "oneTimePayment" as ServiceAccessMethod,
      title: translate('gainService', 'oneTimePayment', language),
      description: translate('gainService', 'oneTimePaymentDesc', language),
      icon: <CreditCard className="h-10 w-10 text-sageGreen-500" />,
      iconBg: "bg-sageGreen-100",
      benefits: [
        translate('gainService', 'oneTimePaymentBenefit1', language),
        translate('gainService', 'oneTimePaymentBenefit2', language),
        translate('gainService', 'oneTimePaymentBenefit3', language)
      ]
    },
    {
      id: "referral" as ServiceAccessMethod,
      title: translate('gainService', 'referral', language),
      description: translate('gainService', 'referralDesc', language),
      icon: <HeartHandshake className="h-10 w-10 text-warmNeutral-500" />,
      iconBg: "bg-warmNeutral-100",
      benefits: [
        translate('gainService', 'referralBenefit1', language),
        translate('gainService', 'referralBenefit2', language),
        translate('gainService', 'referralBenefit3', language)
      ]
    },
    {
      id: "promoCode" as ServiceAccessMethod,
      title: translate('gainService', 'promoCode', language),
      description: translate('gainService', 'promoCodeDesc', language),
      icon: <Gift className="h-10 w-10 text-purple-500" />,
      iconBg: "bg-purple-100",
      benefits: [
        translate('gainService', 'promoCodeBenefit1', language),
        translate('gainService', 'promoCodeBenefit2', language),
        translate('gainService', 'promoCodeBenefit3', language)
      ]
    }
  ];

  return (
    <section id="gain-service" className="py-20 bg-gray-50">
      <div className="container-custom">
        <h2 className="section-title text-center">
          {translate('gainService', 'title', language)}
        </h2>
        <p className="section-subtitle text-center">
          {translate('gainService', 'subtitle', language)}
        </p>
        
        {hasAccess && lastResult && (
          <Alert className="max-w-3xl mx-auto mb-8 bg-green-50 border-green-200">
            <AlertCircle className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-800">
              {translate('gainService', 'accessGranted', language) || "Access Granted"}
            </AlertTitle>
            <AlertDescription className="text-green-700">
              {lastResult.message}
              {accessMethod && (
                <p className="mt-1">
                  {translate('gainService', 'accessMethod', language) || "Method"}: {translate('gainService', accessMethod, language)}
                </p>
              )}
            </AlertDescription>
          </Alert>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {gainMethods.map((method) => (
            <ServiceCard 
              key={method.id}
              id={method.id}
              title={method.title}
              description={method.description}
              icon={method.icon}
              iconBg={method.iconBg}
              benefits={method.benefits}
              isSelected={selectedMethod === method.id}
              isProcessing={isProcessing}
              isActive={accessMethod === method.id}
              hasAccess={hasAccess}
              onSelect={handleMethodSelect}
              promoForm={method.id === "promoCode" ? (
                <PromoForm 
                  isProcessing={isProcessing} 
                  setIsProcessing={setIsProcessing} 
                />
              ) : undefined}
            />
          ))}
        </div>
        
        <SecurityInfo />
      </div>
      
      <ServiceDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        selectedMethod={selectedMethod}
        isProcessing={isProcessing}
        onProceed={() => handleServiceAccess()}
        referralCode={referralCode}
        setReferralCode={setReferralCode}
        userEmail={userEmail}
        setUserEmail={setUserEmail}
      />
    </section>
  );
};

export default GainService;
