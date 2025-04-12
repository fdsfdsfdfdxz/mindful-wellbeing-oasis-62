
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import AppointmentForm from "@/components/doctor-chat/AppointmentForm";
import { DoctorHeader, DoctorSidebar, DoctorAbout, DoctorReviews } from "@/components/doctor-profile";

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
  const navigate = useNavigate();
  const { toast } = useToast();
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

  const handleBookAppointment = () => {
    setActiveTab("book");
    // Scroll to the booking form
    document.getElementById("appointment-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="container-custom py-12">
      <DoctorHeader />
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Doctor Info Sidebar */}
        <DoctorSidebar doctor={doctor} onBookAppointment={handleBookAppointment} />
        
        {/* Main Content */}
        <div className="lg:w-2/3" id="appointment-section">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="book">Book Appointment</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about">
              <DoctorAbout doctor={doctor} />
            </TabsContent>
            
            <TabsContent value="reviews">
              <DoctorReviews doctorId={Number(doctorId)} />
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
