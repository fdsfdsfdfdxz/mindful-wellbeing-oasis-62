
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Mic, 
  MicOff, 
  PhoneOff,  
  MessageSquare,
  Volume2,
  VolumeX,
  Settings,
  AlertCircle,
  WifiOff
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

interface AudioConsultationProps {
  doctorId: string;
  doctorName: string;
  doctorPhoto: string;
  onEndCall: () => void;
  onMessageToggle: () => void;
  onSwitchToVideo: () => void;
}

export function AudioConsultation({ 
  doctorId, 
  doctorName, 
  doctorPhoto,
  onEndCall,
  onMessageToggle,
  onSwitchToVideo
}: AudioConsultationProps) {
  const [isConnecting, setIsConnecting] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);
  const [networkQuality, setNetworkQuality] = useState<'high' | 'medium' | 'low'>('high');
  const [isRecording, setIsRecording] = useState(false);
  const [volume, setVolume] = useState(75);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [connectionFailed, setConnectionFailed] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [audioActivity, setAudioActivity] = useState(30);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const { language } = useLanguage();
  const { toast } = useToast();
  
  // Simulate connection establishment
  useEffect(() => {
    // In a real implementation, this would use WebRTC for audio
    const setupAudioCall = async () => {
      try {
        // Simulate connection
        setTimeout(() => {
          setIsConnecting(false);
          setIsConnected(true);
          
          toast({
            title: translate('audioConsultation', 'connected', language) || "Connected",
            description: translate('audioConsultation', 'doctorJoined', language) || 
              `${doctorName} has joined the call`,
          });
          
          // Simulate variable network conditions
          simulateNetworkConditions();
        }, 2000);
      } catch (error) {
        console.error('Failed to access microphone:', error);
        setIsConnecting(false);
        setConnectionFailed(true);
        
        toast({
          title: translate('audioConsultation', 'connectionFailed', language) || "Connection Failed",
          description: translate('audioConsultation', 'tryAgain', language) || 
            "Please check your microphone permissions and try again",
          variant: "destructive",
        });
      }
    };
    
    setupAudioCall();
    
    // Start call duration timer when connected
    let timer: NodeJS.Timeout;
    if (isConnected) {
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
        
        // Simulate audio activity
        setAudioActivity(prev => {
          const newValue = prev + (Math.random() * 30 - 15);
          return Math.max(5, Math.min(95, newValue));
        });
      }, 1000);
    }
    
    // Cleanup function
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [doctorName, language, toast, isConnected]);
  
  // Function to simulate network conditions changing
  const simulateNetworkConditions = () => {
    const intervalId = setInterval(() => {
      const rand = Math.random();
      if (rand > 0.95) {
        setNetworkQuality('low');
        toast({
          title: translate('audioConsultation', 'poorConnection', language) || "Poor Connection",
          description: translate('audioConsultation', 'mayExperienceIssues', language) || 
            "You may experience audio issues. Please stay in a location with better signal.",
        });
      } else if (rand > 0.8) {
        setNetworkQuality('medium');
      } else {
        setNetworkQuality('high');
      }
    }, 20000); // Check every 20 seconds
    
    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  };
  
  // Format call duration as mm:ss
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Toggle mute mic
  const toggleMic = () => {
    setIsMicMuted(!isMicMuted);
    
    toast({
      title: !isMicMuted 
        ? translate('audioConsultation', 'micMuted', language) || "Microphone Muted" 
        : translate('audioConsultation', 'micUnmuted', language) || "Microphone Unmuted",
    });
  };
  
  // Toggle speaker mute
  const toggleSpeaker = () => {
    setIsSpeakerMuted(!isSpeakerMuted);
    
    // In a real implementation, this would actually mute audio output
    if (audioRef.current) {
      audioRef.current.muted = !isSpeakerMuted;
    }
    
    toast({
      title: !isSpeakerMuted 
        ? translate('audioConsultation', 'speakerMuted', language) || "Speaker Muted" 
        : translate('audioConsultation', 'speakerUnmuted', language) || "Speaker Unmuted",
    });
  };
  
  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    
    // In a real implementation, this would actually change the volume
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100;
    }
  };
  
  // Toggle recording
  const toggleRecording = () => {
    // Implement recording logic here
    setIsRecording(!isRecording);
    
    toast({
      title: !isRecording 
        ? translate('audioConsultation', 'startedRecording', language) || "Started Recording" 
        : translate('audioConsultation', 'stoppedRecording', language) || "Stopped Recording",
    });
  };
  
  // End call handler
  const handleEndCall = () => {
    // Implement call ending logic here
    toast({
      title: translate('audioConsultation', 'callEnded', language) || "Call Ended",
      description: translate('audioConsultation', 'callDuration', language) || 
        `Call duration: ${formatDuration(callDuration)}`,
    });
    
    onEndCall();
  };
  
  // Switch to video call
  const handleSwitchToVideo = () => {
    toast({
      title: translate('audioConsultation', 'switchingToVideo', language) || "Switching to Video",
      description: translate('audioConsultation', 'preparingVideo', language) || 
        "Preparing video connection...",
    });
    
    onSwitchToVideo();
  };
  
  // Get network quality indicator
  const getNetworkQualityIndicator = () => {
    switch (networkQuality) {
      case 'high':
        return (
          <div className="flex items-center text-green-500">
            <div className="h-2 w-1 bg-current rounded-sm"></div>
            <div className="h-3 w-1 bg-current rounded-sm mx-0.5"></div>
            <div className="h-4 w-1 bg-current rounded-sm"></div>
          </div>
        );
      case 'medium':
        return (
          <div className="flex items-center text-yellow-500">
            <div className="h-2 w-1 bg-current rounded-sm"></div>
            <div className="h-3 w-1 bg-current rounded-sm mx-0.5"></div>
            <div className="h-4 w-1 bg-gray-300 rounded-sm"></div>
          </div>
        );
      case 'low':
        return (
          <div className="flex items-center text-red-500">
            <div className="h-2 w-1 bg-current rounded-sm"></div>
            <div className="h-3 w-1 bg-gray-300 rounded-sm mx-0.5"></div>
            <div className="h-4 w-1 bg-gray-300 rounded-sm"></div>
          </div>
        );
    }
  };
  
  // If connection failed
  if (connectionFailed) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-gray-50 rounded-lg p-6">
        <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
        <h3 className="text-xl font-bold mb-2">
          {translate('audioConsultation', 'connectionFailed', language) || "Connection Failed"}
        </h3>
        <p className="text-gray-600 text-center mb-6">
          {translate('audioConsultation', 'connectionFailedDesc', language) || 
            "We couldn't establish a connection. Please check your microphone permissions and internet connection."}
        </p>
        <div className="space-x-3">
          <Button onClick={() => window.location.reload()} variant="default">
            {translate('audioConsultation', 'tryAgain', language) || "Try Again"}
          </Button>
          <Button onClick={onEndCall} variant="outline">
            {translate('audioConsultation', 'cancel', language) || "Cancel"}
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative">
      {/* Main audio call area */}
      <div className="relative w-full h-80 bg-gray-100 rounded-lg overflow-hidden flex flex-col items-center justify-center">
        {/* Hidden audio element */}
        <audio ref={audioRef} autoPlay muted={isSpeakerMuted} />
        
        {isConnecting ? (
          <div className="flex flex-col items-center justify-center">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg">
              <img src={doctorPhoto} alt={doctorName} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-gray-900 font-medium text-xl mb-1">{doctorName}</h3>
            <p className="text-gray-600 text-sm mb-4">
              {translate('audioConsultation', 'connecting', language) || "Connecting..."}
            </p>
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '300ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '600ms' }}></div>
            </div>
          </div>
        ) : (
          <>
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg relative">
              <img src={doctorPhoto} alt={doctorName} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <h3 className="text-gray-900 font-medium text-xl mb-1">{doctorName}</h3>
            <p className="text-gray-600 text-sm">
              {translate('audioConsultation', 'inCall', language) || "In call"} · {formatDuration(callDuration)}
            </p>
            
            <div className="mt-8 w-3/4 max-w-xs">
              <Progress value={audioActivity} className="h-1.5" />
            </div>
            
            {/* Status indicator */}
            <div className="absolute top-4 right-4 flex items-center bg-white/80 rounded-full px-3 py-1 shadow-sm">
              {getNetworkQualityIndicator()}
              <span className="text-xs font-medium ml-2 text-gray-800">
                {isRecording && (
                  <span className="text-red-500 mr-2">●</span>
                )}
                {networkQuality === 'high' 
                  ? translate('audioConsultation', 'goodSignal', language) || "Good Signal" 
                  : networkQuality === 'medium'
                    ? translate('audioConsultation', 'fairSignal', language) || "Fair Signal"
                    : translate('audioConsultation', 'poorSignal', language) || "Poor Signal"}
              </span>
            </div>
            
            {networkQuality === 'low' && (
              <div className="absolute bottom-4 left-4 right-4 bg-red-50 border border-red-200 rounded-md p-3 flex items-center">
                <WifiOff className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                <p className="text-sm text-red-800">
                  {translate('audioConsultation', 'weakConnection', language) || 
                    "Weak connection detected. Audio quality may be affected."}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-2">
          <Button
            onClick={toggleMic}
            variant={isMicMuted ? "destructive" : "secondary"}
            size="sm"
            className="rounded-full w-10 h-10 p-0"
          >
            {isMicMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          
          <Button
            onClick={toggleSpeaker}
            variant={isSpeakerMuted ? "destructive" : "secondary"}
            size="sm"
            className="rounded-full w-10 h-10 p-0"
          >
            {isSpeakerMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
        </div>
        
        <Button
          onClick={handleEndCall}
          variant="destructive"
          size="sm"
          className="rounded-full px-4"
        >
          <PhoneOff className="h-5 w-5 mr-2" />
          {translate('audioConsultation', 'endCall', language) || "End Call"}
        </Button>
        
        <div className="flex space-x-2">
          <Button
            onClick={handleSwitchToVideo}
            variant="secondary"
            size="sm"
            className="rounded-full"
          >
            {translate('audioConsultation', 'switchToVideo', language) || "Switch to Video"}
          </Button>
          
          <Button
            onClick={onMessageToggle}
            variant="secondary"
            size="sm"
            className="rounded-full w-10 h-10 p-0"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
          
          <Button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            variant="secondary"
            size="sm"
            className="rounded-full w-10 h-10 p-0"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Settings panel */}
      {isSettingsOpen && (
        <div className="mt-4 p-4 bg-card border border-border rounded-lg">
          <h3 className="font-medium mb-4">
            {translate('audioConsultation', 'settings', language) || "Call Settings"}
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="volume">
                    {translate('audioConsultation', 'volume', language) || "Volume"}
                  </Label>
                  <span className="text-sm text-muted-foreground">{volume}%</span>
                </div>
                <Slider
                  id="volume"
                  value={[volume]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="recording">
                    {translate('audioConsultation', 'recordCall', language) || "Record Call"}
                  </Label>
                  <Switch
                    id="recording"
                    checked={isRecording}
                    onCheckedChange={toggleRecording}
                  />
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-2">
                {translate('audioConsultation', 'connectionInfo', language) || "Connection Information"}
              </h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>
                  {translate('audioConsultation', 'quality', language) || "Quality"}: {" "}
                  <span className={networkQuality === 'high' 
                    ? 'text-green-500' 
                    : networkQuality === 'medium' 
                      ? 'text-yellow-500' 
                      : 'text-red-500'}>
                    {networkQuality === 'high' 
                      ? translate('audioConsultation', 'good', language) || "Good" 
                      : networkQuality === 'medium' 
                        ? translate('audioConsultation', 'fair', language) || "Fair" 
                        : translate('audioConsultation', 'poor', language) || "Poor"}
                  </span>
                </p>
                <p>
                  {translate('audioConsultation', 'codec', language) || "Codec"}: Opus
                </p>
                <p>
                  {translate('audioConsultation', 'encryption', language) || "Encryption"}: 
                  {" "}{translate('audioConsultation', 'enabled', language) || "Enabled"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
