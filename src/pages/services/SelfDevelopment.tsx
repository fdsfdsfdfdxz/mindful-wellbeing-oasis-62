
import { useNavigate } from 'react-router-dom';
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Target, Award, BarChart, Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SelfDevelopment = () => {
  const { language, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleWorkshopSelect = (workshop: string) => {
    toast({
      title: translate('services', 'workshopSelected', language) || "Workshop Selected",
      description: `You've registered for the ${workshop} workshop. Check your email for details.`,
      duration: 3000,
    });
  };

  const workshops = [
    {
      title: "Mindfulness Mastery",
      description: "Learn to be present and reduce stress through mindfulness practices.",
      duration: "4 weeks",
      upcoming: "May 15, 2023",
      icon: <Target className="h-8 w-8 text-purple-600" />
    },
    {
      title: "Building Resilience",
      description: "Develop strategies to bounce back from life's challenges.",
      duration: "6 weeks",
      upcoming: "May 20, 2023",
      icon: <Award className="h-8 w-8 text-blue-600" />
    },
    {
      title: "Personal Growth Planning",
      description: "Create an actionable plan for achieving your personal development goals.",
      duration: "8 weeks",
      upcoming: "June 5, 2023",
      icon: <BarChart className="h-8 w-8 text-green-600" />
    }
  ];

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
          {translate('services', 'selfDevelopmentTitle', language) || "Self-Development Workshops"}
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          {translate('services', 'selfDevelopmentDesc', language) || 
            "Transform your life through structured self-improvement workshops led by experienced facilitators. Our programs combine evidence-based techniques, peer support, and practical exercises."}
        </p>
        
        <div className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center">Upcoming Workshops</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {workshops.map((workshop, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="bg-gray-100 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
                  {workshop.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-2">{workshop.title}</h3>
                <p className="text-gray-600 mb-4">{workshop.description}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm">
                    <span className="font-medium w-24">Duration:</span>
                    <span>{workshop.duration}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="font-medium w-24">Starting:</span>
                    <span>{workshop.upcoming}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={() => handleWorkshopSelect(workshop.title)}
                >
                  Register Now
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Benefits of Our Workshops</h2>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="bg-warmNeutral-100 rounded-full p-2 h-10 w-10 flex items-center justify-center shrink-0">
                  <Star className="h-5 w-5 text-warmNeutral-600" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Expert Guidance</h3>
                  <p className="text-gray-600">Learn from licensed therapists and certified coaches who specialize in personal growth.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-warmNeutral-100 rounded-full p-2 h-10 w-10 flex items-center justify-center shrink-0">
                  <Star className="h-5 w-5 text-warmNeutral-600" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Community Support</h3>
                  <p className="text-gray-600">Connect with like-minded individuals on similar growth journeys for mutual encouragement.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-warmNeutral-100 rounded-full p-2 h-10 w-10 flex items-center justify-center shrink-0">
                  <Star className="h-5 w-5 text-warmNeutral-600" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Practical Tools</h3>
                  <p className="text-gray-600">Gain actionable techniques and strategies you can implement immediately in your daily life.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-warmNeutral-100 rounded-full p-2 h-10 w-10 flex items-center justify-center shrink-0">
                  <Star className="h-5 w-5 text-warmNeutral-600" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Lasting Change</h3>
                  <p className="text-gray-600">Our follow-up system ensures you maintain momentum and integrate new habits permanently.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Workshop Format</h2>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-bold mb-2">Live Group Sessions</h3>
                <p className="text-gray-600">Weekly interactive video sessions with your facilitator and group.</p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-bold mb-2">Practice Exercises</h3>
                <p className="text-gray-600">Daily activities to reinforce concepts and build new habits.</p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-bold mb-2">Community Discussion</h3>
                <p className="text-gray-600">Private forum access for sharing experiences and challenges.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">One-on-One Check-ins</h3>
                <p className="text-gray-600">Personal guidance sessions to address individual needs.</p>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
              <p className="text-center font-medium mb-2">Ready to start your personal growth journey?</p>
              <Button className="w-full" onClick={() => handleWorkshopSelect("Personal Growth")}>
                Start Growing Today
              </Button>
            </div>
          </div>
        </div>
        
        <div className="bg-warmNeutral-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">What Participants Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center text-amber-400 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="italic mb-4">
                "The mindfulness workshop gave me practical tools I use daily to manage anxiety. It's been transformative."
              </p>
              <p className="font-medium">- Sarah K.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center text-amber-400 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="italic mb-4">
                "I've attended many self-development programs, but this was the first that resulted in lasting change."
              </p>
              <p className="font-medium">- Michael T.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center text-amber-400 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="italic mb-4">
                "The community aspect was unexpected but ended up being one of the most valuable parts of the experience."
              </p>
              <p className="font-medium">- Alisha M.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SelfDevelopment;
