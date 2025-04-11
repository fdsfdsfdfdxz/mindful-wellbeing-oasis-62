
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";

export function SkipToContent() {
  const { language } = useLanguage();
  
  return (
    <a 
      href="#main-content" 
      className="skip-to-content"
    >
      {translate("accessibility", "skipToContent", language)}
    </a>
  );
}
