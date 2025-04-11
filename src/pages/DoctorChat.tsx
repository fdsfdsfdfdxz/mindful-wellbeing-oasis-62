
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  MessageSquare,
  Phone,
  Video,
  Clock,
  Send,
  Calendar as CalendarIcon,
  User,
  FileText,
  Check,
  X,
  ChevronRight,
  PaperclipIcon,
  Image,
  Paperclip,
  Smile,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const DoctorChat = () => {
  const { isLoggedIn, userEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { language, isRTL } = useLanguage();
  const { toast } = useToast();
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"message" | "appointment" | "history">("message");
  const [messages, setMessages] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  // Mock doctors data
  const doctors = [
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

  // Message form schema
  const messageFormSchema = z.object({
    message: z.string().min(1, {
      message: translate("doctorChat", "messageTooShort", language) || "Message is required",
    }),
  });

  // Appointment form schema
  const appointmentFormSchema = z.object({
    date: z.string().min(1, {
      message: translate("doctorChat", "dateRequired", language) || "Date is required",
    }),
    time: z.string().min(1, {
      message: translate("doctorChat", "timeRequired", language) || "Time is required",
    }),
    reason: z.string().min(10, {
      message: translate("doctorChat", "reasonTooShort", language) || "Reason must be at least 10 characters",
    }),
    type: z.enum(["video", "phone", "inPerson"], {
      required_error: translate("doctorChat", "typeRequired", language) || "Appointment type is required",
    }),
  });

  // Form hooks
  const messageForm = useForm<z.infer<typeof messageFormSchema>>({
    resolver: zodResolver(messageFormSchema),
    defaultValues: {
      message: "",
    },
  });

  const appointmentForm = useForm<z.infer<typeof appointmentFormSchema>>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      time: "10:00",
      reason: "",
      type: "video",
    },
  });

  // Form submission handlers
  const onMessageSubmit = (values: z.infer<typeof messageFormSchema>) => {
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
      text: values.message,
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
    
    messageForm.reset();
  };

  const onAppointmentSubmit = (values: z.infer<typeof appointmentFormSchema>) => {
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
      type: values.type,
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
    
    appointmentForm.reset({
      date: new Date().toISOString().split("T")[0],
      time: "10:00",
      reason: "",
      type: "video",
    });
  };

  // Doctor selection handler
  const handleDoctorSelect = (doctorId: string) => {
    setSelectedDoctor(doctorId);
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };
  
  // Format date for appointment display
  const formatAppointmentDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };
  
  // Check if appointment is upcoming
  const isUpcoming = (dateString: string) => {
    const now = new Date();
    const appointmentDate = new Date(dateString);
    return appointmentDate > now;
  };
  
  // Get appointment status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-300">
            <Check className="h-3 w-3 mr-1" />
            Confirmed
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-300">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-300">
            <X className="h-3 w-3 mr-1" />
            Cancelled
          </Badge>
        );
      default:
        return (
          <Badge>
            {status}
          </Badge>
        );
    }
  };
  
  // Get appointment type icon
  const getAppointmentTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4 text-calmBlue-500" />;
      case "phone":
        return <Phone className="h-4 w-4 text-calmBlue-500" />;
      case "inPerson":
        return <MapPin className="h-4 w-4 text-calmBlue-500" />;
      default:
        return null;
    }
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
  
  // CheckCircleIcon component
  const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );

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
              <Card>
                <CardHeader>
                  <CardTitle>{translate("doctorChat", "yourDoctors", language) || "Your Doctors"}</CardTitle>
                  <CardDescription>
                    {translate("doctorChat", "selectToConnect", language) || "Select a doctor to connect with"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {doctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        selectedDoctor === doctor.id
                          ? "bg-calmBlue-100 border-calmBlue-300 border"
                          : "bg-white border hover:border-calmBlue-200 border-gray-200"
                      }`}
                      onClick={() => handleDoctorSelect(doctor.id)}
                    >
                      <div className="flex items-center">
                        <div className="relative">
                          <img
                            src={doctor.photo}
                            alt={doctor.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <span
                            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                              doctor.status === "online" ? "bg-green-500" : "bg-gray-400"
                            }`}
                          ></span>
                        </div>
                        <div className="ml-3">
                          <h3 className="font-medium text-gray-900">{doctor.name}</h3>
                          <p className="text-xs text-gray-500">{doctor.specialty}</p>
                          <p className="text-xs text-gray-500">{doctor.availability}</p>
                        </div>
                        {selectedDoctor === doctor.id && (
                          <ChevronRight className="ml-auto h-5 w-5 text-calmBlue-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              {/* View Profile Link */}
              {selectedDoctor && (
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate(`/doctor/${selectedDoctor}`)}
                  >
                    <User className="mr-2 h-4 w-4" />
                    {translate("doctorChat", "viewFullProfile", language) || "View Full Profile"}
                  </Button>
                </div>
              )}
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
                    <TabsList>
                      <TabsTrigger 
                        value="message" 
                        onClick={() => setActiveTab("message")}
                        className={activeTab === "message" ? "bg-calmBlue-500 text-white" : ""}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        {translate("doctorChat", "message", language) || "Message"}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="appointment" 
                        onClick={() => setActiveTab("appointment")}
                        className={activeTab === "appointment" ? "bg-calmBlue-500 text-white" : ""}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        {translate("doctorChat", "appointment", language) || "Appointment"}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="history" 
                        onClick={() => setActiveTab("history")}
                        className={activeTab === "history" ? "bg-calmBlue-500 text-white" : ""}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        {translate("doctorChat", "history", language) || "History"}
                      </TabsTrigger>
                    </TabsList>
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
                  ) : activeTab === "message" ? (
                    <div className="space-y-4">
                      {/* Chat Messages */}
                      <div className="h-96 overflow-y-auto border rounded-lg bg-gray-50 p-4">
                        {isLoading ? (
                          <div className="flex items-center justify-center h-full">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-calmBlue-500"></div>
                          </div>
                        ) : messages.length > 0 ? (
                          <div className="space-y-4">
                            {messages.map((message) => (
                              <div
                                key={message.id}
                                className={`flex ${
                                  message.sender === "user" ? "justify-end" : "justify-start"
                                }`}
                              >
                                {message.sender === "doctor" && (
                                  <div className="mr-2">
                                    <div className="w-8 h-8 rounded-full overflow-hidden">
                                      <img
                                        src={doctors.find((d) => d.id === selectedDoctor)?.photo}
                                        alt="Doctor"
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  </div>
                                )}
                                <div
                                  className={`max-w-[75%] rounded-lg p-3 ${
                                    message.sender === "user"
                                      ? "bg-calmBlue-500 text-white"
                                      : "bg-white border border-gray-200"
                                  }`}
                                >
                                  <p className="whitespace-pre-wrap break-words">{message.text}</p>
                                  <p
                                    className={`text-xs mt-1 ${
                                      message.sender === "user" ? "text-calmBlue-100" : "text-gray-500"
                                    }`}
                                  >
                                    {formatDate(message.timestamp)}
                                  </p>
                                </div>
                                {message.sender === "user" && (
                                  <div className="ml-2">
                                    <div className="w-8 h-8 rounded-full overflow-hidden bg-calmBlue-100 flex items-center justify-center">
                                      <User className="h-4 w-4 text-calmBlue-500" />
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                              <MessageSquare className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                              <p className="text-gray-500">
                                {translate("doctorChat", "noMessages", language) ||
                                  "No messages yet. Start the conversation!"}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Message Input Form */}
                      <Form {...messageForm}>
                        <form onSubmit={messageForm.handleSubmit(onMessageSubmit)} className="space-y-4">
                          <div className="relative">
                            <FormField
                              control={messageForm.control}
                              name="message"
                              render={({ field }) => (
                                <FormItem>
                                  <div className="relative">
                                    <Textarea
                                      placeholder={
                                        translate("doctorChat", "messagePlaceholder", language) ||
                                        "Type your message here..."
                                      }
                                      className="pr-24 min-h-[120px] resize-none"
                                      {...field}
                                    />
                                    <div className="absolute bottom-3 right-3 flex space-x-2">
                                      <Button type="button" size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0">
                                        <Paperclip className="h-4 w-4 text-gray-500" />
                                      </Button>
                                      <Button type="button" size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0">
                                        <Image className="h-4 w-4 text-gray-500" />
                                      </Button>
                                      <Button type="button" size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0">
                                        <Smile className="h-4 w-4 text-gray-500" />
                                      </Button>
                                    </div>
                                  </div>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <Button type="submit" className="w-full">
                            <Send className="h-4 w-4 mr-2" />
                            {translate("doctorChat", "sendMessage", language) || "Send Message"}
                          </Button>
                        </form>
                      </Form>
                    </div>
                  ) : activeTab === "appointment" ? (
                    <Form {...appointmentForm}>
                      <form onSubmit={appointmentForm.handleSubmit(onAppointmentSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={appointmentForm.control}
                            name="date"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  {translate("doctorChat", "appointmentDate", language) || "Appointment Date"}
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <CalendarIcon className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                                    <Input
                                      type="date"
                                      className="pl-10"
                                      {...field}
                                      min={new Date().toISOString().split("T")[0]}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={appointmentForm.control}
                            name="time"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  {translate("doctorChat", "appointmentTime", language) || "Appointment Time"}
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Clock className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                                    <Input
                                      type="time"
                                      className="pl-10"
                                      {...field}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={appointmentForm.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {translate("doctorChat", "appointmentType", language) || "Appointment Type"}
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder={
                                      translate("doctorChat", "selectType", language) || "Select appointment type"
                                    } />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="video">
                                    <div className="flex items-center">
                                      <Video className="h-4 w-4 mr-2" />
                                      <span>{translate("doctorChat", "videoCall", language) || "Video Call"}</span>
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="phone">
                                    <div className="flex items-center">
                                      <Phone className="h-4 w-4 mr-2" />
                                      <span>{translate("doctorChat", "phoneCall", language) || "Phone Call"}</span>
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="inPerson">
                                    <div className="flex items-center">
                                      <Calendar className="h-4 w-4 mr-2" />
                                      <span>{translate("doctorChat", "inPerson", language) || "In Person"}</span>
                                    </div>
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={appointmentForm.control}
                          name="reason"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {translate("doctorChat", "appointmentReason", language) || "Reason for Appointment"}
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder={
                                    translate("doctorChat", "reasonPlaceholder", language) ||
                                    "Briefly describe the reason for your appointment..."
                                  }
                                  className="min-h-[100px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button type="submit" className="w-full">
                          <Calendar className="h-4 w-4 mr-2" />
                          {translate("doctorChat", "requestAppointment", language) || "Request Appointment"}
                        </Button>
                      </form>
                    </Form>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Upcoming Appointments</h3>
                        {appointments.filter(app => isUpcoming(app.date)).length > 0 ? (
                          <div className="space-y-4">
                            {appointments
                              .filter(app => isUpcoming(app.date))
                              .map(appointment => (
                                <Card key={appointment.id} className="overflow-hidden">
                                  <div className="border-l-4 border-calmBlue-500 pl-4 p-4">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <h4 className="font-medium">{formatAppointmentDate(appointment.date)}</h4>
                                        <div className="flex items-center mt-1 text-sm text-gray-500">
                                          {getAppointmentTypeIcon(appointment.type)}
                                          <span className="ml-1 capitalize">
                                            {appointment.type === "inPerson" ? "In Person" : `${appointment.type} Call`}
                                          </span>
                                        </div>
                                        <p className="text-sm mt-2">{appointment.notes}</p>
                                      </div>
                                      <div className="flex flex-col items-end">
                                        {getStatusBadge(appointment.status)}
                                        {appointment.status === "confirmed" && appointment.type === "video" && (
                                          <Button 
                                            size="sm" 
                                            className="mt-3"
                                            onClick={() => handleJoinCall(appointment.id)}
                                          >
                                            <Video className="h-4 w-4 mr-1" />
                                            Join Call
                                          </Button>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </Card>
                              ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 border rounded-lg bg-gray-50">
                            <Calendar className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                            <p className="text-gray-500">
                              No upcoming appointments
                            </p>
                            <Button
                              variant="link"
                              className="mt-2"
                              onClick={() => setActiveTab("appointment")}
                            >
                              Schedule an appointment
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Past Appointments</h3>
                        {appointments.filter(app => !isUpcoming(app.date)).length > 0 ? (
                          <div className="space-y-4">
                            {appointments
                              .filter(app => !isUpcoming(app.date))
                              .map(appointment => (
                                <Card key={appointment.id} className="overflow-hidden border-gray-200">
                                  <div className="border-l-4 border-gray-300 pl-4 p-4">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <h4 className="font-medium text-gray-700">{formatAppointmentDate(appointment.date)}</h4>
                                        <div className="flex items-center mt-1 text-sm text-gray-500">
                                          {getAppointmentTypeIcon(appointment.type)}
                                          <span className="ml-1 capitalize">
                                            {appointment.type === "inPerson" ? "In Person" : `${appointment.type} Call`}
                                          </span>
                                        </div>
                                        <p className="text-sm mt-2 text-gray-600">{appointment.notes}</p>
                                      </div>
                                      <div>
                                        {getStatusBadge(appointment.status)}
                                      </div>
                                    </div>
                                  </div>
                                </Card>
                              ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 border rounded-lg bg-gray-50">
                            <FileText className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                            <p className="text-gray-500">
                              No past appointments
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
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
