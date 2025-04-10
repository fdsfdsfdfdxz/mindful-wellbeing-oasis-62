
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
  HeartHandshake 
} from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";

const GainService = () => {
  const { language, isRTL } = useLanguage();
  const { toast } = useToast();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      promoCode: ""
    }
  });

  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method);
    toast({
      title: translate('gainService', 'methodSelected', language),
      description: `${translate('gainService', 'selected', language)}: ${translate('gainService', method, language)}`,
      duration: 3000
    });
  };

  const onSubmitPromo = (data: { promoCode: string }) => {
    toast({
      title: translate('gainService', 'promoApplied', language),
      description: translate('gainService', 'promoSuccess', language),
      duration: 3000
    });
  };

  // Ways to gain services 
  const gainMethods = [
    {
      id: "subscription",
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
      id: "oneTimePayment",
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
      id: "referral",
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
      id: "promoCode",
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {gainMethods.map((method) => (
            <Card 
              key={method.id}
              className={`card-hover border border-gray-100 h-full transition-all duration-300 ${selectedMethod === method.id ? 'ring-2 ring-calmBlue-500 shadow-lg' : ''}`}
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
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitPromo)} className="w-full space-y-2">
                      <FormField
                        control={form.control}
                        name="promoCode"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex space-x-2">
                              <FormControl>
                                <input 
                                  placeholder={translate('gainService', 'enterPromoCode', language)} 
                                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                  {...field} 
                                />
                              </FormControl>
                              <Button type="submit" size="sm">
                                {translate('gainService', 'apply', language)}
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
                    variant="outline" 
                    className="w-full hover:bg-calmBlue-50"
                  >
                    {translate('gainService', 'selectMethod', language)}
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
    </section>
  );
};

export default GainService;
