import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Appointment } from "@/types/appointment";
import { BackButton } from "@/components/navigation/BackButton";

import AppointmentForm from "@/components/doctor-chat/AppointmentForm";
import { DoctorChatTabs } from "@/components/doctor-chat/DoctorChatTabs";
import { ChatContent } from "@/components/doctor-chat/ChatContent";
import { AppointmentsContent } from "@/components/doctor-chat/AppointmentsContent";
import { AppointmentSuccess } from "@/components/doctor-chat/AppointmentSuccess";

// Sample appointments data - in a real app, this would come from an API
const sampleAppointments: Appointment[] = [
  {
    id: 1,
    date: "2025-04-15T14:30:00",
    type: "video",
    status: "confirmed",
    notes: "Initial consultation for anxiety management",
  },
  {
    id: 2,
    date: "2025-04-20T10:00:00",
    type: "inPerson",
    status: "pending",
    notes: "Follow-up session to discuss progress",
  },
  {
    id: 3,
    date: "2025-03-30T15:00:00",
    type: "phone",
    status: "completed",
    notes: "Emergency consultation about medication side effects",
  }
];

const DoctorChat = () => {
  const [searchParams] = useSearchParams();
  const appointmentType = searchParams.get('appointment');
  const doctorId = searchParams.get('doctor') || undefined;
  
  const [activeTab, setActiveTab] = useState<string>(appointmentType || "chat");
  const [recentAppointment, setRecentAppointment] = useState<{
    type: string;
    date: string;
    time: string;
  } | undefined>(undefined);
  
  const { toast } = useToast();
  
  const handleJoinCall = (appointmentId: number) => {
    toast({
      title: "Joining video call",
      description: `Connecting to appointment #${appointmentId}`,
    });
    // In a real app, this would initiate the video call
  };

  const handleScheduleAppointment = () => {
    setActiveTab("appointment");
  };

  const handleAppointmentSubmit = (appointment: {
    date: string;
    time: string;
    reason: string;
    type: "video" | "phone" | "inPerson";
  }) => {
    toast({
      title: "Appointment Scheduled",
      description: `Your ${appointment.type} appointment has been booked for ${appointment.date} at ${appointment.time}.`,
    });
    
    setRecentAppointment({
      type: appointment.type,
      date: appointment.date,
      time: appointment.time
    });
    
    setActiveTab("appointments");
  };

  return (
    <div className="container-custom py-12">
      <div className="flex items-center gap-4 mb-4">
        <BackButton />
        <h1 className="text-3xl font-bold">Doctor Consultation</h1>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <DoctorChatTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        <TabsContent value="chat">
          <ChatContent />
        </TabsContent>
        
        <TabsContent value="appointment">
          <AppointmentForm 
            doctorId={doctorId} 
            onSubmit={handleAppointmentSubmit}
          />
        </TabsContent>
        
        <TabsContent value="appointments">
          {recentAppointment && <AppointmentSuccess appointmentData={recentAppointment} />}
          <AppointmentsContent 
            appointments={sampleAppointments}
            onJoinCall={handleJoinCall}
            onScheduleAppointment={handleScheduleAppointment}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DoctorChat;
