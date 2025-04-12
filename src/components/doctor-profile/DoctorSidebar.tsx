
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, MapPin, Languages, Award, Calendar, MessageSquare, User, Video, PhoneCall, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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
  location?: string;
  availability?: string[];
}

interface DoctorSidebarProps {
  doctor: Doctor;
  onBookAppointment: () => void;
}

const DoctorSidebar = ({ doctor, onBookAppointment }: DoctorSidebarProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSendMessage = () => {
    toast({
      title: "Message feature activated",
      description: `Starting a conversation with ${doctor.name}`,
    });
    navigate(`/doctor-chat?id=${doctor.id}`);
  };

  const handleVideoCall = () => {
    toast({
      title: "Video call initiated",
      description: "Preparing your video consultation...",
    });
    navigate(`/services/video-consultation?doctorId=${doctor.id}`);
  };

  const handleAudioCall = () => {
    toast({
      title: "Audio call initiated",
      description: "Preparing your audio consultation...",
    });
    navigate(`/services/audio-consultation?doctorId=${doctor.id}`);
  };

  const handleAnonymousConsultation = () => {
    toast({
      title: "Anonymous consultation",
      description: "Setting up anonymous consultation mode...",
    });
    navigate(`/services/anonymous-consultation?doctorId=${doctor.id}`);
  };

  const handleAssessment = () => {
    toast({
      title: "Assessment initiated",
      description: "Starting your psychological assessment...",
    });
    navigate(`/services/psychological-assessment?doctorId=${doctor.id}`);
  };

  const handleViewFullProfile = () => {
    toast({
      title: "Loading full profile",
      description: `Viewing complete profile for ${doctor.name}`,
    });
    // Navigate to the practitioner profile using the doctor ID
    navigate(`/practitioners/p${doctor.id}`);
  };

  return (
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
            <Button className="w-full" onClick={onBookAppointment}>
              <Calendar className="mr-2 h-4 w-4" />
              Book Appointment
            </Button>
            <Button variant="outline" className="w-full" onClick={handleSendMessage}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Send Message
            </Button>
            <Button variant="blue" className="w-full" onClick={handleViewFullProfile}>
              <User className="mr-2 h-4 w-4" />
              View Full Profile
            </Button>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="w-full" onClick={handleVideoCall}>
              <Video className="mr-2 h-4 w-4" />
              Video Call
            </Button>
            <Button variant="outline" size="sm" className="w-full" onClick={handleAudioCall}>
              <PhoneCall className="mr-2 h-4 w-4" />
              Audio Call
            </Button>
            <Button variant="outline" size="sm" className="w-full" onClick={handleAnonymousConsultation}>
              <Shield className="mr-2 h-4 w-4" />
              Anonymous Consultation
            </Button>
            <Button variant="outline" size="sm" className="w-full" onClick={handleAssessment}>
              <Award className="mr-2 h-4 w-4" />
              Assessment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSidebar;
