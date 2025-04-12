import { NavbarTranslations } from './navbar';
import { HeroTranslations } from './hero';
import { ServicesTranslations } from './services';
import { GainServiceTranslations } from './gainService';
import { HowItWorksTranslations } from './howItWorks';
import { SpecialistsTranslations } from './specialists';
import { PrivacyTranslations } from './privacy';
import { PlansTranslations } from './plans';
import { TestimonialsTranslations } from './testimonials';
import { CTATranslations } from './cta';
import { FooterTranslations } from './footer';
import { NotFoundTranslations } from './notFound';
import { AuthTranslations } from './auth';
import { AccessibilityTranslations } from './accessibility';
import { ThemeTranslations } from './theme';
import { FeedbackTranslations } from './feedback';
import { LiveChatTranslations } from './liveChat';
import { MobileAppTranslations } from './mobileApp';
import { DoctorChatTranslations } from './doctorChat';
import { ConsultationTranslations } from './consultation';

// Define the translation types
export type TranslationKey = string;
export type SubKey = string;
export type Language = 'en' | 'ar';

export interface TranslationContent {
  [key: string]: {
    en: string;
    ar: string;
  };
}

// Add common translations for buttons if it doesn't exist already
export const translations: Record<TranslationKey, TranslationContent> = {
  common: {
    back: {
      en: "Back",
      ar: "رجوع"
    },
    submitting: {
      en: "Submitting...",
      ar: "جارِ الإرسال..."
    },
    submit: {
      en: "Submit",
      ar: "إرسال"
    },
    save: {
      en: "Save",
      ar: "حفظ"
    },
    cancel: {
      en: "Cancel",
      ar: "إلغاء"
    },
    close: {
      en: "Close",
      ar: "إغلاق"
    },
    continue: {
      en: "Continue",
      ar: "متابعة"
    }
  },
  navbar: NavbarTranslations,
  hero: HeroTranslations,
  services: ServicesTranslations,
  gainService: GainServiceTranslations,
  howItWorks: HowItWorksTranslations,
  specialists: SpecialistsTranslations,
  privacy: PrivacyTranslations,
  plans: PlansTranslations,
  testimonials: TestimonialsTranslations,
  cta: CTATranslations,
  footer: FooterTranslations,
  notFound: NotFoundTranslations,
  auth: AuthTranslations,
  accessibility: AccessibilityTranslations,
  theme: ThemeTranslations,
  feedback: FeedbackTranslations,
  liveChat: LiveChatTranslations,
  mobileApp: MobileAppTranslations,
  doctorChat: DoctorChatTranslations,
  consultation: ConsultationTranslations
};

export const translate = (
  key: string,
  subKey: string,
  language: Language
): string => {
  // Try to find the translation
  const section = translations[key];
  if (!section) return subKey;
  
  const content = section[subKey];
  if (!content) return subKey;
  
  const translation = content[language];
  
  // If translation exists, return it, otherwise return the English version or subKey
  return translation || content['en'] || subKey;
};
