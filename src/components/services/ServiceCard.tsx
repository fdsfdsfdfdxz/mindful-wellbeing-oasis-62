
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";
import { ServiceAccessMethod } from "@/services/paymentService";
import { Form } from "@/components/ui/form";

// Badge text translations
const badgeTranslations: Record<string, { en: string; ar: string }> = {
  "Unlimited Access": { en: "Unlimited Access", ar: "وصول غير محدود" },
  "Priority Support": { en: "Priority Support", ar: "دعم ذو أولوية" },
  "Progress Tracking": { en: "Progress Tracking", ar: "تتبع التقدم" },
  "No Commitment": { en: "No Commitment", ar: "بدون التزام" },
  "Choose Specialist": { en: "Choose Specialist", ar: "اختيار المتخصص" },
  "Session Recording": { en: "Session Recording", ar: "تسجيل الجلسة" },
  "Free Sessions": { en: "Free Sessions", ar: "جلسات مجانية" },
  "Friend Discount": { en: "Friend Discount", ar: "خصم للأصدقاء" },
  "Unlimited Referrals": { en: "Unlimited Referrals", ar: "إحالات غير محدودة" },
  "Service Discounts": { en: "Service Discounts", ar: "خصومات على الخدمات" },
  "Stackable Offers": { en: "Stackable Offers", ar: "عروض قابلة للتراكم" },
  "Special Promotions": { en: "Special Promotions", ar: "عروض خاصة" }
};

interface ServiceCardProps {
  id: ServiceAccessMethod;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  benefits: string[];
  isSelected: boolean;
  isProcessing: boolean;
  isActive: boolean;
  hasAccess: boolean;
  onSelect: (method: ServiceAccessMethod) => void;
  promoForm?: React.ReactNode;
}

const ServiceCard = ({
  id,
  title,
  description,
  icon,
  iconBg,
  benefits,
  isSelected,
  isProcessing,
  isActive,
  hasAccess,
  onSelect,
  promoForm
}: ServiceCardProps) => {
  const { language, isRTL } = useLanguage();

  // Function to translate badge text
  const translateBenefit = (text: string) => {
    return badgeTranslations[text] ? 
      (language === 'ar' ? badgeTranslations[text].ar : badgeTranslations[text].en) : 
      text;
  };

  return (
    <Card 
      className={`card-hover border border-gray-100 h-full transition-all duration-300 ${(isSelected || isActive) ? 'ring-2 ring-calmBlue-500 shadow-lg' : ''}`}
    >
      <CardHeader className="pb-2">
        <div className={`${iconBg} p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4`}>
          {icon}
        </div>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className={`flex items-start ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
              <Check className={`h-5 w-5 text-green-500 shrink-0 mt-0.5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              <span className="text-sm text-gray-600">{translateBenefit(benefit)}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {id === "promoCode" ? (
          promoForm
        ) : (
          <Button 
            onClick={() => onSelect(id)}
            variant={isActive ? "default" : "outline"} 
            className="w-full hover:bg-calmBlue-50"
            disabled={isProcessing || (hasAccess && !isActive)}
          >
            {isProcessing && isSelected ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            {isActive 
              ? translate('gainService', 'activeMethod', language) || "Active Method"
              : translate('gainService', 'selectMethod', language)}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
