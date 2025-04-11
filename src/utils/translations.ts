type TranslationKey = string;
type SubKey = string;
type Language = 'en' | 'ar';

interface TranslationContent {
  [key: string]: {
    en: string;
    ar: string;
  };
}

const translations: Record<TranslationKey, TranslationContent> = {
  navbar: {
    home: {
      en: 'Home',
      ar: 'الرئيسية'
    },
    services: {
      en: 'Services',
      ar: 'خدماتنا'
    },
    specialists: {
      en: 'Specialists',
      ar: 'المتخصصون'
    },
    testimonials: {
      en: 'Testimonials',
      ar: 'الشهادات'
    },
    contact: {
      en: 'Contact',
      ar: 'اتصل بنا'
    },
    login: {
      en: 'Login',
      ar: 'تسجيل الدخول'
    },
    signup: {
      en: 'Sign Up',
      ar: 'اشتراك'
    }
  },
  hero: {
    title: {
      en: 'Your Mental Wellness Journey Starts Here',
      ar: 'تبدأ رحلتك نحو الصحة النفسية من هنا'
    },
    description: {
      en: 'Connect with licensed therapists and embark on a path to better mental health. Start your personalized therapy today.',
      ar: 'تواصل مع معالجين مرخصين وابدأ طريقك نحو صحة نفسية أفضل. ابدأ علاجك الشخصي اليوم.'
    },
    bookConsultation: {
      en: 'Book a Consultation',
      ar: 'احجز استشارة'
    },
    freeAssessment: {
      en: 'Free Assessment',
      ar: 'تقييم مجاني'
    }
  },
  services: {
    title: {
      en: 'Our Comprehensive Services',
      ar: 'خدماتنا الشاملة'
    },
    subtitle: {
      en: 'Explore a range of mental health services tailored to your needs',
      ar: 'اكتشف مجموعة من خدمات الصحة النفسية المصممة خصيصًا لتلبية احتياجاتك'
    },
    privateConsultations: {
      en: 'Private Consultations',
      ar: 'استشارات خاصة'
    },
    privateConsultationsDesc: {
      en: 'One-on-one sessions with experienced therapists.',
      ar: 'جلسات فردية مع معالجين ذوي خبرة.'
    },
    anonymousConsultations: {
      en: 'Anonymous Consultations',
      ar: 'استشارات مجهولة'
    },
    anonymousConsultationsDesc: {
      en: 'Get support without revealing your identity.',
      ar: 'احصل على الدعم دون الكشف عن هويتك.'
    },
    psychologicalAssessments: {
      en: 'Psychological Assessments',
      ar: 'تقييمات نفسية'
    },
    psychologicalAssessmentsDesc: {
      en: 'Understand your mental state with detailed evaluations.',
      ar: 'افهم حالتك العقلية من خلال تقييمات مفصلة.'
    },
    specializedTherapy: {
      en: 'Specialized Therapy Programs',
      ar: 'برامج علاج متخصصة'
    },
    specializedTherapyDesc: {
      en: 'Targeted programs for specific mental health challenges.',
      ar: 'برامج تستهدف تحديات الصحة النفسية المحددة.'
    },
    marriageCounseling: {
      en: 'Marriage Counseling',
      ar: 'استشارات زوجية'
    },
    marriageCounselingDesc: {
      en: 'Strengthen your relationship with expert guidance.',
      ar: 'عزز علاقتك بتوجيهات الخبراء.'
    },
    selfDevelopment: {
      en: 'Self-Development Workshops',
      ar: 'ورش عمل لتطوير الذات'
    },
    selfDevelopmentDesc: {
      en: 'Enhance your personal growth and well-being.',
      ar: 'عزز نموك الشخصي ورفاهيتك.'
    },
    educationalResources: {
      en: 'Educational Resources',
      ar: 'مصادر تعليمية'
    },
    educationalResourcesDesc: {
      en: 'Access articles, guides, and videos on mental health.',
      ar: 'الوصول إلى المقالات والأدلة ومقاطع الفيديو حول الصحة النفسية.'
    },
    followupCare: {
      en: 'Follow-up Care',
      ar: 'رعاية المتابعة'
    },
    followupCareDesc: {
      en: 'Continued support to maintain your mental wellness.',
      ar: 'دعم مستمر للحفاظ على صحتك النفسية.'
    },
    bookSession: {
      en: 'Book a Session',
      ar: 'احجز جلسة'
    },
    startAnonymously: {
      en: 'Start Anonymously',
      ar: 'ابدأ بشكل مجهول'
    },
    takeAssessment: {
      en: 'Take Assessment',
      ar: 'إجراء تقييم'
    },
    explorePrograms: {
      en: 'Explore Programs',
      ar: 'استكشف البرامج'
    },
    familySolutions: {
      en: 'Family Solutions',
      ar: 'حلول عائلية'
    },
    startGrowing: {
      en: 'Start Growing',
      ar: 'ابدأ النمو'
    },
    browseLibrary: {
      en: 'Browse Library',
      ar: 'تصفح المكتبة'
    },
    learnMore: {
      en: 'Learn More',
      ar: 'اعرف المزيد'
    },
    whyChooseUs: {
      en: 'Why Choose Our Services?',
      ar: 'لماذا تختار خدماتنا؟'
    },
    feature1: {
      en: 'Personalized Treatment Plans',
      ar: 'خطط علاج مخصصة'
    },
    feature2: {
      en: 'Experienced and Licensed Therapists',
      ar: 'معالجون ذوو خبرة ومرخصون'
    },
    feature3: {
      en: 'Secure and Confidential Environment',
      ar: 'بيئة آمنة وسرية'
    },
    feature4: {
      en: 'Flexible Scheduling Options',
      ar: 'خيارات جدولة مرنة'
    },
    getStarted: {
      en: 'Get Started Today',
      ar: 'ابدأ اليوم'
    },
    navigating: {
      en: 'Navigating to service',
      ar: 'الانتقال إلى الخدمة'
    },
    redirecting: {
      en: "You're being redirected to the selected service page",
      ar: 'يتم إعادة توجيهك إلى صفحة الخدمة المحددة'
    }
  },
  gainService: {
    title: {
      en: 'How to Gain Our Services',
      ar: 'كيفية الحصول على خدماتنا'
    },
    subtitle: {
      en: 'Choose the most convenient way to access our mental health services',
      ar: 'اختر الطريقة الأكثر ملاءمة للوصول إلى خدمات الصحة النفسية لدينا'
    },
    subscription: {
      en: 'Subscription Plans',
      ar: 'خطط الاشتراك'
    },
    subscriptionDesc: {
      en: 'Ongoing support with flexible payment plans',
      ar: 'دعم مستمر مع خطط دفع مرنة'
    },
    subscriptionBenefit1: {
      en: 'Unlimited access to all services',
      ar: 'وصول غير محدود لجميع الخدمات'
    },
    subscriptionBenefit2: {
      en: 'Priority booking with specialists',
      ar: 'حجز ذو أولوية مع المتخصصين'
    },
    subscriptionBenefit3: {
      en: 'Monthly progress tracking and reports',
      ar: 'متابعة التقدم الشهري والتقارير'
    },
    oneTimePayment: {
      en: 'One-Time Payment',
      ar: 'دفعة لمرة واحدة'
    },
    oneTimePaymentDesc: {
      en: 'Pay for individual sessions as needed',
      ar: 'ادفع مقابل الجلسات الفردية حسب الحاجة'
    },
    oneTimePaymentBenefit1: {
      en: 'No long-term commitment required',
      ar: 'لا يلزم التزام طويل الأمد'
    },
    oneTimePaymentBenefit2: {
      en: 'Choose any specialist for your session',
      ar: 'اختر أي متخصص لجلستك'
    },
    oneTimePaymentBenefit3: {
      en: 'Full session recording available',
      ar: 'تسجيل كامل للجلسة متاح'
    },
    referral: {
      en: 'Referral Program',
      ar: 'برنامج الإحالة'
    },
    referralDesc: {
      en: 'Share with friends and earn free sessions',
      ar: 'شارك مع الأصدقاء واكسب جلسات مجانية'
    },
    referralBenefit1: {
      en: 'Earn one free session per successful referral',
      ar: 'احصل على جلسة مجانية واحدة لكل إحالة ناجحة'
    },
    referralBenefit2: {
      en: 'Your friend gets 15% off their first session',
      ar: 'يحصل صديقك على خصم 15٪ على جلسته الأولى'
    },
    referralBenefit3: {
      en: 'No limit to how many friends you can refer',
      ar: 'لا يوجد حد لعدد الأصدقاء الذين يمكنك إحالتهم'
    },
    promoCode: {
      en: 'Promo Code',
      ar: 'رمز ترويجي'
    },
    promoCodeDesc: {
      en: 'Apply a promotional code for discounts',
      ar: 'استخدم رمزاً ترويجياً للحصول على خصومات'
    },
    promoCodeBenefit1: {
      en: 'One-time discounts on any service',
      ar: 'خصومات لمرة واحدة على أي خدمة'
    },
    promoCodeBenefit2: {
      en: 'Combine with other offers where applicable',
      ar: 'ادمجها مع عروض أخرى حيثما أمكن'
    },
    promoCodeBenefit3: {
      en: 'Redeem special event and partner promotions',
      ar: 'استرداق عروض المناسبات الخاصة والشركاء'
    },
    enterPromoCode: {
      en: 'Enter promo code',
      ar: 'أدخل الرمز الترويجي'
    },
    apply: {
      en: 'Apply',
      ar: 'تطبيق'
    },
    selectMethod: {
      en: 'Select This Method',
      ar: 'اختر هذه الطريقة'
    },
    methodSelected: {
      en: 'Method Selected',
      ar: 'تم اختيار الطريقة'
    },
    selected: {
      en: 'You selected',
      ar: 'لقد اخترت'
    },
    promoApplied: {
      en: 'Promo Code Applied',
      ar: 'تم تطبيق الرمز الترويجي'
    },
    promoSuccess: {
      en: 'Your promotional code was successfully applied to your account.',
      ar: 'تم تطبيق الرمز الترويجي الخاص بك بنجاح على حسابك.'
    },
    securePayment: {
      en: 'Secure Payment Processing',
      ar: 'معالجة دفع آمنة'
    },
    securePaymentDesc: {
      en: 'All payments are processed securely with industry-standard encryption.',
      ar: 'تتم معالجة جميع المدفوعات بشكل آمن باستخدام تشفير بمعايير الصناعة.'
    },
    instantAccess: {
      en: 'Instant Access to Services',
      ar: 'وصول فوري إلى الخدمات'
    },
    instantAccessDesc: {
      en: 'Gain immediate access to our services after completing your payment or promotion.',
      ar: 'احصل على وصول فوري إلى خدماتنا بعد إكمال الدفع أو الترويج الخاص بك.'
    },
    error: {
      en: 'Error',
      ar: 'خطأ'
    },
    accessGranted: {
      en: 'Access Granted',
      ar: 'تم منح الوصول'
    },
    accessMethod: {
      en: 'Access Method',
      ar: 'طريقة الوصول'
    },
    activeMethod: {
      en: 'Active Method',
      ar: 'الطريقة النشطة'
    },
    promoRequired: {
      en: 'Promo Code Required',
      ar: 'الرمز الترويجي مطلوب'
    },
    enterValidPromo: {
      en: 'Please enter a valid promo code',
      ar: 'الرجاء إدخال رمز ترويجي صالح'
    },
    promoError: {
      en: 'Promo Code Error',
      ar: 'خطأ في الرمز الترويجي'
    },
    referralInformation: {
      en: 'Enter Referral Code',
      ar: 'أدخل رمز الإحالة'
    },
    additionalInformation: {
      en: 'Additional Information',
      ar: 'معلومات إضافية'
    },
    completeInformation: {
      en: 'Please complete the required information',
      ar: 'الرجاء إكمال المعلومات المطلوبة'
    },
    referralCode: {
      en: 'Referral Code',
      ar: 'رمز الإحالة'
    },
    enterReferralCode: {
      en: 'Enter referral code',
      ar: 'أدخل رمز الإحالة'
    },
    email: {
      en: 'Email',
      ar: 'البريد الإلكتروني'
    },
    enterEmail: {
      en: 'Enter your email',
      ar: 'أدخل بريدك الإلكتروني'
    },
    cancel: {
      en: 'Cancel',
      ar: 'إلغاء'
    },
    proceed: {
      en: 'Proceed',
      ar: 'متابعة'
    }
  },
  howItWorks: {
    title: {
      en: 'How It Works',
      ar: 'كيف يعمل'
    },
    subtitle: {
      en: 'Simple steps to get the mental health support you need',
      ar: 'خطوات بسيطة للحصول على دعم الصحة النفسية الذي تحتاجه'
    },
    step1Title: {
      en: 'Sign Up',
      ar: 'سجل'
    },
    step1Description: {
      en: 'Create an account and complete a brief questionnaire.',
      ar: 'أنشئ حسابًا وأكمل استبيانًا موجزًا.'
    },
    step2Title: {
      en: 'Match',
      ar: 'تطابق'
    },
    step2Description: {
      en: 'Get matched with a therapist that fits your needs.',
      ar: 'احصل على تطابق مع معالج يناسب احتياجاتك.'
    },
    step3Title: {
      en: 'Connect',
      ar: 'تواصل'
    },
    step3Description: {
      en: 'Start therapy sessions from the comfort of your home.',
      ar: 'ابدأ جلسات العلاج من منزلك المريح.'
    },
    step1: {
      en: 'Sign Up',
      ar: 'سجل'
    },
    step2: {
      en: 'Match',
      ar: 'تطابق'
    },
    step3: {
      en: 'Connect',
      ar: 'تواصل'
    },
    description: {
      en: 'Simple steps to get the mental health support you need',
      ar: 'خطوات بسيطة للحصول على دعم الصحة النفسية الذي تحتاجه'
    },
    step4: {
      en: 'Follow Up',
      ar: 'متابعة'
    },
    step5: {
      en: 'Schedule',
      ar: 'جدولة'
    },
    step6: {
      en: 'Attend Session',
      ar: 'حضور الجلسة'
    },
    step4Desc: {
      en: 'Continue your journey with regular check-ins.',
      ar: 'واصل رحلتك بفحوصات منتظمة.'
    },
    step5Desc: {
      en: 'Book your sessions at times that work for you.',
      ar: 'احجز جلساتك في الأوقات التي تناسبك.'
    },
    step6Desc: {
      en: 'Join your therapy sessions via video, voice, or text.',
      ar: 'انضم إلى جلسات العلاج عبر الفيديو أو الصوت أو النص.'
    },
    consultationMethods: {
      en: 'Consultation Methods',
      ar: 'طرق الاستشارة'
    },
    textChat: {
      en: 'Text Chat',
      ar: 'محادثة نصية'
    },
    voiceCall: {
      en: 'Voice Call',
      ar: 'مكالمة صوتية'
    },
    videoSession: {
      en: 'Video Session',
      ar: 'جلسة فيديو'
    },
    textChatDesc: {
      en: 'Message your therapist anytime.',
      ar: 'راسل معالجك في أي وقت.'
    },
    voiceCallDesc: {
      en: 'Connect through audio calls.',
      ar: 'تواصل من خلال المكالمات الصوتية.'
    },
    videoSessionDesc: {
      en: 'Face-to-face virtual sessions.',
      ar: 'جلسات افتراضية وجهاً لوجه.'
    }
  },
  specialists: {
    title: {
      en: 'Meet Our Specialists',
      ar: 'تعرف على المتخصصين لدينا'
    },
    subtitle: {
      en: 'Our team of licensed therapists is here to support you',
      ar: 'فريقنا من المعالجين المرخصين هنا لدعمك'
    },
    viewAll: {
      en: 'View All Specialists',
      ar: 'عرض جميع المتخصصين'
    }
  },
  privacy: {
    title: {
      en: 'Your Privacy Matters',
      ar: 'خصوصيتك مهمة'
    },
    subtitle: {
      en: 'We ensure the highest standards of data protection and confidentiality',
      ar: 'نحن نضمن أعلى معايير حماية البيانات والسرية'
    },
    dataEncryption: {
      en: 'End-to-End Data Encryption',
      ar: 'تشفير البيانات من طرف إلى طرف'
    },
    confidentialityCommitment: {
      en: 'Strict Confidentiality Commitment',
      ar: 'الالتزام الصارم بالسرية'
    },
    complianceStandards: {
      en: 'Compliance with International Standards',
      ar: 'الامتثال للمعايير الدولية'
    },
    controlOverData: {
      en: 'Full Control Over Your Data',
      ar: 'تحكم كامل في بياناتك'
    }
  },
  plans: {
    title: {
      en: 'Flexible Plans for Everyone',
      ar: 'خطط مرنة للجميع'
    },
    subtitle: {
      en: 'Choose a plan that fits your lifestyle and budget',
      ar: 'اختر خطة تناسب نمط حياتك وميزانيتك'
    },
    basicPlan: {
      en: 'Basic Plan',
      ar: 'الخطة الأساسية'
    },
    basicPlanDescription: {
      en: 'Essential support for everyday wellness',
      ar: 'دعم أساسي للعافية اليومية'
    },
    premiumPlan: {
      en: 'Premium Plan',
      ar: 'الخطة المميزة'
    },
    premiumPlanDescription: {
      en: 'Comprehensive therapy with added benefits',
      ar: 'علاج شامل مع مزايا إضافية'
    },
    unlimitedPlan: {
      en: 'Unlimited Plan',
      ar: 'الخطة غير المحدودة'
    },
    unlimitedPlanDescription: {
      en: 'Full access to all services and resources',
      ar: 'الوصول الكامل إلى جميع الخدمات والموارد'
    },
    accessNow: {
      en: 'Access Now',
      ar: 'الوصول الآن'
    },
    monthly: {
      en: '/month',
      ar: '/شهر'
    },
    benefits: {
      en: 'Benefits',
      ar: 'المزايا'
    }
  },
  testimonials: {
    title: {
      en: 'What Our Clients Say',
      ar: 'ماذا يقول عملاؤنا'
    },
    subtitle: {
      en: 'Real stories from people who have transformed their lives with our help',
      ar: 'قصص حقيقية من أشخاص غيروا حياتهم بمساعدتنا'
    },
    readMore: {
      en: 'Read More',
      ar: 'اقرأ المزيد'
    }
  },
  cta: {
    title: {
      en: 'Ready to Transform Your Life?',
      ar: 'هل أنت مستعد لتغيير حياتك؟'
    },
    description: {
      en: 'Take the first step towards a happier, healthier you. Book a consultation or get a free assessment today.',
      ar: 'اتخذ الخطوة الأولى نحو حياة أكثر سعادة وصحة. احجز استشارة أو احصل على تقييم مجاني اليوم.'
    },
    bookConsultation: {
      en: 'Book a Consultation',
      ar: 'احجز استشارة'
    },
    freeAssessment: {
      en: 'Get a Free Assessment',
      ar: 'احصل على تقييم مجاني'
    },
    needHelp: {
      en: 'Need help? Contact our support team.',
      ar: 'تحتاج مساعدة؟ اتصل بفريق الدعم لدينا.'
    }
  },
  footer: {
    aboutUs: {
      en: 'About Us',
      ar: 'معلومات عنا'
    },
    ourServices: {
      en: 'Our Services',
      ar: 'خدماتنا'
    },
    privacyPolicy: {
      en: 'Privacy Policy',
      ar: 'سياسة الخصوصية'
    },
    termsOfService: {
      en: 'Terms of Service',
      ar: 'شروط الخدمة'
    },
    contactUs: {
      en: 'Contact Us',
      ar: 'اتصل بنا'
    },
    allRightsReserved: {
      en: '© 2024 Mental Health Platform. All Rights Reserved.',
      ar: '© 2024 منصة الصحة النفسية. جميع الحقوق محفوظة.'
    },
    helpfulLinks: {
      en: 'Helpful Links',
      ar: 'روابط مفيدة'
    },
    howItWorks: {
      en: 'How It Works',
      ar: 'كيف يعمل'
    },
    services: {
      en: 'Services',
      ar: 'خدمات'
    },
    specialists: {
      en: 'Specialists',
      ar: 'متخصصون'
    },
    plans: {
      en: 'Plans',
      ar: 'خطط'
    },
    faqs: {
      en: 'FAQs',
      ar: 'أسئلة متكررة'
    },
    newsletter: {
      en: 'Newsletter',
      ar: 'النشرة الإخبارية'
    },
    newsletterDesc: {
      en: 'Subscribe to receive updates and resources',
      ar: 'اشترك لتلقي التحديثات والموارد'
    },
    yourEmail: {
      en: 'Your email',
      ar: 'بريدك الإلكتروني'
    },
    subscribe: {
      en: 'Subscribe',
      ar: 'اشترك'
    },
    copyright: {
      en: '© 2024 Mental Health Platform. All Rights Reserved.',
      ar: '© 2024 منصة الصحة النفسية. جميع الحقوق محفوظة.'
    },
    privacy: {
      en: 'Privacy Policy',
      ar: 'سياسة الخصوصية'
    },
    terms: {
      en: 'Terms of Service',
      ar: 'شروط الخدمة'
    },
    cookie: {
      en: 'Cookie Policy',
      ar: 'سياسة ملفات تعريف الارتباط'
    },
    accessibility: {
      en: 'Accessibility',
      ar: 'إمكانية الوصول'
    },
    emergency: {
      en: 'Emergency Information',
      ar: 'معلومات الطوارئ'
    },
    emergencyDesc: {
      en: 'Our services are not intended for crisis situations. If you or someone you know is in immediate danger, please call your local emergency number or crisis hotline.',
      ar: 'خدماتنا غير مخصصة لحالات الأزمات. إذا كنت أنت أو شخص تعرفه في خطر مباشر، يرجى الاتصال برقم الطوارئ المحلي أو خط أزمات.'
    },
    about: {
      en: 'We provide accessible, professional mental health services to help you navigate life\'s challenges and improve your wellbeing.',
      ar: 'نقدم خدمات الصحة النفسية المهنية والميسرة لمساعدتك في التغلب على تحديات الحياة وتحسين رفاهيتك.'
    }
  },
  notFound: {
    title: {
      en: 'Page Not Found',
      ar: 'الصفحة غير موجودة'
    },
    description: {
      en: 'The page you are looking for does not exist or has been moved.',
      ar: 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.'
    },
    goHome: {
      en: 'Go to Home',
      ar: 'العودة إلى الرئيسية'
    }
  },
  auth: {
    login: {
      en: 'Login',
      ar: 'تسجيل الدخول'
    },
    register: {
      en: 'Register',
      ar: 'إنشاء حساب'
    },
    email: {
      en: 'Email',
      ar: 'البريد الإلكتروني'
    },
    password: {
      en: 'Password',
      ar: 'كلمة المرور'
    },
    confirmPassword: {
      en: 'Confirm Password',
      ar: 'تأكيد كلمة المرور'
    },
    forgotPassword: {
      en: 'Forgot Password?',
      ar: 'نسيت كلمة المرور؟'
    },
    loginSuccess: {
      en: 'Login Successful',
      ar: 'تم تسجيل الدخول بنجاح'
    },
    welcomeBack: {
      en: 'Welcome back!',
      ar: 'مرحبا بعودتك!'
    },
    registrationSuccess: {
      en: 'Registration Successful',
      ar: 'تم التسجيل بنجاح'
    },
    accountCreated: {
      en: 'Your account has been created successfully.',
      ar: 'تم إنشاء حسابك بنجاح.'
    },
    error: {
      en: 'Error',
      ar: 'خطأ'
    },
    invalidCredentials: {
      en: 'Invalid email or password',
      ar: 'بريد إلكتروني أو كلمة مرور غير صالحة'
    },
    allFieldsRequired: {
      en: 'All fields are required',
      ar: 'جميع الحقول مطلوبة'
    },
    loggingIn: {
      en: 'Logging in...',
      ar: 'جاري تسجيل الدخول...'
    },
    registering: {
      en: 'Registering...',
      ar: 'جاري التسجيل...'
    },
    noAccount: {
      en: 'Don\'t have an account?',
      ar: 'ليس لديك حساب؟'
    },
    alreadyHaveAccount: {
      en: 'Already have an account?',
      ar: 'لديك حساب بالفعل؟'
    },
    registerNow: {
      en: 'Register now',
      ar: 'سجل الآن'
    },
    emailPlaceholder: {
      en: 'Enter your email',
      ar: 'أدخل بريدك الإلكتروني'
    },
    passwordPlaceholder: {
      en: 'Enter your password',
      ar: 'أدخل كلمة المرور'
    },
    confirmPasswordPlaceholder: {
      en: 'Confirm your password',
      ar: 'تأكيد كلمة المرور'
    },
    enterCredentials: {
      en: 'Enter your credentials to access your account',
      ar: 'أدخل بيانات الاعتماد الخاصة بك للوصول إلى حسابك'
    },
    createAccount: {
      en: 'Create your account to access all features',
      ar: 'أنشئ حسابك للوصول إلى جميع الميزات'
    },
    account: {
      en: 'Account',
      ar: 'الحساب'
    },
    profile: {
      en: 'Profile',
      ar: 'الملف الشخصي'
    },
    settings: {
      en: 'Settings',
      ar: 'الإعدادات'
    },
    logout: {
      en: 'Logout',
      ar: 'تسجيل الخروج'
    },
    logoutSuccess: {
      en: 'Logged out successfully',
      ar: 'تم تسجيل الخروج بنجاح'
    },
    comeBackSoon: {
      en: 'Come back soon!',
      ar: 'عد قريبا!'
    },
    secureLogin: {
      en: 'Secure Login',
      ar: 'تسجيل دخول آمن'
    },
    secureLoginDesc: {
      en: 'Your login information is protected with advanced encryption technology.',
      ar: 'معلومات تسجيل الدخول الخاصة بك محمية بتقنية تشفير متقدمة.'
    },
    accountVerified: {
      en: 'Account Verified',
      ar: 'تم التحقق من الحساب'
    },
    accountVerifiedDesc: {
      en: 'Your account is active and verified. You have access to all available services.',
      ar: 'حسابك نشط وتم التحقق منه. لديك حق الوصول إلى جميع الخدمات المتاحة.'
    },
    invalidEmail: {
      en: 'Please enter a valid email address',
      ar: 'الرجاء إدخال عنوان بريد إلكتروني صالح'
    },
    passwordLength: {
      en: 'Password must be at least 8 characters',
      ar: 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل'
    },
    passwordsDoNotMatch: {
      en: 'Passwords do not match',
      ar: 'كلمات المرور غير متطابقة'
    },
    registrationFailed: {
      en: 'Registration failed. Please try again.',
      ar: 'فشل التسجيل. يرجى المحاولة مرة أخرى.'
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
  },
  liveChat: {
    title: {
      en: "Live Support",
      ar: "الدعم المباشر"
    },
    greeting: {
      en: "Hello! How can we help you today?",
      ar: "مرحبًا! كيف يمكننا مساعدتك اليوم؟"
    },
    supportTeam: {
      en: "Support Team",
      ar: "فريق الدعم"
    },
    justNow: {
      en: "just now",
      ar: "الآن"
    },
    preview: {
      en: "This is a preview of our live chat",
      ar: "هذا عرض تجريبي لدردشتنا المباشرة"
    },
    typePlaceholder: {
      en: "Type your message...",
      ar: "اكتب رسالتك..."
    },
    send: {
      en: "Send",
      ar: "إرسال"
    },
    messageInput: {
      en: "Type your message",
      ar: "اكتب رسالتك"
    },
    emergency: {
      en: "For emergencies, please call our hotline",
      ar: "للطوارئ
