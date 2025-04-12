
import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "blue";
}

export const BackButton = ({ className, variant = "ghost" }: BackButtonProps) => {
  const navigate = useNavigate();
  const { language, isRTL } = useLanguage();
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  return (
    <Button 
      variant={variant}
      onClick={handleGoBack}
      className={cn("gap-1", className)}
      aria-label={language === 'ar' ? "العودة للصفحة السابقة" : "Back to previous page"}
    >
      <ChevronLeft className={cn("h-4 w-4", isRTL && "rotate-180")} />
      <span>{language === 'ar' ? "رجوع" : "Back"}</span>
    </Button>
  );
};
