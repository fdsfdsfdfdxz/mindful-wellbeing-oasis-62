
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  MessageSquare,
  Users,
  Video,
  Shield,
  Clock,
  ChevronRight,
  Lock,
  Info,
  UserCircle2,
  HeartHandshake,
  Brain,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Support group data for the page
const supportGroups = [
  {
    id: "anxiety-support",
    name: "Anxiety Support",
    description: "A safe space to discuss anxiety experiences and coping mechanisms.",
    participants: 24,
    nextSession: "2025-04-15T18:00:00",
    frequency: "Weekly on Tuesdays",
    type: "text",
    tags: ["Anxiety", "Stress", "Coping Skills"]
  },
  {
    id: "depression-healing",
    name: "Depression Healing Circle",
    description: "Connect with others experiencing depression in a supportive environment.",
    participants: 18,
    nextSession: "2025-04-13T17:30:00",
    frequency: "Weekly on Sundays",
    type: "video",
    tags: ["Depression", "Mood", "Support"]
  },
  {
    id: "grief-loss",
    name: "Grief & Loss",
    description: "For those navigating the complex journey through grief and loss.",
    participants: 15,
    nextSession: "2025-04-14T19:00:00",
    frequency: "Every Monday",
    type: "hybrid",
    tags: ["Grief", "Loss", "Healing"]
  },
  {
    id: "relationship-support",
    name: "Relationship Challenges",
    description: "Discuss relationship difficulties and receive peer support.",
    participants: 20,
    nextSession: "2025-04-16T20:00:00",
    frequency: "Bi-weekly on Wednesdays",
    type: "text",
    tags: ["Relationships", "Communication", "Boundaries"]
  },
  {
    id: "trauma-recovery",
    name: "Trauma Recovery",
    description: "A trauma-informed space for healing and recovery.",
    participants: 12,
    nextSession: "2025-04-17T18:30:00",
    frequency: "Weekly on Thursdays",
    type: "video",
    tags: ["Trauma", "PTSD", "Recovery"]
  },
  {
    id: "addiction-support",
    name: "Addiction Support",
    description: "For those dealing with addiction or supporting loved ones with addiction.",
    participants: 22,
    nextSession: "2025-04-12T16:00:00",
    frequency: "Twice weekly - Tue/Sat",
    type: "hybrid",
    tags: ["Addiction", "Recovery", "Support"]
  }
];

// Features for the support groups
const supportGroupFeatures = [
  {
    icon: <Shield className="h-6 w-6 text-calmBlue-600" />,
    title: "Anonymous Participation",
    description: "Join discussions using a pseudonym to maintain your privacy."
  },
  {
    icon: <MessageSquare className="h-6 w-6 text-calmBlue-600" />,
    title: "Moderated Conversations",
    description: "All groups are facilitated by qualified mental health professionals."
  },
  {
    icon: <Users className="h-6 w-6 text-calmBlue-600" />,
    title: "Community Support",
    description: "Connect with others who understand what you're going through."
  },
  {
    icon: <Video className="h-6 w-6 text-calmBlue-600" />,
    title: "Multiple Formats",
    description: "Choose between text-based, video, or hybrid support groups."
  },
  {
    icon: <Calendar className="h-6 w-6 text-calmBlue-600" />,
    title: "Regular Sessions",
    description: "Consistent meeting schedules to build continuity and trust."
  },
  {
    icon: <Lock className="h-6 w-6 text-calmBlue-600" />,
    title: "Confidential Environment",
    description: "What happens in the group stays in the group - guaranteed."
  }
];

