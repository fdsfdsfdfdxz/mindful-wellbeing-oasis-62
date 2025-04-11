type TranslationKey = string;
type SubKey = string;
type Language = 'en' | 'ar';

const translations: Record<TranslationKey, Record<SubKey, Record<Language, string>>> = {
  navbar: {
    en: {
      home: 'Home',
      services: 'Services',
      specialists: 'Specialists',
      testimonials: 'Testimonials',
      contact: 'Contact',
      login: 'Login',
      signup: 'Sign Up'
    },
    ar: {
      home: 'الرئيسية',
      services: 'خدماتنا',
      specialists: 'المتخصصون',
      testimonials: 'الشهادات',
      contact: 'اتصل بنا',
      login: 'تسجيل الدخول',
      signup: 'اشتراك'
    }
  },
  hero: {
    en: {
      title: 'Your Mental Wellness Journey Starts Here',
      description: 'Connect with licensed therapists and embark on a path to better mental health. Start your personalized therapy today.',
      bookConsultation: 'Book a Consultation',
      freeAssessment: 'Free Assessment'
    },
    ar: {
      title: 'تبدأ رحلتك نحو الصحة النفسية من هنا',
      description: 'تواصل مع معالجين مرخصين وابدأ طريقك نحو صحة نفسية أفضل. ابدأ علاجك الشخصي اليوم.',
      bookConsultation: 'احجز استشارة',
      freeAssessment: 'تقييم مجاني'
    }
  },
  services: {
    en: {
      title: 'Our Comprehensive Services',
      subtitle: 'Explore a range of mental health services tailored to your needs',
      privateConsultations: 'Private Consultations',
      privateConsultationsDesc: 'One-on-one sessions with experienced therapists.',
      anonymousConsultations: 'Anonymous Consultations',
      anonymousConsultationsDesc: 'Get support without revealing your identity.',
      psychologicalAssessments: 'Psychological Assessments',
      psychologicalAssessmentsDesc: 'Understand your mental state with detailed evaluations.',
      specializedTherapy: 'Specialized Therapy Programs',
      specializedTherapyDesc: 'Targeted programs for specific mental health challenges.',
      marriageCounseling: 'Marriage Counseling',
      marriageCounselingDesc: 'Strengthen your relationship with expert guidance.',
      selfDevelopment: 'Self-Development Workshops',
      selfDevelopmentDesc: 'Enhance your personal growth and well-being.',
      educationalResources: 'Educational Resources',
      educationalResourcesDesc: 'Access articles, guides, and videos on mental health.',
      followupCare: 'Follow-up Care',
      followupCareDesc: 'Continued support to maintain your mental wellness.',
      bookSession: 'Book a Session',
      startAnonymously: 'Start Anonymously',
      takeAssessment: 'Take Assessment',
      explorePrograms: 'Explore Programs',
      familySolutions: 'Family Solutions',
      startGrowing: 'Start Growing',
      browseLibrary: 'Browse Library',
      learnMore: 'Learn More',
      whyChooseUs: 'Why Choose Our Services?',
      feature1: 'Personalized Treatment Plans',
      feature2: 'Experienced and Licensed Therapists',
      feature3: 'Secure and Confidential Environment',
      feature4: 'Flexible Scheduling Options',
      getStarted: 'Get Started Today'
    },
    ar: {
      title: 'خدماتنا الشاملة',
      subtitle: 'اكتشف مجموعة من خدمات الصحة النفسية المصممة خصيصًا لتلبية احتياجاتك',
      privateConsultations: 'استشارات خاصة',
      privateConsultationsDesc: 'جلسات فردية مع معالجين ذوي خبرة.',
      anonymousConsultations: 'استشارات مجهولة',
      anonymousConsultationsDesc: 'احصل على الدعم دون الكشف عن هويتك.',
      psychologicalAssessments: 'تقييمات نفسية',
      psychologicalAssessmentsDesc: 'افهم حالتك العقلية من خلال تقييمات مفصلة.',
      specializedTherapy: 'برامج علاج متخصصة',
      specializedTherapyDesc: 'برامج تستهدف تحديات الصحة النفسية المحددة.',
      marriageCounseling: 'استشارات زوجية',
      marriageCounselingDesc: 'عزز علاقتك بتوجيهات الخبراء.',
      selfDevelopment: 'ورش عمل لتطوير الذات',
      selfDevelopmentDesc: 'عزز نموك الشخصي ورفاهيتك.',
      educationalResources: 'مصادر تعليمية',
      educationalResourcesDesc: 'الوصول إلى المقالات والأدلة ومقاطع الفيديو حول الصحة النفسية.',
      followupCare: 'رعاية المتابعة',
      followupCareDesc: 'دعم مستمر للحفاظ على صحتك النفسية.',
      bookSession: 'احجز جلسة',
      startAnonymously: 'ابدأ بشكل مجهول',
      takeAssessment: 'إجراء تقييم',
      explorePrograms: 'استكشف البرامج',
      familySolutions: 'حلول عائلية',
      startGrowing: 'ابدأ النمو',
      browseLibrary: 'تصفح المكتبة',
      learnMore: 'اعرف المزيد',
      whyChooseUs: 'لماذا تختار خدماتنا؟',
      feature1: 'خطط علاج مخصصة',
      feature2: 'معالجون ذوو خبرة ومرخصون',
      feature3: 'بيئة آمنة وسرية',
      feature4: 'خيارات جدولة مرنة',
      getStarted: 'ابدأ اليوم'
    }
  },
  gainService: {
    en: {
      title: 'How to Gain Our Services',
      subtitle: 'Choose the most convenient way to access our mental health services',
      subscription: 'Subscription Plans',
      subscriptionDesc: 'Ongoing support with flexible payment plans',
      subscriptionBenefit1: 'Unlimited access to all services',
      subscriptionBenefit2: 'Priority booking with specialists',
      subscriptionBenefit3: 'Monthly progress tracking and reports',
      oneTimePayment: 'One-Time Payment',
      oneTimePaymentDesc: 'Pay for individual sessions as needed',
      oneTimePaymentBenefit1: 'No long-term commitment required',
      oneTimePaymentBenefit2: 'Choose any specialist for your session',
      oneTimePaymentBenefit3: 'Full session recording available',
      referral: 'Referral Program',
      referralDesc: 'Share with friends and earn free sessions',
      referralBenefit1: 'Earn one free session per successful referral',
      referralBenefit2: 'Your friend gets 15% off their first session',
      referralBenefit3: 'No limit to how many friends you can refer',
      promoCode: 'Promo Code',
      promoCodeDesc: 'Apply a promotional code for discounts',
      promoCodeBenefit1: 'One-time discounts on any service',
      promoCodeBenefit2: 'Combine with other offers where applicable',
      promoCodeBenefit3: 'Redeem special event and partner promotions',
      enterPromoCode: 'Enter promo code',
      apply: 'Apply',
      selectMethod: 'Select This Method',
      methodSelected: 'Method Selected',
      selected: 'You selected',
      promoApplied: 'Promo Code Applied',
      promoSuccess: 'Your promotional code was successfully applied to your account.',
      securePayment: 'Secure Payment Processing',
      securePaymentDesc: 'All payments are processed securely with industry-standard encryption.',
      instantAccess: 'Instant Access to Services',
      instantAccessDesc: 'Gain immediate access to our services after completing your payment or promotion.',
      // New translations for enhanced functionality
      error: 'Error',
      accessGranted: 'Access Granted',
      accessMethod: 'Access Method',
      activeMethod: 'Active Method',
      promoRequired: 'Promo Code Required',
      enterValidPromo: 'Please enter a valid promo code',
      promoError: 'Promo Code Error',
      referralInformation: 'Enter Referral Code',
      additionalInformation: 'Additional Information',
      completeInformation: 'Please complete the required information',
      referralCode: 'Referral Code',
      enterReferralCode: 'Enter referral code',
      email: 'Email',
      enterEmail: 'Enter your email',
      cancel: 'Cancel',
      proceed: 'Proceed'
    },
    ar: {
      title: 'كيفية الحصول على خدماتنا',
      subtitle: 'اختر الطريقة الأكثر ملاءمة للوصول إلى خدمات الصحة النفسية لدينا',
      subscription: 'خطط الاشتراك',
      subscriptionDesc: 'دعم مستمر مع خطط دفع مرنة',
      subscriptionBenefit1: 'وصول غير محدود لجميع الخدمات',
      subscriptionBenefit2: 'حجز ذو أولوية مع المتخصصين',
      subscriptionBenefit3: 'متابعة التقدم الشهري والتقارير',
      oneTimePayment: 'دفعة لمرة واحدة',
      oneTimePaymentDesc: 'ادفع مقابل الجلسات الفردية حسب الحاجة',
      oneTimePaymentBenefit1: 'لا يلزم التزام طويل الأمد',
      oneTimePaymentBenefit2: 'اختر أي متخصص لجلستك',
      oneTimePaymentBenefit3: 'تسجيل كامل للجلسة متاح',
      referral: 'برنامج الإحالة',
      referralDesc: 'شارك مع الأصدقاء واكسب جلسات مجانية',
      referralBenefit1: 'احصل على جلسة مجانية واحدة لكل إحالة ناجحة',
      referralBenefit2: 'يحصل صديقك على خصم 15٪ على جلسته الأولى',
      referralBenefit3: 'لا يوجد حد لعدد الأصدقاء الذين يمكنك إحالتهم',
      promoCode: 'رمز ترويجي',
      promoCodeDesc: 'استخدم رمزاً ترويجياً للحصول على خصومات',
      promoCodeBenefit1: 'خصومات لمرة واحدة على أي خدمة',
      promoCodeBenefit2: 'ادمجها مع عروض أخرى حيثما أمكن',
      promoCodeBenefit3: 'استرداق عروض المناسبات الخاصة والشركاء',
      enterPromoCode: 'أدخل الرمز الترويجي',
      apply: 'تطبيق',
      selectMethod: 'اختر هذه الطريقة',
      methodSelected: 'تم اختيار الطريقة',
      selected: 'لقد اخترت',
      promoApplied: 'تم تطبيق الرمز الترويجي',
      promoSuccess: 'تم تطبيق الرمز الترويجي الخاص بك بنجاح على حسابك.',
      securePayment: 'معالجة دفع آمنة',
      securePaymentDesc: 'تتم معالجة جميع المدفوعات بشكل آمن باستخدام تشفير بمعايير الصناعة.',
      instantAccess: 'وصول فوري إلى الخدمات',
      instantAccessDesc: 'احصل على وصول فوري إلى خدماتنا بعد إكمال الدفع أو الترويج الخاص بك.',
      // New translations for enhanced functionality
      error: 'خطأ',
      accessGranted: 'تم منح الوصول',
      accessMethod: 'طريقة الوصول',
      activeMethod: 'الطريقة النشطة',
      promoRequired: 'الرمز الترويجي مطلوب',
      enterValidPromo: 'الرجاء إدخال رمز ترويجي صالح',
      promoError: 'خطأ في الرمز الترويجي',
      referralInformation: 'أدخل رمز الإحالة',
      additionalInformation: 'معلومات إضافية',
      completeInformation: 'الرجاء إكمال المعلومات المطلوبة',
      referralCode: 'رمز الإحالة',
      enterReferralCode: 'أدخل رمز الإحالة',
      email: 'البريد الإلكتروني',
      enterEmail: 'أدخل بريدك الإلكتروني',
      cancel: 'إلغاء',
      proceed: 'متابعة'
    }
  },
  howItWorks: {
    en: {
      title: 'How It Works',
      subtitle: 'Simple steps to get the mental health support you need',
      step1Title: 'Sign Up',
      step1Description: 'Create an account and complete a brief questionnaire.',
      step2Title: 'Match',
      step2Description: 'Get matched with a therapist that fits your needs.',
      step3Title: 'Connect',
      step3Description: 'Start therapy sessions from the comfort of your home.',
      step1: 'Sign Up',
      step2: 'Match',
      step3: 'Connect'
    },
    ar: {
      title: 'كيف يعمل',
      subtitle: 'خطوات بسيطة للحصول على دعم الصحة النفسية الذي تحتاجه',
      step1Title: 'سجل',
      step1Description: 'أنشئ حسابًا وأكمل استبيانًا موجزًا.',
      step2Title: 'تطابق',
      step2Description: 'احصل على تطابق مع معالج يناسب احتياجاتك.',
      step3Title: 'تواصل',
      step3Description: 'ابدأ جلسات العلاج من منزلك المريح.',
      step1: 'سجل',
      step2: 'تطابق',
      step3: 'تواصل'
    }
  },
  specialists: {
    en: {
      title: 'Meet Our Specialists',
      subtitle: 'Our team of licensed therapists is here to support you',
      viewAll: 'View All Specialists'
    },
    ar: {
      title: 'تعرف على المتخصصين لدينا',
      subtitle: 'فريقنا من المعالجين المرخصين هنا لدعمك',
      viewAll: 'عرض جميع المتخصصين'
    }
  },
  privacy: {
    en: {
      title: 'Your Privacy Matters',
      subtitle: 'We ensure the highest standards of data protection and confidentiality',
      dataEncryption: 'End-to-End Data Encryption',
      confidentialityCommitment: 'Strict Confidentiality Commitment',
      complianceStandards: 'Compliance with International Standards',
      controlOverData: 'Full Control Over Your Data'
    },
    ar: {
      title: 'خصوصيتك مهمة',
      subtitle: 'نحن نضمن أعلى معايير حماية البيانات والسرية',
      dataEncryption: 'تشفير البيانات من طرف إلى طرف',
      confidentialityCommitment: 'الالتزام الصارم بالسرية',
      complianceStandards: 'الامتثال للمعايير الدولية',
      controlOverData: 'تحكم كامل في بياناتك'
    }
  },
   plans: {
    en: {
      title: 'Flexible Plans for Everyone',
      subtitle: 'Choose a plan that fits your lifestyle and budget',
      basicPlan: 'Basic Plan',
      basicPlanDescription: 'Essential support for everyday wellness',
      premiumPlan: 'Premium Plan',
      premiumPlanDescription: 'Comprehensive therapy with added benefits',
      unlimitedPlan: 'Unlimited Plan',
      unlimitedPlanDescription: 'Full access to all services and resources',
      accessNow: 'Access Now',
      monthly: '/month',
      benefits: 'Benefits'
    },
    ar: {
      title: 'خطط مرنة للجميع',
      subtitle: 'اختر خطة تناسب نمط حياتك وميزانيتك',
      basicPlan: 'الخطة الأساسية',
      basicPlanDescription: 'دعم أساسي للعافية اليومية',
      premiumPlan: 'الخطة المميزة',
      premiumPlanDescription: 'علاج شامل مع مزايا إضافية',
      unlimitedPlan: 'الخطة غير المحدودة',
      unlimitedPlanDescription: 'الوصول الكامل إلى جميع الخدمات والموارد',
      accessNow: 'الوصول الآن',
      monthly: '/شهر',
      benefits: 'المزايا'
    }
  },
  testimonials: {
    en: {
      title: 'What Our Clients Say',
      subtitle: 'Real stories from people who have transformed their lives with our help',
      readMore: 'Read More'
    },
    ar: {
      title: 'ماذا يقول عملاؤنا',
      subtitle: 'قصص حقيقية من أشخاص غيروا حياتهم بمساعدتنا',
      readMore: 'اقرأ المزيد'
    }
  },
  cta: {
    en: {
      title: 'Ready to Transform Your Life?',
      description: 'Take the first step towards a happier, healthier you. Book a consultation or get a free assessment today.',
      bookConsultation: 'Book a Consultation',
      freeAssessment: 'Get a Free Assessment',
      needHelp: 'Need help? Contact our support team.'
    },
    ar: {
      title: 'هل أنت مستعد لتغيير حياتك؟',
      description: 'اتخذ الخطوة الأولى نحو حياة أكثر سعادة وصحة. احجز استشارة أو احصل على تقييم مجاني اليوم.',
      bookConsultation: 'احجز استشارة',
      freeAssessment: 'احصل على تقييم مجاني',
      needHelp: 'تحتاج مساعدة؟ اتصل بفريق الدعم لدينا.'
    }
  },
  footer: {
    en: {
      aboutUs: 'About Us',
      ourServices: 'Our Services',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      contactUs: 'Contact Us',
      allRightsReserved: '© 2024 Mental Health Platform. All Rights Reserved.'
    },
    ar: {
      aboutUs: 'معلومات عنا',
      ourServices: 'خدماتنا',
      privacyPolicy: 'سياسة الخصوصية',
      termsOfService: 'شروط الخدمة',
      contactUs: 'اتصل بنا',
      allRightsReserved: '© 2024 منصة الصحة النفسية. جميع الحقوق محفوظة.'
    }
  },
  notFound: {
    en: {
      title: 'Page Not Found',
      description: 'The page you are looking for does not exist or has been moved.',
      goHome: 'Go to Home'
    },
    ar: {
      title: 'الصفحة غير موجودة',
      description: 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
      goHome: 'العودة إلى الرئيسية'
    }
  },
  
  auth: {
    en: {
      login: 'Login',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      forgotPassword: 'Forgot Password?',
      loginSuccess: 'Login Successful',
      welcomeBack: 'Welcome back!',
      registrationSuccess: 'Registration Successful',
      accountCreated: 'Your account has been created successfully.',
      error: 'Error',
      invalidCredentials: 'Invalid email or password',
      allFieldsRequired: 'All fields are required',
      loggingIn: 'Logging in...',
      registering: 'Registering...',
      noAccount: 'Don\'t have an account?',
      alreadyHaveAccount: 'Already have an account?',
      registerNow: 'Register now',
      emailPlaceholder: 'Enter your email',
      passwordPlaceholder: 'Enter your password',
      confirmPasswordPlaceholder: 'Confirm your password',
      enterCredentials: 'Enter your credentials to access your account',
      createAccount: 'Create your account to access all features',
      account: 'Account',
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Logout',
      logoutSuccess: 'Logged out successfully',
      comeBackSoon: 'Come back soon!',
      secureLogin: 'Secure Login',
      secureLoginDesc: 'Your login information is protected with advanced encryption technology.',
      accountVerified: 'Account Verified',
      accountVerifiedDesc: 'Your account is active and verified. You have access to all available services.',
      invalidEmail: 'Please enter a valid email address',
      passwordLength: 'Password must be at least 8 characters',
      passwordsDoNotMatch: 'Passwords do not match',
      registrationFailed: 'Registration failed. Please try again.'
    },
    ar: {
      login: 'تسجيل الدخول',
      register: 'إنشاء حساب',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      forgotPassword: 'نسيت كلمة المرور؟',
      loginSuccess: 'تم تسجيل الدخول بنجاح',
      welcomeBack: 'مرحبا بعودتك!',
      registrationSuccess: 'تم التسجيل بنجاح',
      accountCreated: 'تم إنشاء حسابك بنجاح.',
      error: 'خطأ',
      invalidCredentials: 'بريد إلكتروني أو كلمة مرور غير صالحة',
      allFieldsRequired: 'جميع الحقول مطلوبة',
      loggingIn: 'جاري تسجيل الدخول...',
      registering: 'جاري التسجيل...',
      noAccount: 'ليس لديك حساب؟',
      alreadyHaveAccount: 'لديك حساب بالفعل؟',
      registerNow: 'سجل الآن',
      emailPlaceholder: 'أدخل بريدك الإلكتروني',
      passwordPlaceholder: 'أدخل كلمة المرور',
      confirmPasswordPlaceholder: 'تأكيد كلمة المرور',
      enterCredentials: 'أدخل بيانات الاعتماد الخاصة بك للوصول إلى حسابك',
      createAccount: 'أنشئ حسابك للوصول إلى جميع الميزات',
      account: 'الحساب',
      profile: 'الملف الشخصي',
      settings: 'الإعدادات',
      logout: 'تسجيل الخروج',
      logoutSuccess: 'تم تسجيل الخروج بنجاح',
      comeBackSoon: 'عد قريبا!',
      secureLogin: 'تسجيل دخول آمن',
      secureLoginDesc: 'معلومات تسجيل الدخول الخاصة بك محمية بتقنية تشفير متقدمة.',
      accountVerified: 'تم التحقق من الحساب',
      accountVerifiedDesc: 'حسابك نشط وتم التحقق منه. لديك حق الوصول إلى جميع الخدمات المتاحة.',
      invalidEmail: 'الرجاء إدخال عنوان بريد إلكتروني صالح',
      passwordLength: 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل',
      passwordsDoNotMatch: 'كلمات المرور غير متطابقة',
      registrationFailed: 'فشل التسجيل. يرجى المحاولة مرة أخرى.'
    }
  },
  
  accessibility: {
    skipToContent: {
      en: "Skip to content",
      ar: "تخطي إلى المحتوى"
    },
    toggleTheme: {
      en: "Toggle theme",
      ar: "تبديل السمة"
    },
    highContrast: {
      en: "High contrast mode",
      ar: "وضع التباين العالي"
    },
    loading: {
      en: "Loading...",
      ar: "جار التحميل..."
    },
    loadingContent: {
      en: "Please wait while we load your content",
      ar: "يرجى الانتظار بينما نقوم بتحميل المحتوى الخاص بك"
    },
    error: {
      en: "An error occurred",
      ar: "حدث خطأ"
    },
    retry: {
      en: "Retry",
      ar: "إعادة المحاولة"
    },
    errorBoundary: {
      en: "Something went wrong",
      ar: "حدث خطأ ما"
    },
    errorBoundaryDesc: {
      en: "An error occurred while rendering this component",
      ar: "حدث خطأ أثناء عرض هذا المكون"
    }
  },
  
  theme: {
    light: {
      en: "Light",
      ar: "فاتح"
    },
    dark: {
      en: "Dark",
      ar: "داكن"
    },
    system: {
      en: "System",
      ar: "نظام"
    },
    switchToLight: {
      en: "Switch to light theme",
      ar: "التبديل إلى المظهر الفاتح"
    },
    switchToDark: {
      en: "Switch to dark theme",
      ar: "التبديل إلى المظهر الداكن"
    },
    useSystemPreference: {
      en: "Use system preference",
      ar: "استخدام تفضيلات النظام"
    }
  },
  
  feedback: {
    success: {
      en: "Success",
      ar: "نجاح"
    },
    error: {
      en: "Error",
      ar: "خطأ"
    },
    warning: {
      en: "Warning",
      ar: "تحذير"
    },
    info: {
      en: "Information",
      ar: "معلومات"
    },
    networkError: {
      en: "Network error. Please check your connection.",
      ar: "خطأ في الشبكة. يرجى التحقق من اتصالك."
    },
    sessionExpired: {
      en: "Your session has expired. Please log in again.",
      ar: "انتهت جلستك. الرجاء تسجيل الدخول مرة أخرى."
    },
    formErrors: {
      en: "Please fix the errors in the form",
      ar: "يرجى إصلاح الأخطاء في النموذج"
    },
    savedSuccess: {
      en: "Changes saved successfully",
      ar: "تم حفظ التغييرات بنجاح"
    }
  }
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
