
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import AppointmentForm from "@/components/doctor-chat/AppointmentForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DoctorChat = () => {
  const [searchParams] = useSearchParams();
  const appointmentType = searchParams.get('appointment');
  const doctorId = searchParams.get('doctor') || undefined;
  
  const [activeTab, setActiveTab] = useState<string>(appointmentType || "chat");

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold mb-6">Doctor Consultation</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="appointment">Book Appointment</TabsTrigger>
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
          <AppointmentForm doctorId={doctorId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DoctorChat;
