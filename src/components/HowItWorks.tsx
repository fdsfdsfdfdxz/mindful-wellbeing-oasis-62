
import {
  UserPlus,
  ClipboardCheck,
  Search,
  Calendar,
  MessageSquare,
  Video,
  PhoneCall
} from "lucide-react";

const steps = [
  {
    icon: <UserPlus className="w-10 h-10 text-calmBlue-500" />,
    title: "Create an Account",
    description: "Sign up securely with enhanced privacy features to protect your personal information."
  },
  {
    icon: <ClipboardCheck className="w-10 h-10 text-calmBlue-500" />,
    title: "Complete Assessment",
    description: "Take an optional psychological assessment to help identify your specific needs."
  },
  {
    icon: <Search className="w-10 h-10 text-calmBlue-500" />,
    title: "Browse Specialists",
    description: "Explore our network of qualified therapists and choose one who matches your requirements."
  },
  {
    icon: <MessageSquare className="w-10 h-10 text-calmBlue-500" />,
    title: "Choose Consultation Type",
    description: "Select your preferred method: text chat, voice call, or video session."
  },
  {
    icon: <Calendar className="w-10 h-10 text-calmBlue-500" />,
    title: "Schedule & Pay",
    description: "Book your appointment at a convenient time and complete the secure payment process."
  },
  {
    icon: <Video className="w-10 h-10 text-calmBlue-500" />,
    title: "Attend Session",
    description: "Connect with your therapist through our secure platform for your scheduled session."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container-custom">
        <h2 className="section-title text-center">How It Works</h2>
        <p className="section-subtitle text-center">
          Getting the support you need is simple and straightforward with our easy-to-follow process.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center transition-transform hover:transform hover:scale-105">
              <div className="relative mb-6">
                <div className="absolute -inset-3 rounded-full bg-calmBlue-100 opacity-50"></div>
                <div className="relative">
                  {step.icon}
                </div>
                <div className="absolute -top-3 -right-3 bg-calmBlue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-gray-800 text-center">Consultation Methods</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-calmBlue-300 transition-colors">
              <MessageSquare className="w-10 h-10 text-calmBlue-500 mb-3" />
              <h4 className="text-lg font-medium mb-2">Text Chat</h4>
              <p className="text-gray-600 text-center text-sm">Communicate through secure messaging at your own pace.</p>
            </div>
            <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-calmBlue-300 transition-colors">
              <PhoneCall className="w-10 h-10 text-calmBlue-500 mb-3" />
              <h4 className="text-lg font-medium mb-2">Voice Call</h4>
              <p className="text-gray-600 text-center text-sm">Have private conversations with crystal-clear audio quality.</p>
            </div>
            <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-calmBlue-300 transition-colors">
              <Video className="w-10 h-10 text-calmBlue-500 mb-3" />
              <h4 className="text-lg font-medium mb-2">Video Session</h4>
              <p className="text-gray-600 text-center text-sm">Connect face-to-face for a more personal experience.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
