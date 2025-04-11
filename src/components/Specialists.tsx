
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Star, Calendar, MessageSquare, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";

const specialistsData = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    credentials: "Ph.D. in Clinical Psychology",
    specializations: ["Anxiety", "Depression", "Trauma"],
    experience: 8,
    languages: ["English", "Spanish"],
    rating: 4.9,
    reviewCount: 127
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    credentials: "Psy.D., Licensed Psychologist",
    specializations: ["Stress Management", "Relationship Issues", "Work-Life Balance"],
    experience: 12,
    languages: ["English", "Mandarin"],
    rating: 4.8,
    reviewCount: 205
  },
  {
    id: 3,
    name: "Dr. Aisha Rahman",
    photo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    credentials: "M.D., Psychiatrist",
    specializations: ["Bipolar Disorder", "Anxiety", "ADHD"],
    experience: 15,
    languages: ["English", "Arabic", "French"],
    rating: 4.9,
    reviewCount: 189
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    photo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    credentials: "M.S., Licensed Marriage and Family Therapist",
    specializations: ["Couples Therapy", "Family Conflicts", "Parenting Issues"],
    experience: 10,
    languages: ["English"],
    rating: 4.7,
    reviewCount: 156
  }
];

const Specialists = () => {
  const [visibleSpecialists, setVisibleSpecialists] = useState(4);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  
  const showMoreSpecialists = () => {
    setVisibleSpecialists(specialistsData.length);
  };

  const handleCommunication = (specialistId: number, action: "message" | "appointment") => {
    if (!isLoggedIn) {
      toast({
        title: translate("specialists", "loginRequired", language) || "Login Required",
        description: translate("specialists", "loginToCommunicate", language) || 
          "Please login to communicate with specialists",
      });
      navigate("/login");
      return;
    }
    
    if (action === "message") {
      navigate(`/doctor-chat?doctor=${specialistId}`);
    } else {
      navigate(`/doctor/${specialistId}`);
    }
  };
  
  const handleViewProfile = (specialistId: number) => {
    navigate(`/doctor/${specialistId}`);
  };

  return (
    <section id="specialists" className="py-20 bg-white">
      <div className="container-custom">
        <h2 className="section-title text-center">Our Mental Health Specialists</h2>
        <p className="section-subtitle text-center">
          Connect with highly qualified professionals who are committed to supporting your mental wellbeing through secure online consultations.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {specialistsData.slice(0, visibleSpecialists).map((specialist) => (
            <Card key={specialist.id} className="overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="relative cursor-pointer" onClick={() => handleViewProfile(specialist.id)}>
                <img 
                  src={specialist.photo} 
                  alt={specialist.name} 
                  className="w-full h-64 object-cover object-center"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <div className="flex items-center text-white mb-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="font-bold">{specialist.rating}</span>
                    <span className="text-sm ml-1">({specialist.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <h3 className="text-xl font-bold text-gray-800 flex items-center justify-between">
                  <span>{specialist.name}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-0 h-auto text-calmBlue-600"
                    onClick={() => handleViewProfile(specialist.id)}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </h3>
                <CardDescription>{specialist.credentials}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Specializes in:</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {specialist.specializations.map((specialization, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs bg-calmBlue-100 text-calmBlue-700 rounded-full px-2 py-1"
                      >
                        {specialization}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Experience:</h4>
                    <p className="text-sm">{specialist.experience} years</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Languages:</h4>
                    <p className="text-sm">{specialist.languages.join(", ")}</p>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-2">
                <Button 
                  className="w-full"
                  onClick={() => handleCommunication(specialist.id, "appointment")}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Appointment
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleCommunication(specialist.id, "message")}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {visibleSpecialists < specialistsData.length && (
          <div className="mt-12 text-center">
            <Button 
              variant="outline" 
              onClick={showMoreSpecialists}
              className="px-8"
            >
              View More Specialists
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Specialists;
