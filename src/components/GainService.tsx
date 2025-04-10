
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";
import { 
  CalendarClock, 
  CreditCard, 
  Gift, 
  ShieldCheck, 
  Zap, 
  Check, 
  HeartHandshake,
  Loader2,
  AlertCircle
} from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useService } from "@/contexts/ServiceContext";
import { ServiceAccessMethod, processServiceAccess, saveAccessToken } from "@/services/paymentService";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const GainService = () => {
  const { language, isRTL } = useLanguage();
  const { toast } = useToast();
  const { hasAccess, accessMethod, setAccessResult, lastResult } = useService();
  
  const [selectedMethod, setSelectedMethod] = useState<ServiceAccessMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [userEmail, setUserEmail] = useState("");
  
  const promoForm = useForm({
    defaultValues: {
      promoCode: ""
    }
  });
  
  // Handle method selection
  const handleMethodSelect = (method: ServiceAccessMethod) => {
    setSelectedMethod(method);
    
    // If method is referral or requires additional info, open dialog
    if (method === 'referral') {
      setIsDialogOpen(true);
    } else {
      toast({
        title: translate('gainService', 'methodSelected', language),
        description: `${translate('gainService', 'selected', language)}: ${translate('gainService', method, language)}`,
        duration: 3000
      });
    }
  };
  
  // Handle promo code submission
  const onSubmitPromo = async (data: { promoCode: string }) => {
    if (!data.promoCode.trim()) {
      toast({
        title: translate('gainService', 'promoRequired', language) || "Promo code required",
        description: translate('gainService', 'enterValidPromo', language) || "Please enter a valid promo code",
        variant: "destructive",
        duration: 3000
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const result = await processServiceAccess({
        method: 'promoCode',
        promoCode: data.promoCode
      });
      
      if (result.success) {
        saveAccessToken(result);
        setAccessResult(result, 'promoCode');
        
        toast({
          title: translate('gainService', 'promoApplied', language),
          description: result.message,
          duration: 3000
        });
      } else {
        toast({
          title: translate('gainService', 'promoError', language) || "Error",
          description: result.message,
          variant: "destructive",
          duration: 3000
        });
      }
    } catch (error) {
      toast({
        title: translate('gainService', 'error', language) || "Error",
        description: (error instanceof Error) ? error.message : String(error),
        variant: "destructive",
        duration: 3000
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Process the selected payment method
  const processSelectedMethod = async () => {
    if (!selectedMethod) return;
    
    setIsProcessing(true);
    
    try {
      const result = await processServiceAccess({
        method: selectedMethod,
        referralCode: selectedMethod === 'referral' ? referralCode : undefined,
        email: userEmail || undefined
      });
      
      if (result.success) {
        saveAccessToken(result);
        setAccessResult(result, selectedMethod);
        
        toast({
          title: translate('gainService', 'accessGranted', language) || "Access Granted",
          description: result.message,
          duration: 3000
        });
        
        // Close dialog if open
        setIsDialogOpen(false);
      } else {
        toast({
          title: translate('gainService', 'error', language) || "Error",
          description: result.message,
          variant: "destructive",
          duration: 3000
        });
      }
    } catch (error) {
      toast({
        title: translate('gainService', 'error', language) || "Error",
        description: (error instanceof Error) ? error.message : String(error),
        variant: "destructive",
        duration: 3000
      });
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
            <Card 
              key={method.id}
              className={`card-hover border border-gray-100 h-full transition-all duration-300 ${(selectedMethod === method.id || accessMethod === method.id) ? 'ring-2 ring-calmBlue-500 shadow-lg' : ''}`}
            >
              <CardHeader className="pb-2">
                <div className={`${method.iconBg} p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4`}>
                  {method.icon}
                </div>
                <CardTitle className="text-xl font-bold">{method.title}</CardTitle>
                <CardDescription className="mt-2">{method.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {method.benefits.map((benefit, index) => (
                    <li key={index} className={`flex items-start ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                      <Check className={`h-5 w-5 text-green-500 shrink-0 mt-0.5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      <span className="text-sm text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {method.id === "promoCode" ? (
                  <Form {...promoForm}>
                    <form onSubmit={promoForm.handleSubmit(onSubmitPromo)} className="w-full space-y-2">
                      <FormField
                        control={promoForm.control}
                        name="promoCode"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex space-x-2">
                              <FormControl>
                                <input 
                                  placeholder={translate('gainService', 'enterPromoCode', language)} 
                                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                  {...field} 
                                  disabled={isProcessing}
                                />
                              </FormControl>
                              <Button type="submit" size="sm" disabled={isProcessing}>
                                {isProcessing ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  translate('gainService', 'apply', language)
                                )}
                              </Button>
                            </div>
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                ) : (
                  <Button 
                    onClick={() => handleMethodSelect(method.id)}
                    variant={accessMethod === method.id ? "default" : "outline"} 
                    className="w-full hover:bg-calmBlue-50"
                    disabled={isProcessing || (hasAccess && accessMethod !== method.id)}
                  >
                    {isProcessing && selectedMethod === method.id ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    {accessMethod === method.id 
                      ? translate('gainService', 'activeMethod', language) || "Active Method"
                      : translate('gainService', 'selectMethod', language)}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
        
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
      </div>
      
      {/* Dialog for additional information */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedMethod === 'referral' 
                ? translate('gainService', 'referralInformation', language) || "Enter Referral Code" 
                : translate('gainService', 'additionalInformation', language) || "Additional Information"}
            </DialogTitle>
            <DialogDescription>
              {selectedMethod === 'referral' 
                ? translate('gainService', 'referralDesc', language)
                : translate('gainService', 'completeInformation', language) || "Please complete the required information"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {selectedMethod === 'referral' && (
              <div className="space-y-2">
                <Label htmlFor="referralCode">
                  {translate('gainService', 'referralCode', language) || "Referral Code"}
                </Label>
                <Input 
                  id="referralCode"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  placeholder={translate('gainService', 'enterReferralCode', language) || "Enter referral code"}
                  disabled={isProcessing}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">
                {translate('gainService', 'email', language) || "Email"}
              </Label>
              <Input 
                id="email"
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder={translate('gainService', 'enterEmail', language) || "Enter your email"}
                disabled={isProcessing}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isProcessing}>
              {translate('gainService', 'cancel', language) || "Cancel"}
            </Button>
            <Button onClick={processSelectedMethod} disabled={isProcessing}>
              {isProcessing && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              {translate('gainService', 'proceed', language) || "Proceed"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default GainService;
