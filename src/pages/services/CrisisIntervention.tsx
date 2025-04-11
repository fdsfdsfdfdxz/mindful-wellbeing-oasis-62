
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShieldAlert,
  Phone,
  MessageSquare,
  Clock,
  Headphones,
  MapPin,
  FileText,
  AlertCircle,
  Shield,
  ArrowRight,
  CheckCircle2,
  ArrowLeft
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CrisisIntervention = () => {
  const { language, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [assessment, setAssessment] = useState({
    started: false,
    step: 1,
    totalSteps: 5,
    severity: "none" // none, low, medium, high
  });
  
  const startAssessment = () => {
    setAssessment({...assessment, started: true});
    
    toast({
      title: translate('crisis', 'assessmentStarted', language) || "Assessment Started",
      description: translate('crisis', 'assessmentDesc', language) || 
        "Answer a few questions to help us understand your situation better.",
      duration: 3000,
    });
  };
  
  const nextStep = () => {
    if (assessment.step < assessment.totalSteps) {
      setAssessment({...assessment, step: assessment.step + 1});
    } else {
      // Last step, simulate completing assessment and determining severity
      const randomSeverity = ["low", "medium", "high"][Math.floor(Math.random() * 3)];
      setAssessment({...assessment, severity: randomSeverity});
      
      toast({
        title: translate('crisis', 'assessmentComplete', language) || "Assessment Complete",
        description: translate('crisis', 'reviewingResponses', language) || 
          "We've reviewed your responses and provided recommended next steps.",
        duration: 3000,
      });
    }
  };
  
  const resetAssessment = () => {
    setAssessment({
      started: false,
      step: 1,
      totalSteps: 5,
      severity: "none"
    });
  };
  
  const handleEmergencyChat = () => {
    toast({
      title: translate('crisis', 'connectingSpecialist', language) || "Connecting With Specialist",
      description: translate('crisis', 'pleaseWait', language) || 
        "Please wait a moment while we connect you with an emergency specialist.",
      duration: 3000,
    });
    
    setTimeout(() => {
      navigate('/doctor-chat?crisis=true');
    }, 1500);
  };
  
  const handleSafetyPlan = () => {
    toast({
      title: translate('crisis', 'safetyPlan', language) || "Safety Plan",
      description: translate('crisis', 'safetyPlanCreated', language) || 
        "Your personalized safety plan has been created. You can access it anytime.",
      duration: 3000,
    });
  };

  return (
    <>
      <Navbar />
      <div className="container-custom py-16">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/#services')}
          className="mb-8"
        >
          <ArrowLeft className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {translate('common', 'backToServices', language) || "Back to Services"}
        </Button>
        
        <div className="text-center mb-12">
          <Badge variant="destructive" className="mb-4 px-3 py-1 text-base">
            <ShieldAlert className="h-4 w-4 mr-2" />
            {translate('crisis', '24Support', language) || "24/7 Emergency Support"}
          </Badge>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            {translate('crisis', 'title', language) || "Crisis Intervention & Support"}
          </h1>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            {translate('crisis', 'description', language) || 
            "Immediate support for mental health emergencies. Our trained specialists are available 24/7 to assist you during difficult moments."}
          </p>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1 text-left">
                <h2 className="text-xl font-bold text-red-800 mb-2">
                  {translate('crisis', 'emergencySituationTitle', language) || "In an Immediate Emergency:"}
                </h2>
                <p className="mb-3 text-red-700">
                  {translate('crisis', 'emergencySituationDesc', language) || 
                  "If you're in immediate danger or experiencing a life-threatening emergency:"}
                </p>
                <p className="font-bold text-red-800">Call emergency services: 911 (US) / 112 (EU) / 999 (UK)</p>
              </div>
              <div>
                <Button variant="destructive" size="lg" className="w-full md:w-auto">
                  <Phone className="mr-2 h-5 w-5" />
                  {translate('crisis', 'callEmergency', language) || "Call Emergency Services"}
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{assessment.started && assessment.severity === "none" ? 
                "Crisis Assessment" : "Crisis Support Options"}</CardTitle>
              <CardDescription>
                {assessment.started && assessment.severity === "none" ? 
                  "Help us understand your current situation" : 
                  "Choose the support option that best meets your needs"}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {!assessment.started && assessment.severity === "none" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-calmBlue-300 transition-colors">
                    <div className="bg-calmBlue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <FileText className="h-6 w-6 text-calmBlue-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Crisis Assessment</h3>
                    <p className="text-gray-600 mb-4">
                      Complete a brief assessment to determine appropriate support options for your situation.
                    </p>
                    <Button onClick={startAssessment} className="w-full">
                      Start Assessment
                    </Button>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-calmBlue-300 transition-colors">
                    <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <MessageSquare className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Emergency Chat</h3>
                    <p className="text-gray-600 mb-4">
                      Connect immediately with a crisis specialist through secure chat.
                    </p>
                    <Button onClick={handleEmergencyChat} variant="destructive" className="w-full">
                      Start Emergency Chat
                    </Button>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-calmBlue-300 transition-colors">
                    <div className="bg-amber-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <Headphones className="h-6 w-6 text-amber-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Crisis Helpline</h3>
                    <p className="text-gray-600 mb-4">
                      Speak directly with a trained crisis counselor on our dedicated helpline.
                    </p>
                    <Button variant="outline" className="w-full">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Crisis Helpline
                    </Button>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-calmBlue-300 transition-colors">
                    <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <Shield className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Safety Planning</h3>
                    <p className="text-gray-600 mb-4">
                      Create a personalized safety plan to help manage difficult situations.
                    </p>
                    <Button variant="outline" className="w-full" onClick={handleSafetyPlan}>
                      Create Safety Plan
                    </Button>
                  </div>
                </div>
              ) : assessment.severity === "none" ? (
                <div>
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Step {assessment.step} of {assessment.totalSteps}</span>
                      <span>{Math.round((assessment.step / assessment.totalSteps) * 100)}% Complete</span>
                    </div>
                    <Progress value={(assessment.step / assessment.totalSteps) * 100} className="h-2" />
                  </div>
                  
                  {/* Sample assessment questions - would be more comprehensive in a real app */}
                  <div className="mb-8">
                    {assessment.step === 1 && (
                      <div className="space-y-6">
                        <h3 className="font-bold text-lg">How would you rate your current distress level?</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <Button variant="outline" onClick={nextStep}>Low</Button>
                          <Button variant="outline" onClick={nextStep}>Moderate</Button>
                          <Button variant="outline" onClick={nextStep}>Severe</Button>
                        </div>
                      </div>
                    )}
                    
                    {assessment.step === 2 && (
                      <div className="space-y-6">
                        <h3 className="font-bold text-lg">Are you having thoughts of harming yourself?</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <Button variant="outline" onClick={nextStep}>No</Button>
                          <Button variant="outline" onClick={nextStep}>Yes</Button>
                        </div>
                      </div>
                    )}
                    
                    {assessment.step === 3 && (
                      <div className="space-y-6">
                        <h3 className="font-bold text-lg">Do you have a support person you can reach out to right now?</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <Button variant="outline" onClick={nextStep}>Yes</Button>
                          <Button variant="outline" onClick={nextStep}>No</Button>
                        </div>
                      </div>
                    )}
                    
                    {assessment.step === 4 && (
                      <div className="space-y-6">
                        <h3 className="font-bold text-lg">Have you experienced a recent traumatic event?</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <Button variant="outline" onClick={nextStep}>No</Button>
                          <Button variant="outline" onClick={nextStep}>Yes</Button>
                        </div>
                      </div>
                    )}
                    
                    {assessment.step === 5 && (
                      <div className="space-y-6">
                        <h3 className="font-bold text-lg">Are you currently using alcohol or substances to cope?</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <Button variant="outline" onClick={nextStep}>No</Button>
                          <Button variant="outline" onClick={nextStep}>Yes</Button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="ghost" onClick={resetAssessment}>
                      Cancel
                    </Button>
                    <Button disabled={assessment.step === assessment.totalSteps} onClick={nextStep}>
                      Next
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className={`p-4 rounded-lg ${
                    assessment.severity === "low" ? "bg-green-50 border border-green-200" :
                    assessment.severity === "medium" ? "bg-amber-50 border border-amber-200" :
                    "bg-red-50 border border-red-200"
                  }`}>
                    <h3 className={`font-bold text-lg ${
                      assessment.severity === "low" ? "text-green-800" :
                      assessment.severity === "medium" ? "text-amber-800" :
                      "text-red-800"
                    }`}>
                      {assessment.severity === "low" ? "Low Risk Assessment" :
                       assessment.severity === "medium" ? "Medium Risk Assessment" :
                       "High Risk Assessment"}
                    </h3>
                    <p className={`mt-2 ${
                      assessment.severity === "low" ? "text-green-700" :
                      assessment.severity === "medium" ? "text-amber-700" :
                      "text-red-700"
                    }`}>
                      {assessment.severity === "low" 
                        ? "Based on your responses, your situation appears to be manageable with appropriate support."
                        : assessment.severity === "medium"
                        ? "Your responses indicate moderate distress. We recommend reaching out for professional support."
                        : "Your responses indicate you may be in crisis. We strongly recommend immediate support."}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-bold text-lg">Recommended Next Steps:</h3>
                    
                    {assessment.severity === "low" && (
                      <>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                          <p>Schedule a regular counseling session</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                          <p>Access self-help resources in our library</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                          <p>Create a self-care plan</p>
                        </div>
                      </>
                    )}
                    
                    {assessment.severity === "medium" && (
                      <>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-amber-600 mt-0.5" />
                          <p>Connect with a counselor via chat or call</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-amber-600 mt-0.5" />
                          <p>Schedule an urgent counseling session</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-amber-600 mt-0.5" />
                          <p>Create a safety plan with professional guidance</p>
                        </div>
                      </>
                    )}
                    
                    {assessment.severity === "high" && (
                      <>
                        <div className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                          <p>Connect with a crisis specialist immediately</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                          <p>Consider contacting emergency services</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                          <p>Create an urgent safety plan with specialist support</p>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {assessment.severity === "low" ? (
                      <>
                        <Button onClick={() => navigate('/services/book-session')}>Schedule Counseling</Button>
                        <Button variant="outline" onClick={resetAssessment}>Start New Assessment</Button>
                      </>
                    ) : assessment.severity === "medium" ? (
                      <>
                        <Button variant="default" onClick={handleEmergencyChat}>Chat With Counselor</Button>
                        <Button variant="outline" onClick={resetAssessment}>Start New Assessment</Button>
                      </>
                    ) : (
                      <>
                        <Button variant="destructive" onClick={handleEmergencyChat}>
                          Connect With Crisis Specialist
                        </Button>
                        <Button variant="outline" onClick={resetAssessment}>Start New Assessment</Button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Crisis Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Local Emergency Services</h4>
                    <p className="text-sm text-gray-500">911 (US) / 112 (EU) / 999 (UK)</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">National Suicide Prevention Lifeline</h4>
                    <p className="text-sm text-gray-500">1-800-273-8255 (US)</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-start gap-3">
                  <MessageSquare className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Crisis Text Line</h4>
                    <p className="text-sm text-gray-500">Text HOME to 741741 (US)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">How Our Crisis Support Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-gray-100 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium">1</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    Assessment of your immediate needs and safety concerns
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-gray-100 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium">2</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    Immediate support and intervention by trained specialists
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-gray-100 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium">3</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    Development of a safety plan and coping strategies
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-gray-100 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium">4</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    Connection to ongoing care and follow-up support
                  </p>
                </div>
              </CardContent>
              
              <CardFooter className="pt-2">
                <Button variant="link" className="w-full justify-start p-0">
                  Learn more about our crisis protocols
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CrisisIntervention;
