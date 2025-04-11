
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "lucide-react";

const DoctorChat = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { language, isRTL } = useLanguage();
  const { toast } = useToast();
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"message" | "appointment">("message");

  // Redirect if not logged in
  React.useEffect(() => {
    if (!isLoggedIn) {
      toast({
        title: translate("doctorChat", "loginRequired", language) || "Login Required",
        description: translate("doctorChat", "loginToChat", language) || "Please login to chat with a doctor",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [isLoggedIn, navigate, toast, language]);

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
    message: z.string().min(10, {
      message: translate("doctorChat", "messageTooShort", language) || "Message must be at least 10 characters",
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
      date: "",
      time: "",
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

    console.log("Message sent", values);
    toast({
      title: translate("doctorChat", "messageSent", language) || "Message Sent",
      description: translate("doctorChat", "doctorWillRespond", language) || "Your doctor will respond shortly",
    });
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

    console.log("Appointment requested", values);
    toast({
      title: translate("doctorChat", "appointmentRequested", language) || "Appointment Requested",
      description: translate("doctorChat", "confirmationSoon", language) || "You will receive a confirmation soon",
    });
    appointmentForm.reset();
  };

  // Doctor selection handler
  const handleDoctorSelect = (doctorId: string) => {
    setSelectedDoctor(doctorId);
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
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Communication Area */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>
                      {selectedDoctor
                        ? doctors.find((d) => d.id === selectedDoctor)?.name || ""
                        : translate("doctorChat", "selectDoctor", language) || "Select a Doctor"}
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Button
                        variant={activeTab === "message" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveTab("message")}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        {translate("doctorChat", "message", language) || "Message"}
                      </Button>
                      <Button
                        variant={activeTab === "appointment" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveTab("appointment")}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        {translate("doctorChat", "appointment", language) || "Appointment"}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {!selectedDoctor ? (
                    <div className="text-center py-10">
                      <p className="text-gray-500">
                        {translate("doctorChat", "pleaseSelect", language) ||
                          "Please select a doctor to start communication"}
                      </p>
                    </div>
                  ) : activeTab === "message" ? (
                    <Form {...messageForm}>
                      <form onSubmit={messageForm.handleSubmit(onMessageSubmit)} className="space-y-4">
                        <FormField
                          control={messageForm.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {translate("doctorChat", "yourMessage", language) || "Your Message"}
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder={
                                    translate("doctorChat", "messagePlaceholder", language) ||
                                    "Type your message here..."
                                  }
                                  className="min-h-[200px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                {translate("doctorChat", "responseTime", language) ||
                                  "Responses are typically within 24 hours"}
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full">
                          <Send className="h-4 w-4 mr-2" />
                          {translate("doctorChat", "sendMessage", language) || "Send Message"}
                        </Button>
                      </form>
                    </Form>
                  ) : (
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
