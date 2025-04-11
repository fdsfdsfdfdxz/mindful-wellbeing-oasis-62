
import { useNavigate } from 'react-router-dom';
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock, Shield, UserX } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AnonymousConsultation = () => {
  const { language, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStart = () => {
    toast({
      title: translate('services', 'anonConsultStarted', language) || "Anonymous Session Created",
      description: translate('services', 'anonConsultDesc', language) || 
        "Your anonymous consultation has been initiated. You'll be matched with a therapist shortly.",
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
          {translate('services', 'anonymousTitle', language) || "Anonymous Consultations"}
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          {translate('services', 'anonymousDesc', language) || 
            "Get professional support without revealing your identity. Our platform ensures your privacy while providing quality mental health guidance."}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-calmBlue-100 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
              <UserX className="h-7 w-7 text-calmBlue-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Identity Protection</h3>
            <p className="text-gray-600">
              Create an anonymous profile with a pseudonym. No personal identification required.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-calmBlue-100 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
              <Lock className="h-7 w-7 text-calmBlue-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Encrypted Communication</h3>
            <p className="text-gray-600">
              All messages are end-to-end encrypted. Your conversations remain confidential.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-calmBlue-100 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
              <Shield className="h-7 w-7 text-calmBlue-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Privacy Guarantee</h3>
            <p className="text-gray-600">
              Private payment options and strict non-disclosure policies protect your anonymity.
            </p>
          </div>
        </div>
        
        <div className="bg-calmBlue-50 p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-bold mb-4">How Anonymous Consultations Work</h2>
          
          <ol className="space-y-6 mb-6">
            <li className="flex">
              <span className="bg-calmBlue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">1</span>
              <div>
                <h3 className="font-bold mb-1">Create an anonymous profile</h3>
                <p className="text-gray-600">Generate a secure profile using only a pseudonym and anonymous email if desired.</p>
              </div>
            </li>
            
            <li className="flex">
              <span className="bg-calmBlue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">2</span>
              <div>
                <h3 className="font-bold mb-1">Select your concerns</h3>
                <p className="text-gray-600">Choose the areas you'd like to discuss, so we can match you with an appropriate specialist.</p>
              </div>
            </li>
            
            <li className="flex">
              <span className="bg-calmBlue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">3</span>
              <div>
                <h3 className="font-bold mb-1">Connect with your therapist</h3>
                <p className="text-gray-600">Communicate via text, voice, or video - whichever maintains your desired level of anonymity.</p>
              </div>
            </li>
            
            <li className="flex">
              <span className="bg-calmBlue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">4</span>
              <div>
                <h3 className="font-bold mb-1">Receive professional support</h3>
                <p className="text-gray-600">Get the same quality guidance as traditional therapy, without revealing your identity.</p>
              </div>
            </li>
          </ol>
          
          <div className="flex justify-center mt-8">
            <Button onClick={handleStart} className="px-10">
              <Lock className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {translate('services', 'startAnon', language) || "Start Anonymously"}
            </Button>
          </div>
        </div>
        
        <div className="border border-gray-200 p-6 rounded-lg bg-white">
          <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-bold">Is anonymous therapy as effective as regular therapy?</h3>
              <p className="text-gray-600 mt-1">
                Yes. Research shows that anonymous therapy can be equally effective, especially for those who might otherwise avoid seeking help due to privacy concerns or stigma.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold">How do you ensure my identity stays protected?</h3>
              <p className="text-gray-600 mt-1">
                We use advanced encryption, don't require personal information, offer anonymous payment options, and have strict data handling policies.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold">Can I switch to regular identified therapy later?</h3>
              <p className="text-gray-600 mt-1">
                Yes, you can transition to standard therapy at any time while maintaining the relationship with your current therapist, if you choose to reveal your identity.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AnonymousConsultation;
