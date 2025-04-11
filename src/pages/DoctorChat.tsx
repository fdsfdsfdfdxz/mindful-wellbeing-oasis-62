
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import AppointmentForm from "@/components/doctor-chat/AppointmentForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppointmentList } from "@/components/doctor-chat/AppointmentList";
import { useToast } from "@/hooks/use-toast";
import { Appointment } from "@/types/appointment";

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

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold mb-6">Doctor Consultation</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="appointment">Book Appointment</TabsTrigger>
          <TabsTrigger value="appointments">My Appointments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Chat with Doctor</h2>
            <p className="text-gray-600 mb-4">
              This feature is coming soon. You will be able to have secure text, audio, 
              or video consultations with your healthcare provider.
            </p>
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <div className="text-gray-500 mb-2">Chat Interface Placeholder</div>
              <p className="text-sm text-gray-400">
                The secure messaging platform will appear here
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="appointment">
          <AppointmentForm 
            doctorId={doctorId} 
            onSubmit={(appointment) => {
              toast({
                title: "Appointment Scheduled",
                description: `Your ${appointment.type} appointment has been booked for ${appointment.date} at ${appointment.time}.`,
              });
              setActiveTab("appointments");
            }}
          />
        </TabsContent>
        
        <TabsContent value="appointments">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">My Appointments</h2>
            <AppointmentList 
              appointments={sampleAppointments}
              onJoinCall={handleJoinCall}
              onScheduleAppointment={handleScheduleAppointment}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DoctorChat;
