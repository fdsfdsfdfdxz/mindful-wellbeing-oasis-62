
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";

// Import our new components
import { DoctorList } from "@/components/doctor-chat/DoctorList";
import { MessageList } from "@/components/doctor-chat/MessageList";
import { MessageForm } from "@/components/doctor-chat/MessageForm";
import { AppointmentForm } from "@/components/doctor-chat/AppointmentForm";
import { AppointmentList } from "@/components/doctor-chat/AppointmentList";
import { ChatTabs } from "@/components/doctor-chat/ChatTabs";

// Import types
import { Doctor } from "@/types/doctor";
import { Message } from "@/types/chat";
import { Appointment } from "@/types/appointment";

const DoctorChat = () => {
  const { isLoggedIn, userEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const { toast } = useToast();
  
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"message" | "appointment" | "history">("message");
  const [messages, setMessages] = useState<Message[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock doctors data
  const doctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialty: "Clinical Psychology",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      availability: "Available today",
      status: "online"
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialty: "Psychologist",
      photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      availability: "Available tomorrow",
      status: "offline"
    },
    {
      id: "3",
      name: "Dr. Aisha Rahman",
      specialty: "Psychiatrist",
      photo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      availability: "Available today",
      status: "online"
    }
  ];

  // Get doctor ID from URL if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const doctorId = params.get("doctor");
    
    if (doctorId) {
      setSelectedDoctor(doctorId);
    }
    
    const appointment = params.get("appointment");
    if (appointment) {
      setActiveTab("appointment");
    }
  }, [location.search]);

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      toast({
        title: translate("doctorChat", "loginRequired", language) || "Login Required",
        description: translate("doctorChat", "loginToChat", language) || "Please login to chat with a doctor",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [isLoggedIn, navigate, toast, language]);

  // Load chat history when doctor is selected
  useEffect(() => {
    if (selectedDoctor) {
      // Simulate loading chat history
      setIsLoading(true);
      
      // Mock chat history
      setTimeout(() => {
        const mockMessages = [
          {
            id: 1,
            sender: "doctor",
            text: "Hello! How can I help you today?",
            timestamp: new Date(Date.now() - 8640000).toISOString(),
            read: true,
          },
          {
            id: 2,
            sender: "user",
            text: "I've been experiencing anxiety lately. I'm not sure if I should be concerned.",
            timestamp: new Date(Date.now() - 7640000).toISOString(),
            read: true,
          },
          {
            id: 3,
            sender: "doctor",
            text: "I understand how difficult anxiety can be. Could you tell me more about your symptoms? When did you start noticing them?",
            timestamp: new Date(Date.now() - 7540000).toISOString(),
            read: true,
          },
          {
            id: 4,
            sender: "user",
            text: "It started about two weeks ago. I'm having trouble sleeping and I feel on edge most of the day. Sometimes I get heart palpitations.",
            timestamp: new Date(Date.now() - 7440000).toISOString(),
            read: true,
          },
          {
            id: 5,
            sender: "doctor",
            text: "Thank you for sharing that. Those are common symptoms of anxiety. I'd like to discuss some strategies that might help, and we can also explore whether you might benefit from a more comprehensive evaluation.",
            timestamp: new Date(Date.now() - 7340000).toISOString(),
            read: true,
          },
        ];
        
        setMessages(mockMessages);
        setIsLoading(false);
      }, 1000);
      
      // Simulate loading appointments
      const mockAppointments = [
        {
          id: 1,
          date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          type: "video",
          status: "confirmed",
          notes: "Initial consultation",
          doctor: doctors.find(d => d.id === selectedDoctor),
        },
        {
          id: 2,
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          type: "video",
          status: "completed",
          notes: "Follow-up session",
          doctor: doctors.find(d => d.id === selectedDoctor),
        },
      ];
      
      setAppointments(mockAppointments);
    }
  }, [selectedDoctor]);

  // Doctor selection handler
  const handleDoctorSelect = (doctorId: string) => {
    setSelectedDoctor(doctorId);
  };

  // Handle message submit
  const handleMessageSubmit = (message: string) => {
    if (!selectedDoctor) {
      toast({
        title: translate("doctorChat", "noDoctor", language) || "No Doctor Selected",
        description: translate("doctorChat", "selectDoctor", language) || "Please select a doctor first",
        variant: "destructive",
      });
      return;
    }

    // Add message to chat
    const newMessage = {
      id: Date.now(),
      sender: "user",
      text: message,
      timestamp: new Date().toISOString(),
      read: false,
    };
    
    setMessages([...messages, newMessage]);
    
    // Simulate doctor response
    setTimeout(() => {
      const doctorResponse = {
        id: Date.now() + 1,
        sender: "doctor",
        text: "Thank you for your message. I'll review it and get back to you soon.",
        timestamp: new Date().toISOString(),
        read: false,
      };
      
      setMessages(prevMessages => [...prevMessages, doctorResponse]);
      
      toast({
        title: translate("doctorChat", "newMessage", language) || "New Message",
        description: translate("doctorChat", "doctorResponded", language) || "Your doctor has responded to your message",
      });
    }, 3000);
  };

  // Handle appointment submit
  const handleAppointmentSubmit = (values: {
    date: string;
    time: string;
    reason: string;
    type: string;
  }) => {
    if (!selectedDoctor) {
      toast({
        title: translate("doctorChat", "noDoctor", language) || "No Doctor Selected",
        description: translate("doctorChat", "selectDoctor", language) || "Please select a doctor first",
        variant: "destructive",
      });
      return;
    }

    // Add appointment to list
    const newAppointment = {
      id: Date.now(),
      date: `${values.date}T${values.time}`,
      type: values.type as "video" | "phone" | "inPerson",
      status: "pending",
      notes: values.reason,
      doctor: doctors.find(d => d.id === selectedDoctor),
    };
    
    setAppointments([...appointments, newAppointment]);
    
    toast({
      title: translate("doctorChat", "appointmentRequested", language) || "Appointment Requested",
      description: translate("doctorChat", "confirmationSoon", language) || "You will receive a confirmation soon",
    });
    
    // Simulate confirmation
    setTimeout(() => {
      setAppointments(prevAppointments => 
        prevAppointments.map(app => 
          app.id === newAppointment.id 
            ? { ...app, status: "confirmed" } 
            : app
        )
      );
      
      toast({
        title: translate("doctorChat", "appointmentConfirmed", language) || "Appointment Confirmed",
        description: translate("doctorChat", "appointmentScheduled", language) || "Your appointment has been scheduled",
      });
    }, 5000);
  };
  
  // Join video call
  const handleJoinCall = (appointmentId: number) => {
    toast({
      title: "Joining Video Call",
      description: "Connecting to your doctor via secure video...",
    });
    
    // In a real app, this would redirect to a video call platform or open one in-app
    window.open(`https://example.com/call/${appointmentId}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="container-custom py-10">
          <h1 className="text-3xl font-bold mb-8">
            {translate("doctorChat", "connectWithDoctor", language) || "Connect with Your Doctor"}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Doctors List */}
            <div className="md:col-span-1">
              <DoctorList 
                doctors={doctors} 
                selectedDoctor={selectedDoctor} 
                onSelectDoctor={handleDoctorSelect} 
              />
            </div>

            {/* Communication Area */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader className="pb-0">
                  <div className="flex justify-between items-center">
                    <CardTitle>
                      {selectedDoctor
                        ? doctors.find((d) => d.id === selectedDoctor)?.name || ""
                        : translate("doctorChat", "selectDoctor", language) || "Select a Doctor"}
                    </CardTitle>
                    <ChatTabs activeTab={activeTab} onTabChange={setActiveTab} />
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {!selectedDoctor ? (
                    <div className="text-center py-10">
                      <p className="text-gray-500">
                        {translate("doctorChat", "pleaseSelect", language) ||
                          "Please select a doctor to start communication"}
                      </p>
                    </div>
                  ) : (
                    <Tabs value={activeTab}>
                      <TabsContent value="message">
                        <div className="space-y-4">
                          {/* Chat Messages */}
                          <div className="h-96 overflow-y-auto border rounded-lg bg-gray-50 p-4">
                            <MessageList 
                              messages={messages} 
                              isLoading={isLoading} 
                              selectedDoctor={selectedDoctor} 
                              doctors={doctors} 
                            />
                          </div>
                          
                          {/* Message Input Form */}
                          <MessageForm onSubmit={handleMessageSubmit} />
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="appointment">
                        <AppointmentForm onSubmit={handleAppointmentSubmit} />
                      </TabsContent>
                      
                      <TabsContent value="history">
                        <AppointmentList 
                          appointments={appointments} 
                          onJoinCall={handleJoinCall} 
                          onScheduleAppointment={() => setActiveTab("appointment")} 
                        />
                      </TabsContent>
                    </Tabs>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DoctorChat;

