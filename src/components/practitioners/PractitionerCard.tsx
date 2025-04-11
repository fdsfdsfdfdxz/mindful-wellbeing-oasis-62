
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar, MessageSquare, ShieldCheck, Clock, UserCheck } from "lucide-react";
import { Practitioner } from "@/types/practitioner";
import { getSpecialtyLabel } from "@/services/practitionerService";
import { useLanguage } from "@/contexts/LanguageContext";

interface PractitionerCardProps {
  practitioner: Practitioner;
}

const PractitionerCard: React.FC<PractitionerCardProps> = ({ practitioner }) => {
  const { language } = useLanguage();
  
  const getTranslatedLabel = (text: string) => {
    if (language !== 'ar') return text;
    
    switch (text) {
      case "Verified":
        return "تم التحقق";
      case "Pending":
        return "قيد الانتظار";
      case "years experience":
        return "سنوات الخبرة";
      case "Languages:":
        return "اللغات:";
      case "Rate:":
        return "السعر:";
      case "Specializes in:":
        return "متخصص في:";
      case "View Profile":
        return "عرض الملف الشخصي";
      default:
        return text;
    }
  };
  
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative">
        <img 
          src={practitioner.profileImage} 
          alt={practitioner.name} 
          className="w-full h-48 object-cover object-center"
        />
        {practitioner.verificationStatus === "verified" && (
          <div className="absolute top-2 right-2 bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs flex items-center">
            <ShieldCheck className="w-3 h-3 mr-1" />
            {getTranslatedLabel("Verified")}
          </div>
        )}
        {practitioner.verificationStatus === "pending" && (
          <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 rounded-full px-2 py-1 text-xs flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {getTranslatedLabel("Pending")}
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{practitioner.name}</h3>
            <CardDescription className="text-sm">{practitioner.title}</CardDescription>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-semibold ml-1">{practitioner.ratings.average}</span>
            <span className="text-gray-500 text-xs ml-1">({practitioner.ratings.count})</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="mb-3">
          <div className="flex items-center mb-1">
            <UserCheck className="w-4 h-4 text-gray-500 mr-1" />
            <span className="text-sm">{practitioner.yearsOfExperience} {getTranslatedLabel("years experience")}</span>
          </div>
          <div className="text-sm text-gray-700">
            <strong>{getTranslatedLabel("Languages:")}</strong> {practitioner.languages.join(", ")}
          </div>
          <div className="text-sm text-gray-700">
            <strong>{getTranslatedLabel("Rate:")}</strong> ${practitioner.rate.amount}/{practitioner.rate.per}
          </div>
        </div>
        
        <div className="mb-3">
          <h4 className="text-sm font-medium mb-1">{getTranslatedLabel("Specializes in:")}</h4>
          <div className="flex flex-wrap gap-1">
            {practitioner.specialties.map((specialty, i) => (
              <Badge key={i} variant="secondary" className="text-xs">
                {language === 'ar' ? getArabicSpecialtyLabel(specialty) : getSpecialtyLabel(specialty)}
              </Badge>
            ))}
          </div>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2">{practitioner.about}</p>
      </CardContent>
      
      <CardFooter className="pt-2 flex gap-2">
        <Button
          asChild
          className="flex-1"
        >
          <Link to={`/practitioners/${practitioner.id}`}>
            {getTranslatedLabel("View Profile")}
          </Link>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="flex-none"
        >
          <Calendar className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="flex-none"
        >
          <MessageSquare className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

// Helper function to translate specialty labels to Arabic
const getArabicSpecialtyLabel = (specialty: string): string => {
  const translations: Record<string, string> = {
    'anxiety': 'القلق',
    'depression': 'الاكتئاب',
    'stress': 'التوتر',
    'trauma': 'الصدمة',
    'grief': 'الحزن',
    'relationships': 'العلاقات',
    'addiction': 'الإدمان',
    'eating-disorders': 'اضطرابات الأكل',
    'self-esteem': 'تقدير الذات',
    'anger-management': 'إدارة الغضب',
    'ptsd': 'اضطراب ما بعد الصدمة',
    'ocd': 'الوسواس القهري',
    'bipolar': 'الاضطراب ثنائي القطب',
    'adhd': 'فرط الحركة ونقص الانتباه',
    'parenting': 'تربية الأطفال',
    'sleep': 'النوم',
    'mindfulness': 'اليقظة الذهنية',
    'cbt': 'العلاج السلوكي المعرفي',
    'family-therapy': 'العلاج الأسري',
    'couples-therapy': 'علاج الأزواج'
  };
  
  return translations[specialty] || specialty;
};

export default PractitionerCard;
