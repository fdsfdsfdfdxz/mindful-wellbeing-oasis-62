
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  switchLanguage: (lang: Language) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  switchLanguage: () => {},
  isRTL: false,
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Try to get the stored language from localStorage or default to 'en'
  const savedLanguage = typeof window !== 'undefined' 
    ? (localStorage.getItem('language') as Language) || 'en'
    : 'en';
    
  const [language, setLanguage] = useState<Language>(savedLanguage);
  const [isRTL, setIsRTL] = useState<boolean>(savedLanguage === 'ar');

  useEffect(() => {
    // Set RTL status based on language
    setIsRTL(language === 'ar');
    
    // Set dir attribute on html element
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Add appropriate language class to body
    if (language === 'ar') {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
    
    // Save language preference to localStorage
    localStorage.setItem('language', language);
    
    console.log(`Language switched to ${language}, RTL: ${language === 'ar'}`);
    
  }, [language]);

  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
