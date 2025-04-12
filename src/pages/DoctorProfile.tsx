
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, MapPin, Languages, Award, Calendar, MessageSquare, ArrowLeft, User, Video, PhoneCall, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppointmentForm from "@/components/doctor-chat/AppointmentForm";

interface Doctor {
  id: number;
  name: string;
  photo: string;
  credentials: string;
  specializations: string[];
  experience: number;
  languages: string[];
  rating: number;
  reviewCount: number;
  bio?: string;
  location?: string;
  education?: string[];
  availability?: string[];
}

// Sample doctor data
const doctorsData: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    credentials: "Ph.D. in Clinical Psychology",
    specializations: ["Anxiety", "Depression", "Trauma"],
    experience: 8,
    languages: ["English", "Spanish"],
    rating: 4.9,
    reviewCount: 127,
    bio: "Dr. Sarah Johnson has over 8 years of experience helping individuals overcome anxiety, depression, and trauma. She takes a compassionate, client-centered approach that combines cognitive-behavioral therapy with mindfulness techniques.",
    location: "New York, NY (Available Online)",
    education: [
      "Ph.D. in Clinical Psychology, Columbia University",
      "M.A. in Psychology, New York University",
      "B.S. in Psychology, University of Michigan"
    ],
    availability: ["Monday-Thursday: 9AM-5PM", "Friday: 9AM-12PM"]
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
    reviewCount: 205,
    bio: "Dr. Michael Chen specializes in helping professionals navigate work stress, improve relationships, and find a healthier work-life balance. With 12 years of experience, he combines practical cognitive strategies with insights from positive psychology.",
    location: "San Francisco, CA (Available Online)",
    education: [
      "Psy.D. in Clinical Psychology, Stanford University",
      "B.A. in Psychology, UC Berkeley"
    ],
    availability: ["Tuesday-Friday: 10AM-6PM", "Saturday: 10AM-2PM"]
  },
  {
    id: 3,
    name: "Dr. Aisha Rahman",
    photo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    credentials: "M.D., Psychiatrist",
    specializations: ["Bipolar Disorder", "Anxiety", "ADHD"],
    experience: 15,
    languages: ["English", "Arabic", "French"],
    rating: 4.9,
    reviewCount: 189,
    bio: "Dr. Aisha Rahman is a psychiatrist with 15 years of experience treating mood disorders, anxiety, and ADHD. She offers both medication management and therapy, taking a holistic approach to mental wellness.",
    location: "Chicago, IL (Available Online)",
    education: [
      "M.D., Northwestern University",
      "Psychiatry Residency, Johns Hopkins Hospital",
      "B.S. in Neuroscience, Yale University"
    ],
    availability: ["Monday-Wednesday: 8AM-4PM", "Thursday: 12PM-8PM"]
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    credentials: "M.S., Licensed Marriage and Family Therapist",
    specializations: ["Couples Therapy", "Family Conflicts", "Parenting Issues"],
    experience: 10,
    languages: ["English"],
    rating: 4.7,
    reviewCount: 156,
    bio: "Dr. James Wilson specializes in helping couples and families improve their relationships and communication. With 10 years of experience as a marriage and family therapist, he provides practical tools for resolving conflicts and strengthening bonds.",
    location: "Austin, TX (Available Online)",
    education: [
      "M.S. in Marriage and Family Therapy, University of Texas",
      "B.A. in Psychology, Texas A&M University"
    ],
    availability: ["Monday, Wednesday, Friday: 9AM-5PM", "Tuesday, Thursday: 12PM-8PM"]
  }
];

const DoctorProfile = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [activeTab, setActiveTab] = useState("about");
  
  useEffect(() => {
    // In a real app, we would fetch this data from an API
    // For now, we're using the mock data
    const foundDoctor = doctorsData.find(d => d.id === Number(doctorId));
    setDoctor(foundDoctor || null);
  }, [doctorId]);
  
  if (!doctor) {
    return (
      <div className="container-custom py-12 text-center">
        <h2 className="text-2xl font-bold">Doctor not found</h2>
        <p className="mt-4">The doctor profile you're looking for could not be found.</p>
        <Link to="/" className="mt-6 inline-block">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <Link to="/" className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to Home
      </Link>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Doctor Info Sidebar */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <img 
                src={doctor.photo} 
                alt={doctor.name} 
                className="w-full h-48 object-cover object-center"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="flex items-center text-white mb-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                  <span className="font-bold">{doctor.rating}</span>
                  <span className="text-sm ml-1">({doctor.reviewCount} reviews)</span>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-1">{doctor.name}</h1>
              <p className="text-gray-600 mb-4">{doctor.credentials}</p>
              
              {doctor.location && (
                <div className="flex items-start mb-4">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{doctor.location}</span>
                </div>
              )}
              
              <div className="flex items-start mb-4">
                <Languages className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-700">{doctor.languages.join(", ")}</span>
              </div>
              
              <div className="flex items-start mb-4">
                <Award className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-700">{doctor.experience} years of experience</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {doctor.specializations.map((specialization, idx) => (
                  <span 
                    key={idx} 
                    className="text-sm bg-calmBlue-100 text-calmBlue-700 rounded-full px-3 py-1"
                  >
                    {specialization}
                  </span>
                ))}
              </div>
              
              {doctor.availability && (
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <h3 className="font-medium mb-2">Availability</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {doctor.availability.map((slot, idx) => (
                      <li key={idx}>{slot}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="flex flex-col space-y-3">
                <Button className="w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Appointment
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
                <Button variant="blue" className="w-full">
                  <User className="mr-2 h-4 w-4" />
                  View Full Profile
                </Button>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="w-full">
                  <Video className="mr-2 h-4 w-4" />
                  Video Call
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <PhoneCall className="mr-2 h-4 w-4" />
                  Audio Call
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Shield className="mr-2 h-4 w-4" />
                  Anonymous Consultation
                </Button>
                <Link to="/services/psychological-assessment" className="w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    <Award className="mr-2 h-4 w-4" />
                    Assessment
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:w-2/3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="book">Book Appointment</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">About {doctor.name}</h2>
                {doctor.bio && <p className="text-gray-700 mb-6">{doctor.bio}</p>}
                
                {doctor.education && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Education & Training</h3>
                    <ul className="space-y-2">
                      {doctor.education.map((edu, idx) => (
                        <li key={idx} className="flex items-start">
                          <Award className="h-5 w-5 text-calmBlue-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span>{edu}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Areas of Expertise</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {doctor.specializations.map((spec, idx) => (
                      <div key={idx} className="flex items-center p-2 bg-gray-50 rounded">
                        <span className="w-2 h-2 bg-calmBlue-500 rounded-full mr-2"></span>
                        <span className="text-gray-700">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="book">
              <AppointmentForm doctorId={doctorId} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
