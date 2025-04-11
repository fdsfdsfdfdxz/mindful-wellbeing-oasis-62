
import { useNavigate } from 'react-router-dom';
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";
import { Button } from "@/components/ui/button";
import { CalendarDays, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BookSession = () => {
  const { language, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { toast } = useToast();

  const handleBooking = () => {
    if (!isLoggedIn) {
      toast({
        title: translate('services', 'loginRequired', language) || "Login Required",
        description: translate('services', 'loginToBook', language) || 
          "Please login to book a session with our therapists",
        duration: 3000,
      });
      navigate("/login", { state: { redirectAfter: '/services/book-session' } });
      return;
    }
    
    // If logged in, show success toast for now
    toast({
      title: translate('services', 'bookingSuccess', language) || "Session Booked",
      description: translate('services', 'bookingConfirmation', language) || 
        "Your session has been booked. You'll receive a confirmation email shortly.",
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
          {translate('services', 'bookSessionTitle', language) || "Book a Private Consultation"}
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          {translate('services', 'bookSessionDesc', language) || 
            "Schedule a one-on-one session with one of our experienced therapists. Choose a time that works for you and select your preferred communication method."}
        </p>
        
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4">
            {translate('services', 'availableSlots', language) || "Available Time Slots"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {[
              "Today, 2:00 PM - 3:00 PM",
              "Today, 4:30 PM - 5:30 PM",
              "Tomorrow, 10:00 AM - 11:00 AM",
              "Tomorrow, 1:00 PM - 2:00 PM",
              "Tomorrow, 3:30 PM - 4:30 PM",
              "May 14, 11:00 AM - 12:00 PM",
            ].map((slot, index) => (
              <div 
                key={index} 
                className="border border-gray-200 hover:border-calmBlue-500 p-4 rounded-lg cursor-pointer transition-colors"
                onClick={handleBooking}
              >
                <div className="flex items-center justify-between">
                  <span>{slot}</span>
                  <CalendarDays className="h-5 w-5 text-calmBlue-500" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <Button className="w-full md:w-auto" onClick={handleBooking}>
              <CalendarDays className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {translate('services', 'bookNext', language) || "Book Next Available"}
            </Button>
            
            <Button variant="outline" className="w-full md:w-auto">
              {translate('services', 'viewMoreSlots', language) || "View More Time Slots"}
            </Button>
          </div>
        </div>
        
        <div className="bg-calmBlue-50 p-8 rounded-lg">
          <h2 className="text-xl font-bold mb-4">
            {translate('services', 'whatToExpect', language) || "What to Expect"}
          </h2>
          
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <div className="bg-calmBlue-100 rounded-full p-1 mr-3 mt-1">
                <span className="block h-2 w-2 rounded-full bg-calmBlue-500"></span>
              </div>
              {translate('services', 'expectation1', language) || 
                "Initial assessment to understand your needs and goals"}
            </li>
            <li className="flex items-start">
              <div className="bg-calmBlue-100 rounded-full p-1 mr-3 mt-1">
                <span className="block h-2 w-2 rounded-full bg-calmBlue-500"></span>
              </div>
              {translate('services', 'expectation2', language) || 
                "Discussion about your concerns in a safe, confidential environment"}
            </li>
            <li className="flex items-start">
              <div className="bg-calmBlue-100 rounded-full p-1 mr-3 mt-1">
                <span className="block h-2 w-2 rounded-full bg-calmBlue-500"></span>
              </div>
              {translate('services', 'expectation3', language) || 
                "Development of a personalized plan for your mental wellbeing"}
            </li>
            <li className="flex items-start">
              <div className="bg-calmBlue-100 rounded-full p-1 mr-3 mt-1">
                <span className="block h-2 w-2 rounded-full bg-calmBlue-500"></span>
              </div>
              {translate('services', 'expectation4', language) || 
                "Guidance on techniques to help manage your specific challenges"}
            </li>
          </ul>
          
          <Button variant="link" className="p-0">
            {translate('services', 'learnMoreAboutProcess', language) || "Learn more about our consultation process"}
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookSession;
