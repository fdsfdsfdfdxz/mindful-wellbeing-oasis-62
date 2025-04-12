
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export const ChatContent: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">
        {language === 'ar' ? "دردشة مع الطبيب" : "Chat with Doctor"}
      </h2>
      <p className="text-gray-600 mb-4">
        {language === 'ar' 
          ? "هذه الميزة قادمة قريبًا. ستتمكن من إجراء استشارات نصية أو صوتية أو فيديو آمنة مع مقدم الرعاية الصحية الخاص بك."
          : "This feature is coming soon. You will be able to have secure text, audio, or video consultations with your healthcare provider."
        }
      </p>
      <div className="bg-gray-100 rounded-lg p-8 text-center">
        <div className="text-gray-500 mb-2">
          {language === 'ar' ? "عنصر نائب لواجهة الدردشة" : "Chat Interface Placeholder"}
        </div>
        <p className="text-sm text-gray-400">
          {language === 'ar' 
            ? "ستظهر منصة المراسلة الآمنة هنا"
            : "The secure messaging platform will appear here"
          }
        </p>
      </div>
    </div>
  );
};
