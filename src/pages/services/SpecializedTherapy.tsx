
import { useNavigate } from 'react-router-dom';
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Brain, BarChart, Heart, BookOpen } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SpecializedTherapy = () => {
  const { language, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleProgramClick = (programName: string) => {
    toast({
      title: translate('services', 'programSelected', language) || "Program Selected",
      description: `You've selected the ${programName} program. A specialist will contact you soon.`,
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
          {translate('services', 'specializedTherapyTitle', language) || "Specialized Therapy Programs"}
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          {translate('services', 'specializedTherapyDesc', language) || 
            "Targeted therapeutic approaches designed for specific mental health challenges. Our specialized programs combine evidence-based techniques with personalized care."}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
              <Brain className="h-7 w-7 text-blue-600" />
            </div>
            
            <h3 className="text-xl font-bold mb-2">Anxiety Management</h3>
            
            <p className="text-gray-600 mb-4">
              A structured program to help you understand anxiety triggers and develop effective coping strategies.
            </p>
            
            <ul className="text-sm space-y-2 mb-6">
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></div>
                <span>Cognitive Behavioral Therapy (CBT) techniques</span>
              </li>
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></div>
                <span>Mindfulness and relaxation training</span>
              </li>
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></div>
                <span>Exposure therapy when appropriate</span>
              </li>
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></div>
                <span>8-week structured program</span>
              </li>
            </ul>
            
            <Button className="w-full" onClick={() => handleProgramClick("Anxiety Management")}>
              Learn More
            </Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-purple-100 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
              <BarChart className="h-7 w-7 text-purple-600" />
            </div>
            
            <h3 className="text-xl font-bold mb-2">Depression Recovery</h3>
            
            <p className="text-gray-600 mb-4">
              A comprehensive approach to managing depression symptoms and rebuilding emotional resilience.
            </p>
            
            <ul className="text-sm space-y-2 mb-6">
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-600 mr-2"></div>
                <span>Behavioral activation techniques</span>
              </li>
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-600 mr-2"></div>
                <span>Negative thought pattern identification</span>
              </li>
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-600 mr-2"></div>
                <span>Lifestyle and wellness coaching</span>
              </li>
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-600 mr-2"></div>
                <span>12-week progressive program</span>
              </li>
            </ul>
            
            <Button className="w-full" onClick={() => handleProgramClick("Depression Recovery")}>
              Learn More
            </Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-green-100 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
              <Heart className="h-7 w-7 text-green-600" />
            </div>
            
            <h3 className="text-xl font-bold mb-2">Trauma Recovery</h3>
            
            <p className="text-gray-600 mb-4">
              A trauma-informed approach to healing, focusing on safety, empowerment, and resilience building.
            </p>
            
            <ul className="text-sm space-y-2 mb-6">
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-green-600 mr-2"></div>
                <span>EMDR therapy options</span>
              </li>
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-green-600 mr-2"></div>
                <span>Somatic experiencing techniques</span>
              </li>
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-green-600 mr-2"></div>
                <span>Safe emotional processing</span>
              </li>
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-green-600 mr-2"></div>
                <span>Personalized duration based on needs</span>
              </li>
            </ul>
            
            <Button className="w-full" onClick={() => handleProgramClick("Trauma Recovery")}>
              Learn More
            </Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-orange-100 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
              <BookOpen className="h-7 w-7 text-orange-600" />
            </div>
            
            <h3 className="text-xl font-bold mb-2">Stress Management</h3>
            
            <p className="text-gray-600 mb-4">
              Learn effective techniques to reduce stress and create a more balanced life.
            </p>
            
            <ul className="text-sm space-y-2 mb-6">
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-600 mr-2"></div>
                <span>Time management and prioritization</span>
              </li>
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-600 mr-2"></div>
                <span>Relaxation and mindfulness practice</span>
              </li>
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-600 mr-2"></div>
                <span>Boundary setting techniques</span>
              </li>
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-600 mr-2"></div>
                <span>6-week program with ongoing support</span>
              </li>
            </ul>
            
            <Button className="w-full" onClick={() => handleProgramClick("Stress Management")}>
              Learn More
            </Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-red-100 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
              <Brain className="h-7 w-7 text-red-600" />
            </div>
            
            <h3 className="text-xl font-bold mb-2">ADHD Management</h3>
            
            <p className="text-gray-600 mb-4">
              Develop strategies for executive functioning and attention control.
            </p>
            
            <ul className="text-sm space-y-2 mb-6">
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-red-600 mr-2"></div>
                <span>Organizational and planning systems</span>
              </li>
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-red-600 mr-2"></div>
                <span>Focus enhancement techniques</span>
              </li>
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-red-600 mr-2"></div>
                <span>Emotional regulation strategies</span>
              </li>
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-red-600 mr-2"></div>
                <span>10-week comprehensive program</span>
              </li>
            </ul>
            
            <Button className="w-full" onClick={() => handleProgramClick("ADHD Management")}>
              Learn More
            </Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-teal-100 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
              <Heart className="h-7 w-7 text-teal-600" />
            </div>
            
            <h3 className="text-xl font-bold mb-2">Grief Counseling</h3>
            
            <p className="text-gray-600 mb-4">
              Support through the grieving process with compassionate guidance.
            </p>
            
            <ul className="text-sm space-y-2 mb-6">
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-teal-600 mr-2"></div>
                <span>Understanding grief stages</span>
              </li>
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-teal-600 mr-2"></div>
                <span>Processing difficult emotions</span>
              </li>
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-teal-600 mr-2"></div>
                <span>Creating meaningful rituals</span>
              </li>
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-teal-600 mr-2"></div>
                <span>Flexible duration based on individual needs</span>
              </li>
            </ul>
            
            <Button className="w-full" onClick={() => handleProgramClick("Grief Counseling")}>
              Learn More
            </Button>
          </div>
        </div>
        
        <div className="bg-calmBlue-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Program Effectiveness</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-calmBlue-600 mb-2">87%</div>
              <p className="text-sm">of clients report significant improvement after completing our specialized programs</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-calmBlue-600 mb-2">94%</div>
              <p className="text-sm">would recommend our specialized therapy programs to friends or family</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-calmBlue-600 mb-2">8/10</div>
              <p className="text-sm">clients maintain improvements in follow-up assessments 6 months later</p>
            </div>
          </div>
          
          <div className="text-center">
            <Button onClick={() => navigate('/#specialists')}>
              Find a Specialist for Your Needs
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SpecializedTherapy;
