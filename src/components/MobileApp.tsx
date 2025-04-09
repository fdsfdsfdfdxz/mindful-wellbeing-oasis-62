
import { Apple, PlaySquare, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  "Access your therapy sessions anywhere",
  "Secure messaging with your therapist",
  "Schedule appointments on the go",
  "Track your progress with mood journals",
  "Set reminders for exercises and practices",
  "Optional discreet app icon for privacy"
];

const MobileApp = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
            <h2 className="section-title mb-6 text-left">Take Your Mental Health Journey with You</h2>
            <p className="text-lg text-gray-600 mb-8">
              Our mobile app brings the full functionality of our platform to your smartphone, 
              allowing you to access support whenever and wherever you need it.
            </p>
            
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                className="bg-gray-900 hover:bg-black text-white flex items-center justify-center px-8"
                size="lg"
              >
                <Apple className="h-6 w-6 mr-2" />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-base font-medium">App Store</div>
                </div>
              </Button>
              
              <Button 
                className="bg-gray-900 hover:bg-black text-white flex items-center justify-center px-8"
                size="lg"
              >
                <PlaySquare className="h-6 w-6 mr-2" />
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-base font-medium">Google Play</div>
                </div>
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 transform translate-x-16">
              <img 
                src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Mobile app on smartphone" 
                className="rounded-xl shadow-2xl max-w-xs mx-auto"
              />
            </div>
            <div className="absolute top-1/4 -left-4 z-0">
              <img 
                src="https://images.unsplash.com/photo-1605236453806-6ff36851218e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Mobile app interface" 
                className="rounded-xl shadow-2xl max-w-xs opacity-70"
              />
            </div>
            <div className="absolute -bottom-4 right-0 z-20 hidden md:block">
              <div className="bg-warmNeutral-100 rounded-lg p-4 shadow-lg max-w-xs">
                <div className="flex items-start">
                  <div className="bg-calmBlue-500 rounded-full p-2 mr-3">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Privacy First Design</h4>
                    <p className="text-sm text-gray-600">
                      Optional discreet mode changes the app icon and name on your device for complete privacy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileApp;
