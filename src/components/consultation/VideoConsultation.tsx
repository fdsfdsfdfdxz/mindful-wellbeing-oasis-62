
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  PhoneOff, 
  Share, 
  Monitor, 
  MessageSquare,
  Volume2,
  VolumeX,
  Camera,
  CameraOff,
  Settings,
  AlertCircle
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface VideoConsultationProps {
  doctorId: string;
  doctorName: string;
  doctorPhoto: string;
  onEndCall: () => void;
  onMessageToggle: () => void;
}

export function VideoConsultation({ 
  doctorId, 
  doctorName, 
  doctorPhoto,
  onEndCall,
  onMessageToggle
}: VideoConsultationProps) {
  const [isConnecting, setIsConnecting] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);
  const [networkQuality, setNetworkQuality] = useState<'high' | 'medium' | 'low'>('high');
  const [isRecording, setIsRecording] = useState(false);
  const [volume, setVolume] = useState(75);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [connectionFailed, setConnectionFailed] = useState(false);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  
  const { language } = useLanguage();
  const { toast } = useToast();
  
  // Simulate connection establishment
  useEffect(() => {
    // Setup local video stream (real implementation would use WebRTC)
    const setupLocalVideo = async () => {
      try {
        // In a real implementation, this would be:
        // const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        // if (localVideoRef.current) {
        //   localVideoRef.current.srcObject = stream;
        // }
        
        // For demo purposes, we'll just use a timeout
        setTimeout(() => {
          setIsConnecting(false);
          setIsConnected(true);
          
          toast({
            title: translate('videoConsultation', 'connected', language) || "Connected",
            description: translate('videoConsultation', 'doctorJoined', language) || 
              `${doctorName} has joined the call`,
          });
          
          // Simulate variable network conditions
          simulateNetworkConditions();
        }, 3000);
      } catch (error) {
        console.error('Failed to access camera/microphone:', error);
        setIsConnecting(false);
        setConnectionFailed(true);
        
        toast({
          title: translate('videoConsultation', 'connectionFailed', language) || "Connection Failed",
          description: translate('videoConsultation', 'tryAgain', language) || 
            "Please check your camera and microphone permissions and try again",
          variant: "destructive",
        });
      }
    };
    
    setupLocalVideo();
    
    // Cleanup function
    return () => {
      // In a real implementation, we would stop all streams:
      // if (localVideoRef.current && localVideoRef.current.srcObject) {
      //   const stream = localVideoRef.current.srcObject as MediaStream;
      //   stream.getTracks().forEach(track => track.stop());
      // }
    };
  }, [doctorName, language, toast]);
  
  // Function to simulate network conditions changing
  const simulateNetworkConditions = () => {
    const intervalId = setInterval(() => {
      const rand = Math.random();
      if (rand > 0.9) {
        setNetworkQuality('low');
        toast({
          title: translate('videoConsultation', 'poorConnection', language) || "Poor Connection",
          description: translate('videoConsultation', 'switchToAudio', language) || 
            "Consider switching to audio-only mode to improve quality",
        });
      } else if (rand > 0.7) {
        setNetworkQuality('medium');
      } else {
        setNetworkQuality('high');
      }
    }, 15000); // Check every 15 seconds
    
    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  };
  
  // Toggle mute mic
  const toggleMic = () => {
    setIsMicMuted(!isMicMuted);
    
    toast({
      title: !isMicMuted 
        ? translate('videoConsultation', 'micMuted', language) || "Microphone Muted" 
        : translate('videoConsultation', 'micUnmuted', language) || "Microphone Unmuted",
    });
  };
  
  // Toggle video
  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    
    toast({
      title: !isVideoEnabled 
        ? translate('videoConsultation', 'videoEnabled', language) || "Video Enabled" 
        : translate('videoConsultation', 'videoDisabled', language) || "Video Disabled",
    });
  };
  
  // Toggle screen sharing
  const toggleScreenSharing = () => {
    // In a real implementation, this would use the browser's screen sharing API
    setIsScreenSharing(!isScreenSharing);
    
    toast({
      title: !isScreenSharing 
        ? translate('videoConsultation', 'sharingScreen', language) || "Sharing Screen" 
        : translate('videoConsultation', 'stoppedSharing', language) || "Stopped Sharing",
    });
  };
  
  // Toggle speaker mute
  const toggleSpeaker = () => {
    setIsSpeakerMuted(!isSpeakerMuted);
    
    // In a real implementation, this would actually mute audio output
    if (remoteVideoRef.current) {
      remoteVideoRef.current.muted = !isSpeakerMuted;
    }
    
    toast({
      title: !isSpeakerMuted 
        ? translate('videoConsultation', 'speakerMuted', language) || "Speaker Muted" 
        : translate('videoConsultation', 'speakerUnmuted', language) || "Speaker Unmuted",
    });
  };
  
  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    
    // In a real implementation, this would actually change the volume
    if (remoteVideoRef.current) {
      remoteVideoRef.current.volume = value[0] / 100;
    }
  };
  
  // Toggle recording
  const toggleRecording = () => {
    // Implement recording logic here
    setIsRecording(!isRecording);
    
    toast({
      title: !isRecording 
        ? translate('videoConsultation', 'startedRecording', language) || "Started Recording" 
        : translate('videoConsultation', 'stoppedRecording', language) || "Stopped Recording",
    });
  };
  
  // Toggle full screen
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      videoContainerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };
  
  // End call handler
  const handleEndCall = () => {
    // Implement call ending logic here
    toast({
      title: translate('videoConsultation', 'callEnded', language) || "Call Ended",
      description: translate('videoConsultation', 'callDuration', language) || "Call duration: 00:15:33",
    });
    
    onEndCall();
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
          {translate('videoConsultation', 'connectionFailed', language) || "Connection Failed"}
        </h3>
        <p className="text-gray-600 text-center mb-6">
          {translate('videoConsultation', 'connectionFailedDesc', language) || 
            "We couldn't establish a connection. Please check your device permissions and internet connection."}
        </p>
        <div className="space-x-3">
          <Button onClick={() => window.location.reload()} variant="default">
            {translate('videoConsultation', 'tryAgain', language) || "Try Again"}
          </Button>
          <Button onClick={onEndCall} variant="outline">
            {translate('videoConsultation', 'cancel', language) || "Cancel"}
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative" ref={videoContainerRef}>
      {/* Main video area */}
      <div className="relative w-full h-96 bg-gray-900 rounded-lg overflow-hidden">
        {isConnecting ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
              <img src={doctorPhoto} alt={doctorName} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-white font-medium mb-1">{doctorName}</h3>
            <p className="text-gray-300 text-sm mb-4">
              {translate('videoConsultation', 'connecting', language) || "Connecting..."}
            </p>
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: '300ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: '600ms' }}></div>
            </div>
          </div>
        ) : (
          <>
            {/* Remote video (doctor) */}
            <video
              ref={remoteVideoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted={isSpeakerMuted}
              poster={doctorPhoto}
            />
            
            {/* Local video (user) - picture-in-picture */}
            <div className="absolute bottom-4 right-4 w-32 h-24 rounded-md overflow-hidden border-2 border-white shadow-lg">
              <video
                ref={localVideoRef}
                className={cn("w-full h-full object-cover", !isVideoEnabled && "hidden")}
                autoPlay
                playsInline
                muted
              />
              {!isVideoEnabled && (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <VideoOff className="h-6 w-6 text-white/70" />
                </div>
              )}
            </div>
            
            {/* Status indicators */}
            <div className="absolute top-4 left-4 flex items-center bg-black/30 text-white rounded-full px-3 py-1">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <span className="text-xs font-medium">
                {isRecording 
                  ? translate('videoConsultation', 'recording', language) || "Recording" 
                  : translate('videoConsultation', 'live', language) || "Live"}
              </span>
            </div>
            
            {/* Network quality */}
            <div className="absolute top-4 right-4 flex items-center bg-black/30 text-white rounded-full px-3 py-1">
              {getNetworkQualityIndicator()}
              <span className="text-xs font-medium ml-2">
                {networkQuality === 'high' 
                  ? translate('videoConsultation', 'goodConnection', language) || "Good Connection" 
                  : networkQuality === 'medium'
                    ? translate('videoConsultation', 'fairConnection', language) || "Fair Connection"
                    : translate('videoConsultation', 'poorConnection', language) || "Poor Connection"}
              </span>
            </div>
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
            onClick={toggleVideo}
            variant={isVideoEnabled ? "secondary" : "destructive"}
            size="sm"
            className="rounded-full w-10 h-10 p-0"
          >
            {isVideoEnabled ? <Camera className="h-5 w-5" /> : <CameraOff className="h-5 w-5" />}
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
          {translate('videoConsultation', 'endCall', language) || "End Call"}
        </Button>
        
        <div className="flex space-x-2">
          <Button
            onClick={toggleScreenSharing}
            variant={isScreenSharing ? "default" : "secondary"}
            size="sm"
            className="rounded-full w-10 h-10 p-0"
          >
            <Monitor className="h-5 w-5" />
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
            {translate('videoConsultation', 'settings', language) || "Call Settings"}
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="volume">
                    {translate('videoConsultation', 'volume', language) || "Volume"}
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
                    {translate('videoConsultation', 'recordCall', language) || "Record Call"}
                  </Label>
                  <Switch
                    id="recording"
                    checked={isRecording}
                    onCheckedChange={toggleRecording}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="fullscreen">
                    {translate('videoConsultation', 'fullScreen', language) || "Full Screen"}
                  </Label>
                  <Button
                    id="fullscreen"
                    variant="outline"
                    size="sm"
                    onClick={toggleFullScreen}
                  >
                    {translate('videoConsultation', 'toggle', language) || "Toggle"}
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-2">
                {translate('videoConsultation', 'connectionInfo', language) || "Connection Information"}
              </h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>
                  {translate('videoConsultation', 'quality', language) || "Quality"}: {" "}
                  <span className={networkQuality === 'high' 
                    ? 'text-green-500' 
                    : networkQuality === 'medium' 
                      ? 'text-yellow-500' 
                      : 'text-red-500'}>
                    {networkQuality === 'high' 
                      ? translate('videoConsultation', 'good', language) || "Good" 
                      : networkQuality === 'medium' 
                        ? translate('videoConsultation', 'fair', language) || "Fair" 
                        : translate('videoConsultation', 'poor', language) || "Poor"}
                  </span>
                </p>
                <p>
                  {translate('videoConsultation', 'resolution', language) || "Resolution"}: 720p
                </p>
                <p>
                  {translate('videoConsultation', 'encryption', language) || "Encryption"}: 
                  {" "}{translate('videoConsultation', 'enabled', language) || "Enabled"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
