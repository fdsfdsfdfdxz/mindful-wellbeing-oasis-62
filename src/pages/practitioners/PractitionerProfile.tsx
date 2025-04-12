
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, MessageSquare, Star, Clock, MapPin, Languages, Award, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock practitioner data - in a real app, this would come from an API
const PRACTITIONERS = [
  {
    id: "p1",
    name: "Dr. Sarah Johnson",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    credentials: "Ph.D. in Clinical Psychology",
    specializations: ["Anxiety", "Depression", "Trauma"],
    experience: 8,
    languages: ["English", "Spanish"],
    rating: 4.9,
    reviewCount: 127,
    bio: "Dr. Sarah Johnson is a clinical psychologist with over 8 years of experience helping clients overcome anxiety, depression, and trauma. She specializes in cognitive-behavioral therapy and mindfulness-based approaches, tailoring treatment to each individual's unique needs and goals.",
    education: [
      "Ph.D. in Clinical Psychology, Stanford University",
      "M.A. in Psychology, University of California, Berkeley",
      "B.A. in Psychology, University of Washington"
    ],
    certifications: [
      "Licensed Clinical Psychologist",
      "Certified in Cognitive-Behavioral Therapy",
      "Trauma-Focused Therapy Certification"
    ],
    location: "Remote (Online Sessions)",
    sessionRate: "$150/session",
    availabilities: ["Monday-Friday: 9AM-5PM", "Saturday: 10AM-2PM"],
    acceptsInsurance: true,
    insuranceNetworks: ["Blue Cross", "Aetna", "United Healthcare"]
  },
  {
    id: "p2",
    name: "Dr. Michael Chen",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    credentials: "Psy.D., Licensed Psychologist",
    specializations: ["Stress Management", "Relationship Issues", "Work-Life Balance"],
    experience: 12,
    languages: ["English", "Mandarin"],
    rating: 4.8,
    reviewCount: 205,
    bio: "Dr. Michael Chen is a licensed psychologist with 12 years of experience specializing in stress management, relationship issues, and work-life balance. He combines evidence-based approaches with compassionate understanding to help clients navigate life's challenges and achieve greater well-being.",
    education: [
      "Psy.D. in Clinical Psychology, Yale University",
      "M.S. in Counseling Psychology, Columbia University",
      "B.S. in Psychology, University of California, Los Angeles"
    ],
    certifications: [
      "Licensed Psychologist",
      "Certified in Couples Therapy",
      "Mindfulness-Based Stress Reduction Instructor"
    ],
    location: "Remote (Online Sessions)",
    sessionRate: "$175/session",
    availabilities: ["Tuesday-Thursday: 8AM-6PM", "Sunday: 12PM-4PM"],
    acceptsInsurance: true,
    insuranceNetworks: ["Cigna", "Kaiser", "Anthem"]
  }
];

const PractitionerProfile = () => {
  const { practitionerId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isLoggedIn } = useAuth();
  
  const [practitioner, setPractitioner] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, fetch practitioner data from an API
    const fetchPractitioner = () => {
      setLoading(true);
      const found = PRACTITIONERS.find(p => p.id === practitionerId);
      
      if (found) {
        setPractitioner(found);
      } else {
        // Handle practitioner not found
        toast({
          title: "Practitioner not found",
          description: "We couldn't find the practitioner you're looking for.",
          variant: "destructive"
        });
        navigate("/practitioners");
      }
      
      setLoading(false);
    };
    
    fetchPractitioner();
  }, [practitionerId, navigate, toast]);
  
  const handleBookAppointment = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "You need to be logged in to book an appointment.",
      });
      navigate(`/login?redirect=/book-appointment?practitionerId=${practitionerId}`);
      return;
    }
    
    navigate(`/book-appointment?practitionerId=${practitionerId}`);
  };
  
  const handleSendMessage = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "You need to be logged in to send messages.",
      });
      navigate(`/login?redirect=/doctor-chat?doctor=${practitionerId}`);
      return;
    }
    
    navigate(`/doctor-chat?doctor=${practitionerId}`);
  };
  
  if (loading || !practitioner) {
    return (
      <>
        <Navbar />
        <div className="container-custom py-20 text-center">
          <p>Loading practitioner profile...</p>
        </div>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Navbar />
      
      <main className="container-custom py-12">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate("/practitioners")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Directory
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <img 
                    src={practitioner.photo} 
                    alt={practitioner.name} 
                    className="w-32 h-32 rounded-full object-cover mb-4"
                  />
                  
                  <h1 className="text-2xl font-bold mb-1">{practitioner.name}</h1>
                  <p className="text-gray-500 mb-3">{practitioner.credentials}</p>
                  
                  <div className="flex items-center mb-4">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-bold ml-1">{practitioner.rating}</span>
                    <span className="text-gray-500 text-sm ml-1">({practitioner.reviewCount} reviews)</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 justify-center mb-6">
                    {practitioner.specializations.map((spec: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="bg-calmBlue-50 text-calmBlue-700 border-calmBlue-200">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="w-full space-y-3">
                    <Button 
                      className="w-full" 
                      onClick={handleBookAppointment}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Book Appointment
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleSendMessage}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Session Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Availability</p>
                    <ul className="text-sm text-gray-600">
                      {practitioner.availabilities.map((avail: string, idx: number) => (
                        <li key={idx}>{avail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-gray-600">{practitioner.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Languages className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Languages</p>
                    <p className="text-sm text-gray-600">{practitioner.languages.join(", ")}</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4 mt-6">
                  <p className="font-medium text-xl text-center">{practitioner.sessionRate}</p>
                  {practitioner.acceptsInsurance && (
                    <div className="mt-2">
                      <p className="text-sm text-center font-medium">Accepts Insurance</p>
                      <p className="text-xs text-gray-500 text-center">
                        {practitioner.insuranceNetworks.join(", ")}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="education">Education & Credentials</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About {practitioner.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 whitespace-pre-line">{practitioner.bio}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Areas of Expertise</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {practitioner.specializations.map((spec: string, idx: number) => (
                        <div key={idx} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <div>
                            <p className="font-medium">{spec}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="education" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Education</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {practitioner.education.map((edu: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <Award className="h-5 w-5 text-calmBlue-500 mr-3 mt-0.5" />
                          <span>{edu}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Certifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {practitioner.certifications.map((cert: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Experience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{practitioner.experience} years of professional experience in mental health services</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Patient Reviews</CardTitle>
                    <CardDescription>
                      Overall rating: {practitioner.rating}/5 based on {practitioner.reviewCount} reviews
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Placeholder for reviews */}
                      <p className="text-gray-500 text-center py-8">
                        Reviews are only visible to registered users. 
                        {!isLoggedIn && (
                          <Button 
                            variant="link" 
                            className="p-0 h-auto ml-1"
                            onClick={() => navigate("/login")}
                          >
                            Log in to view
                          </Button>
                        )}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default PractitionerProfile;
