
export const translations = {
  navbar: {
    en: {
      services: 'Services',
      howItWorks: 'How It Works', 
      specialists: 'Specialists',
      plans: 'Plans',
      login: 'Login',
      register: 'Register'
    },
    ar: {
      services: 'الخدمات',
      howItWorks: 'كيف يعمل', 
      specialists: 'المتخصصين',
      plans: 'الخطط',
      login: 'تسجيل الدخول',
      register: 'تسجيل'
    }
  },
  hero: {
    en: {
      title: 'Professional Mental Health Support at Your Fingertips',
      description: 'Connect with licensed therapists and counselors online, from the comfort of your home. Get the support you need, when you need it, with complete privacy and confidentiality.',
      bookConsultation: 'Book Consultation',
      freeAssessment: 'Free Assessment'
    },
    ar: {
      title: 'دعم الصحة النفسية المهنية بين يديك',
      description: 'تواصل مع المعالجين والمستشارين المرخصين عبر الإنترنت، من راحة منزلك. احصل على الدعم الذي تحتاجه، عندما تحتاجه، مع خصوصية وسرية كاملة.',
      bookConsultation: 'احجز استشارة',
      freeAssessment: 'تقييم مجاني'
    }
  }
};

export const translate = (section: keyof typeof translations, key: string, language: 'en' | 'ar') => {
  return translations[section][language][key];
};
