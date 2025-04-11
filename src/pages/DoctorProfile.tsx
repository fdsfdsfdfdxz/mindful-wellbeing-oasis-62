
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MessageCircle,
  Star,
  Clock,
  Video,
  Phone,
  MapPin,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock data (in a real app, this would come from an API)
const doctorsData = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    credentials: "Ph.D. in Clinical Psychology",
    specializations: ["Anxiety", "Depression", "Trauma"],
    experience: 8,
    languages: ["English", "Spanish"],
    rating: 4.9,
    reviewCount: 127,
    availability: {
      monday: ["9:00", "10:00", "11:00", "14:00", "15:00"],
      tuesday: ["9:00", "10:00", "14:00", "15:00", "16:00"],
      wednesday: ["10:00", "11:00", "13:00", "14:00"],
      thursday: ["9:00", "10:00", "11:00", "15:00", "16:00"],
      friday: ["9:00", "11:00", "13:00", "14:00"],
    },
    education: [
      { degree: "Ph.D. in Clinical Psychology", institution: "Stanford University", year: "2015" },
      { degree: "M.S. in Psychology", institution: "UCLA", year: "2012" },
      { degree: "B.S. in Psychology", institution: "UC Berkeley", year: "2010" },
    ],
    bio: "Dr. Sarah Johnson is a licensed clinical psychologist with over 8 years of experience treating individuals with anxiety, depression, and trauma-related disorders. She specializes in cognitive-behavioral therapy (CBT) and mindfulness-based interventions.",
    officeLocation: "123 Healing Center Dr, Suite 201, San Francisco, CA",
    acceptingNewPatients: true,
    insuranceAccepted: ["Blue Cross", "Aetna", "UnitedHealthcare", "Medicare"],
    reviews: [
      { id: 1, author: "Jane D.", rating: 5, comment: "Dr. Johnson is incredibly supportive and insightful. She's helped me manage my anxiety in ways I never thought possible.", date: "2023-03-15" },
      { id: 2, author: "Michael T.", rating: 5, comment: "Excellent therapist who really listens. I've made significant progress with her guidance.", date: "2023-02-22" },
      { id: 3, author: "Samantha L.", rating: 4, comment: "Very professional and knowledgeable. I appreciate her structured approach to therapy.", date: "2023-01-10" },
    ],
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    credentials: "Psy.D., Licensed Psychologist",
    specializations: ["Stress Management", "Relationship Issues", "Work-Life Balance"],
    experience: 12,
    languages: ["English", "Mandarin"],
    rating: 4.8,
    reviewCount: 205,
    availability: {
      monday: ["9:00", "10:00", "13:00", "14:00", "15:00"],
      tuesday: ["10:00", "11:00", "14:00", "15:00", "16:00"],
      wednesday: ["9:00", "10:00", "11:00", "14:00"],
      thursday: ["10:00", "11:00", "15:00", "16:00"],
      friday: ["9:00", "10:00", "13:00", "14:00"],
    },
    education: [
      { degree: "Psy.D. in Clinical Psychology", institution: "Columbia University", year: "2011" },
      { degree: "M.A. in Psychology", institution: "NYU", year: "2008" },
      { degree: "B.A. in Psychology", institution: "University of Washington", year: "2006" },
    ],
    bio: "Dr. Michael Chen is a licensed psychologist specializing in stress management, relationship issues, and work-life balance. With 12 years of experience, he combines cognitive-behavioral therapy with mindfulness techniques to help clients navigate life's challenges.",
    officeLocation: "456 Wellness Blvd, Suite 302, San Francisco, CA",
    acceptingNewPatients: true,
    insuranceAccepted: ["Blue Cross", "Cigna", "Kaiser", "Medicare"],
    reviews: [
      { id: 1, author: "Robert K.", rating: 5, comment: "Dr. Chen has been instrumental in helping me manage work stress. Highly recommend!", date: "2023-04-05" },
      { id: 2, author: "Lin Y.", rating: 4, comment: "Very thoughtful and thorough. He provides practical techniques for daily use.", date: "2023-03-11" },
      { id: 3, author: "Emily W.", rating: 5, comment: "Dr. Chen helped save my marriage with his insightful relationship counseling.", date: "2023-02-18" },
    ],
  },
  {
    id: "3",
    name: "Dr. Aisha Rahman",
    photo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    credentials: "M.D., Psychiatrist",
    specializations: ["Bipolar Disorder", "Anxiety", "ADHD"],
    experience: 15,
    languages: ["English", "Arabic", "French"],
    rating: 4.9,
    reviewCount: 189,
    availability: {
      monday: ["9:00", "10:00", "11:00", "15:00", "16:00"],
      tuesday: ["9:00", "10:00", "13:00", "14:00", "15:00"],
      wednesday: ["10:00", "11:00", "14:00", "15:00"],
      thursday: ["9:00", "10:00", "11:00", "13:00", "14:00"],
      friday: ["10:00", "11:00", "13:00", "14:00", "15:00"],
    },
    education: [
      { degree: "M.D., Psychiatry", institution: "Johns Hopkins University", year: "2008" },
      { degree: "Residency in Psychiatry", institution: "Massachusetts General Hospital", year: "2012" },
      { degree: "B.S. in Neuroscience", institution: "Duke University", year: "2004" },
    ],
    bio: "Dr. Aisha Rahman is a board-certified psychiatrist with 15 years of experience in treating various mental health conditions. She specializes in medication management and has a particular interest in treating bipolar disorder, anxiety disorders, and ADHD.",
    officeLocation: "789 Medical Plaza, Suite 405, San Francisco, CA",
    acceptingNewPatients: true,
    insuranceAccepted: ["Blue Cross", "Aetna", "UnitedHealthcare", "Cigna", "Medicare", "Medicaid"],
    reviews: [
      { id: 1, author: "David M.", rating: 5, comment: "Dr. Rahman's treatment plan has been life-changing for my ADHD. For the first time, I feel in control.", date: "2023-04-10" },
      { id: 2, author: "Sarah J.", rating: 5, comment: "Excellent doctor who really takes the time to understand your needs. Very knowledgeable about medications.", date: "2023-03-25" },
      { id: 3, author: "Hassan T.", rating: 4, comment: "Professional, compassionate, and attentive. She's helped me manage my anxiety tremendously.", date: "2023-02-08" },
    ],
  }
];

