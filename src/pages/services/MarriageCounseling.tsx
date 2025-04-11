
import { useNavigate } from 'react-router-dom';
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, MessageSquare, Users, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const MarriageCounseling = () => {
  const { language, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleBooking = () => {
    toast({
      title: translate('services', 'counselingRequest', language) || "Request Received",
      description: translate('services', 'counselingRequestDesc', language) || 
        "Your request for marriage counseling has been submitted. A therapist specializing in relationship counseling will contact you shortly.",
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
          {translate('services', 'marriageCounselingTitle', language) || "Marriage & Relationship Counseling"}
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          {translate('services', 'marriageCounselingDesc', language) || 
            "Expert guidance to strengthen your relationship, improve communication, and resolve conflicts. Our therapists specialize in helping couples build healthier, more fulfilling partnerships."}
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">How We Help Couples</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-warmNeutral-100 rounded-full p-3 h-12 w-12 flex items-center justify-center shrink-0">
                  <MessageSquare className="h-6 w-6 text-warmNeutral-600" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Improve Communication</h3>
                  <p className="text-gray-600">Learn effective communication strategies to express needs, feelings, and concerns constructively.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-warmNeutral-100 rounded-full p-3 h-12 w-12 flex items-center justify-center shrink-0">
                  <Heart className="h-6 w-6 text-warmNeutral-600" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Rebuild Intimacy</h3>
                  <p className="text-gray-600">Reconnect emotionally and physically through guided exercises and practices.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-warmNeutral-100 rounded-full p-3 h-12 w-12 flex items-center justify-center shrink-0">
                  <Users className="h-6 w-6 text-warmNeutral-600" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Resolve Conflicts</h3>
                  <p className="text-gray-600">Identify destructive patterns and learn healthy conflict resolution techniques.</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 mt-8 pt-8">
              <h3 className="font-bold mb-4">Our Approach</h3>
              <p className="text-gray-600 mb-4">
                We use evidence-based approaches including the Gottman Method, Emotionally Focused Therapy (EFT), and Imago Relationship Therapy to help couples create lasting positive change.
              </p>
              <Button onClick={handleBooking} className="w-full">
                Request Family Solutions
              </Button>
            </div>
          </div>
          
          <div>
            <img 
              src="https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Couple holding hands in therapy" 
              className="w-full h-64 object-cover rounded-lg shadow-md mb-8"
            />
            
            <div className="bg-warmNeutral-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Common Issues We Address</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold text-warmNeutral-700">Communication Breakdown</h3>
                  <p className="text-sm text-gray-600 mt-1">Rebuilding effective dialogue patterns</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold text-warmNeutral-700">Trust Issues</h3>
                  <p className="text-sm text-gray-600 mt-1">Repairing and restoring broken trust</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold text-warmNeutral-700">Intimacy Challenges</h3>
                  <p className="text-sm text-gray-600 mt-1">Reconnecting physically and emotionally</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold text-warmNeutral-700">Parenting Conflicts</h3>
                  <p className="text-sm text-gray-600 mt-1">Creating united parenting approaches</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold text-warmNeutral-700">Life Transitions</h3>
                  <p className="text-sm text-gray-600 mt-1">Navigating major life changes together</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold text-warmNeutral-700">Pre-marital Preparation</h3>
                  <p className="text-sm text-gray-600 mt-1">Building strong foundations for marriage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">What to Expect</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-warmNeutral-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-warmNeutral-700">1</span>
              </div>
              <h3 className="font-bold mb-2">Initial Assessment</h3>
              <p className="text-gray-600 text-sm">
                Meet with a therapist to discuss your relationship history, current challenges, and goals for therapy.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-warmNeutral-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-warmNeutral-700">2</span>
              </div>
              <h3 className="font-bold mb-2">Customized Plan</h3>
              <p className="text-gray-600 text-sm">
                Your therapist will create a personalized plan addressing your specific relationship needs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-warmNeutral-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-warmNeutral-700">3</span>
              </div>
              <h3 className="font-bold mb-2">Regular Sessions</h3>
              <p className="text-gray-600 text-sm">
                Attend weekly or biweekly sessions to work through challenges and build relationship skills.
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Button onClick={handleBooking} className="px-8">
              <Calendar className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {translate('services', 'scheduleConsultation', language) || "Schedule a Consultation"}
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MarriageCounseling;
