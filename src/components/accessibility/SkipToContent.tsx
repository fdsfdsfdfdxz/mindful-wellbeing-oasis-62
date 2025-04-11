
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";

export function SkipToContent() {
  const { language } = useLanguage();
  
  return (
    <a 
      href="#main-content" 
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded"
    >
      {translate("accessibility", "skipToContent", language)}
    </a>
  );
}