const DoctorProfile = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { isLoggedIn } = useAuth();
  const { toast } = useToast();
  const [selectedDay, setSelectedDay] = useState<string>("monday");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  
  // Find the doctor based on the doctorId
  const doctor = doctorsData.find((doc) => doc.id === doctorId);
  
  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-red-500">
                <AlertCircle className="inline-block mr-2" />
                {translate("doctorProfile", "notFound", language) || "Doctor Not Found"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                {translate("doctorProfile", "notFoundMessage", language) || 
                  "The doctor you're looking for could not be found. They may have moved or the link is incorrect."}
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate("/")} className="w-full">
                {translate("doctorProfile", "backToHome", language) || "Back to Home"}
              </Button>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleBookAppointment = () => {
    if (!isLoggedIn) {
      toast({
        title: translate("doctorProfile", "loginRequired", language) || "Login Required",
        description: translate("doctorProfile", "loginToBook", language) || 
          "Please login to book an appointment",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    if (!selectedTime) {
      toast({
        title: translate("doctorProfile", "timeRequired", language) || "Time Required",
        description: translate("doctorProfile", "selectTimeFirst", language) || 
          "Please select a time for your appointment",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would make an API call to book the appointment
    toast({
      title: translate("doctorProfile", "appointmentBooked", language) || "Appointment Booked!",
      description: `${translate("doctorProfile", "bookedWith", language) || "Your appointment with"} ${doctor.name} ${translate("doctorProfile", "bookedFor", language) || "for"} ${selectedDate} ${translate("doctorProfile", "at", language) || "at"} ${selectedTime} ${translate("doctorProfile", "isConfirmed", language) || "is confirmed"}`,
    });
    
    // Navigate to doctor chat with context of the appointment
    navigate(`/doctor-chat?doctor=${doctorId}&appointment=${selectedDate}T${selectedTime}`);
  };
  
  const handleStartChat = () => {
    if (!isLoggedIn) {
      toast({
        title: translate("doctorProfile", "loginRequired", language) || "Login Required",
        description: translate("doctorProfile", "loginToChat", language) || 
          "Please login to chat with a doctor",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    navigate(`/doctor-chat?doctor=${doctorId}`);
  };
  
  // Helper function to get the day name
  const getDayName = (dayIndex: number) => {
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return days[dayIndex];
  };
  
  // Get the current day for default selection
  const today = new Date();
  const currentDay = getDayName(today.getDay());
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Doctor Profile Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <div className="relative">
                  <img 
                    src={doctor.photo} 
                    alt={doctor.name} 
                    className="w-full h-64 object-cover object-center"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="flex gap-1 items-center bg-white/90">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{doctor.rating}</span>
                      <span className="text-xs">({doctor.reviewCount})</span>
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle>{doctor.name}</CardTitle>
                  <CardDescription>{doctor.credentials}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Specializes in:</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {doctor.specializations.map((specialization, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {specialization}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Experience:</h4>
                      <p className="text-sm">{doctor.experience} years</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Languages:</h4>
                      <p className="text-sm">{doctor.languages.join(", ")}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Location:</h4>
                    <p className="text-sm flex items-start mt-1">
                      <MapPin className="h-4 w-4 mr-1 flex-shrink-0 mt-0.5" />
                      <span>{doctor.officeLocation}</span>
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Accepting new patients:</h4>
                    <p className="text-sm flex items-center mt-1">
                      {doctor.acceptingNewPatients ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                          <span>Yes</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-4 w-4 mr-1 text-red-500" />
                          <span>No</span>
                        </>
                      )}
                    </p>
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col space-y-2">
                  <Button 
                    className="w-full"
                    onClick={handleStartChat}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Chat Now
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Doctor Details and Booking */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="about">
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger value="about">
                    <FileText className="h-4 w-4 mr-2" />
                    About
                  </TabsTrigger>
                  <TabsTrigger value="book">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Appointment
                  </TabsTrigger>
                  <TabsTrigger value="reviews">
                    <Star className="h-4 w-4 mr-2" />
                    Reviews
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>About {doctor.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-medium text-lg mb-2">Biography</h3>
                        <p>{doctor.bio}</p>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium text-lg mb-3">Education & Training</h3>
                        <ul className="space-y-3">
                          {doctor.education.map((edu, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="bg-calmBlue-100 rounded-full p-1 mr-3 mt-0.5">
                                <CheckCircle className="h-4 w-4 text-calmBlue-600" />
                              </div>
                              <div>
                                <p className="font-medium">{edu.degree}</p>
                                <p className="text-sm text-gray-600">{edu.institution}, {edu.year}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium text-lg mb-3">Insurance Accepted</h3>
                        <div className="flex flex-wrap gap-2">
                          {doctor.insuranceAccepted.map((insurance, idx) => (
                            <Badge key={idx} variant="secondary">
                              {insurance}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="book">
                  <Card>
                    <CardHeader>
                      <CardTitle>Book an Appointment</CardTitle>
                      <CardDescription>
                        Select your preferred date and time to book with {doctor.name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-3">Select Date</h3>
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => {
                            setSelectedDate(e.target.value);
                            const date = new Date(e.target.value);
                            setSelectedDay(getDayName(date.getDay()));
                          }}
                          className="border rounded-md p-2 w-full max-w-xs"
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-3">Available Times</h3>
                        {doctor.availability[selectedDay as keyof typeof doctor.availability]?.length ? (
                          <div className="flex flex-wrap gap-2">
                            {doctor.availability[selectedDay as keyof typeof doctor.availability].map((time) => (
                              <Badge
                                key={time}
                                variant={selectedTime === time ? "default" : "outline"}
                                className={`cursor-pointer ${
                                  selectedTime === time ? "bg-calmBlue-500" : ""
                                }`}
                                onClick={() => setSelectedTime(time)}
                              >
                                <Clock className="h-3 w-3 mr-1" />
                                {time}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500">No availability on this day</p>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-3">Appointment Type</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="border rounded-lg p-4 flex items-center space-x-3 cursor-pointer bg-calmBlue-50 border-calmBlue-300">
                            <Video className="h-5 w-5 text-calmBlue-500" />
                            <div>
                              <p className="font-medium">Video Call</p>
                              <p className="text-xs text-gray-500">Face-to-face online</p>
                            </div>
                          </div>
                          <div className="border rounded-lg p-4 flex items-center space-x-3 cursor-pointer">
                            <Phone className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="font-medium">Phone Call</p>
                              <p className="text-xs text-gray-500">Audio only</p>
                            </div>
                          </div>
                          <div className="border rounded-lg p-4 flex items-center space-x-3 cursor-pointer">
                            <MapPin className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="font-medium">In Person</p>
                              <p className="text-xs text-gray-500">Office visit</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        onClick={handleBookAppointment} 
                        className="w-full"
                        disabled={!selectedTime}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Confirm Booking
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="reviews">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-2" />
                        {doctor.rating} ({doctor.reviewCount} reviews)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {doctor.reviews.map((review) => (
                          <div key={review.id} className="border-b pb-5 last:border-b-0 last:pb-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{review.author}</p>
                                <p className="text-xs text-gray-500">{review.date}</p>
                              </div>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="mt-2 text-gray-700">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DoctorProfile;
