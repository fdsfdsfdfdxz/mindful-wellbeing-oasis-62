
import { useNavigate } from 'react-router-dom';
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, MessageSquare, Calendar, LineChart, Bell } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const FollowupCare = () => {
  const { language, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleScheduleFollowUp = () => {
    toast({
      title: translate('services', 'followupScheduled', language) || "Follow-up Scheduled",
      description: translate('services', 'followupDesc', language) || 
        "Your follow-up care session has been scheduled. You'll receive a confirmation email shortly.",
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
        
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          {translate('services', 'followupTitle', language) || "Follow-up Care Program"}
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          {translate('services', 'followupDesc', language) || 
            "Continued support to maintain your mental wellness after completing initial treatment. Our follow-up care program ensures your progress continues and helps prevent relapse."}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Why Follow-up Care Matters</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-sageGreen-100 rounded-full p-3 h-12 w-12 flex items-center justify-center shrink-0">
                  <LineChart className="h-6 w-6 text-sageGreen-600" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Maintain Progress</h3>
                  <p className="text-gray-600">Regular check-ins help reinforce positive changes and prevent backsliding.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-sageGreen-100 rounded-full p-3 h-12 w-12 flex items-center justify-center shrink-0">
                  <Bell className="h-6 w-6 text-sageGreen-600" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Early Warning System</h3>
                  <p className="text-gray-600">Identify and address potential issues before they become significant problems.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-sageGreen-100 rounded-full p-3 h-12 w-12 flex items-center justify-center shrink-0">
                  <MessageSquare className="h-6 w-6 text-sageGreen-600" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Continued Support</h3>
                  <p className="text-gray-600">Access to your therapist when facing new challenges or stressful situations.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Button className="w-full" onClick={handleScheduleFollowUp}>
                Schedule Follow-Up Session
              </Button>
            </div>
          </div>
          
          <div>
            <div className="bg-sageGreen-50 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-bold mb-4">Our Follow-up Care Options</h2>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-2">
                    <Clock className="h-5 w-5 text-sageGreen-600 mr-3" />
                    <h3 className="font-bold">Monthly Check-ins</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Regular monthly sessions to review progress and adjust strategies as needed.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-2">
                    <MessageSquare className="h-5 w-5 text-sageGreen-600 mr-3" />
                    <h3 className="font-bold">Text Support</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Ongoing text-based communication with your therapist between sessions.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-2">
                    <LineChart className="h-5 w-5 text-sageGreen-600 mr-3" />
                    <h3 className="font-bold">Progress Tracking</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Digital tools to monitor your mood, habits, and overall mental wellbeing.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-2">
                    <Calendar className="h-5 w-5 text-sageGreen-600 mr-3" />
                    <h3 className="font-bold">On-demand Sessions</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Additional sessions when you need extra support during challenging times.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold mb-4">Follow-up Care Plans</h3>
              
              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-4">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">3-Month Plan</span>
                    <span className="text-sageGreen-600 font-medium">$199</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    3 monthly sessions, unlimited text support, progress tracking
                  </p>
                </div>
                
                <div className="border-b border-gray-100 pb-4">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">6-Month Plan</span>
                    <span className="text-sageGreen-600 font-medium">$349</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    6 monthly sessions, unlimited text support, progress tracking, 1 emergency session
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">12-Month Plan</span>
                    <span className="text-sageGreen-600 font-medium">$599</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    12 monthly sessions, unlimited text support, advanced analytics, 2 emergency sessions
                  </p>
                </div>
              </div>
              
              <Button className="w-full mt-6" onClick={handleScheduleFollowUp}>
                Learn More
              </Button>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">How Our Follow-up Care Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-sageGreen-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-sageGreen-700">1</span>
              </div>
              <h3 className="font-bold mb-2">Assessment</h3>
              <p className="text-gray-600 text-sm">
                Review your progress and create a personalized follow-up plan.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-sageGreen-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-sageGreen-700">2</span>
              </div>
              <h3 className="font-bold mb-2">Regular Check-ins</h3>
              <p className="text-gray-600 text-sm">
                Scheduled sessions to monitor progress and address concerns.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-sageGreen-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-sageGreen-700">3</span>
              </div>
              <h3 className="font-bold mb-2">Ongoing Support</h3>
              <p className="text-gray-600 text-sm">
                Access to resources and communication between sessions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-sageGreen-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-sageGreen-700">4</span>
              </div>
              <h3 className="font-bold mb-2">Progress Review</h3>
              <p className="text-gray-600 text-sm">
                Regular evaluation of your journey and adjustments as needed.
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Button onClick={handleScheduleFollowUp} className="px-8">
              {translate('services', 'learnMore', language) || "Learn More About Follow-up Care"}
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FollowupCare;
