
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { VideoConsultation } from "./VideoConsultation";
import { AudioConsultation } from "./AudioConsultation";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";
import { Video, Phone, MessageSquare } from "lucide-react";

interface ConsultationTabsProps {
  doctorId: string;
  doctorName: string;
  doctorPhoto: string;
  defaultTab?: "message" | "audio" | "video";
  onTabChange?: (tab: string) => void;
}

export function ConsultationTabs({
  doctorId,
  doctorName,
  doctorPhoto,
  defaultTab = "message",
  onTabChange
}: ConsultationTabsProps) {
  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const [isChatOpen, setIsChatOpen] = useState(true);
  
  const { language } = useLanguage();
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (onTabChange) {
      onTabChange(value);
    }
  };
  
  const handleMessageToggle = () => {
    setIsChatOpen(!isChatOpen);
  };
  
  const handleEndCall = () => {
    // Return to message tab when call ends
    handleTabChange("message");
  };
  
  const handleSwitchToVideo = () => {
    handleTabChange("video");
  };
  
  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <CardTitle>
            {doctorName}
          </CardTitle>
          <CardDescription>
            {activeTab === "message" 
              ? translate("consultation", "sendMessage", language) || "Send a message"
              : activeTab === "audio"
                ? translate("consultation", "audioCall", language) || "Audio call"
                : translate("consultation", "videoCall", language) || "Video call"}
          </CardDescription>
        </div>
        
        <TabsList>
          <TabsTrigger value="message" className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            {translate("consultation", "message", language) || "Message"}
          </TabsTrigger>
          <TabsTrigger value="audio" className="flex items-center">
            <Phone className="h-4 w-4 mr-2" />
            {translate("consultation", "audio", language) || "Audio"}
          </TabsTrigger>
          <TabsTrigger value="video" className="flex items-center">
            <Video className="h-4 w-4 mr-2" />
            {translate("consultation", "video", language) || "Video"}
          </TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="message">
        {/* The existing message UI will be rendered here */}
        {isChatOpen ? (
          <div className="text-center py-4">
            {translate("consultation", "messageTab", language) || "Message tab is active"}
          </div>
        ) : (
          <div className="text-center py-4">
            {translate("consultation", "messageClosed", language) || "Message window is closed"}
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="audio">
        <AudioConsultation 
          doctorId={doctorId}
          doctorName={doctorName}
          doctorPhoto={doctorPhoto}
          onEndCall={handleEndCall}
          onMessageToggle={handleMessageToggle}
          onSwitchToVideo={handleSwitchToVideo}
        />
      </TabsContent>
      
      <TabsContent value="video">
        <VideoConsultation 
          doctorId={doctorId}
          doctorName={doctorName}
          doctorPhoto={doctorPhoto}
          onEndCall={handleEndCall}
          onMessageToggle={handleMessageToggle}
        />
      </TabsContent>
    </Tabs>
  );
}