const SupportGroups = () => {
  const { language, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isLoggedIn } = useAuth();
  const [joinedGroups, setJoinedGroups] = useState<string[]>([]);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const handleJoinGroup = (groupId: string) => {
    if (!isLoggedIn) {
      toast({
        title: translate('groups', 'loginRequired', language) || "Anonymous login required",
        description: translate('groups', 'loginToJoin', language) || 
          "Create a private anonymous account to join this group.",
      });
      navigate('/login?redirect=support-groups&anonymous=true');
      return;
    }
    
    if (joinedGroups.includes(groupId)) {
      toast({
        title: translate('groups', 'alreadyJoined', language) || "Already a member",
        description: translate('groups', 'alreadyJoinedDesc', language) || 
          "You are already a member of this group. Check your dashboard for the next session.",
      });
      return;
    }
    
    toast({
      title: translate('groups', 'groupJoined', language) || "Group joined successfully",
      description: translate('groups', 'groupJoinedDesc', language) || 
        "You've been added to the group. Details for the next session will be sent to your account.",
    });
    
    setJoinedGroups([...joinedGroups, groupId]);
  };
  
  const handleGroupSession = (groupId: string, type: string) => {
    if (!joinedGroups.includes(groupId)) {
      toast({
        title: translate('groups', 'joinFirst', language) || "Join the group first",
        description: translate('groups', 'joinFirstDesc', language) || 
          "You need to join this support group before accessing sessions.",
      });
      return;
    }
    
    navigate(`/support-groups/${groupId}/session`);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-calmBlue-50 to-white py-16">
        <div className="container-custom text-center mb-12">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-base bg-calmBlue-50 border-calmBlue-200 text-calmBlue-700">
            <Shield className="h-4 w-4 mr-2" />
            {translate('groups', 'privateAnonGroups', language) || "Private Anonymous Groups"}
          </Badge>
          
          <h1 className="text-4xl font-bold mb-6">
            {translate('groups', 'title', language) || "Anonymous Support Groups"}
          </h1>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            {translate('groups', 'description', language) || 
            "Connect with others facing similar challenges in a safe, moderated environment. All participants maintain anonymity while sharing experiences and support."}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button variant="outline" className="rounded-full">
              <Brain className="h-4 w-4 mr-2" />
              Mental Health
            </Button>
            <Button variant="outline" className="rounded-full">
              <HeartHandshake className="h-4 w-4 mr-2" />
              Relationships
            </Button>
            <Button variant="outline" className="rounded-full">
              <UserCircle2 className="h-4 w-4 mr-2" />
              Personal Growth
            </Button>
            <Button variant="outline" className="rounded-full bg-calmBlue-50 border-calmBlue-200 text-calmBlue-700">
              <Info className="h-4 w-4 mr-2" />
              How It Works
            </Button>
          </div>
        </div>
        
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {supportGroupFeatures.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm flex items-start gap-4">
                <div className="bg-calmBlue-50 p-3 rounded-full shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <h2 className="text-2xl font-bold mb-6">Available Support Groups</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {supportGroups.map((group) => (
              <Card key={group.id} className="overflow-hidden transition-all duration-300 hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <Badge variant={group.type === 'text' ? 'secondary' : group.type === 'video' ? 'default' : 'outline'}>
                      {group.type === 'text' ? (
                        <MessageSquare className="h-3 w-3 mr-1" />
                      ) : group.type === 'video' ? (
                        <Video className="h-3 w-3 mr-1" />
                      ) : (
                        <Users className="h-3 w-3 mr-1" />
                      )}
                      {group.type.charAt(0).toUpperCase() + group.type.slice(1)}
                    </Badge>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center text-sm text-gray-500">
                            <Users className="h-3 w-3 mr-1" />
                            {group.participants}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{group.participants} members in this group</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <CardTitle className="text-xl mt-2">{group.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{group.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="pb-2">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {group.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <div className="flex items-center text-gray-500">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Next Session:</span>
                      </div>
                      <span className="font-medium">{formatDate(group.nextSession)}</span>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center text-gray-500">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Frequency:</span>
                      </div>
                      <span>{group.frequency}</span>
                    </div>
                  </div>
                </CardContent>
                
                <Separator className="my-2" />
                
                <CardFooter className="pt-2">
                  {!joinedGroups.includes(group.id) ? (
                    <Button 
                      className="w-full"
                      onClick={() => handleJoinGroup(group.id)}
                    >
                      Join Group
                    </Button>
                  ) : (
                    <Button 
                      variant="outline"
                      className="w-full"
                      onClick={() => handleGroupSession(group.id, group.type)}
                    >
                      Enter Session
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="bg-calmBlue-50 border border-calmBlue-100 p-8 rounded-lg mb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Start Your Own Support Group</h3>
                <p className="text-gray-600 mb-4 md:mb-0">
                  Not finding what you need? Create a new support group focused on your specific concerns.
                </p>
              </div>
              <Button className="whitespace-nowrap group">
                <span>Create a Group</span>
                <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SupportGroups;
