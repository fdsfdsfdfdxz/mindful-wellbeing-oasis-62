
import { Shield, Lock, UserX, Check, Eye, EyeOff } from "lucide-react";

const privacyFeatures = [
  {
    icon: <Lock className="h-10 w-10 text-calmBlue-500" />,
    title: "End-to-End Encryption",
    description: "All communications between you and your therapist are encrypted, ensuring that your conversations remain private and secure."
  },
  {
    icon: <UserX className="h-10 w-10 text-calmBlue-500" />,
    title: "Anonymous Consultation",
    description: "Option to receive therapy without revealing your identity, allowing you to speak freely about sensitive issues."
  },
  {
    icon: <Shield className="h-10 w-10 text-calmBlue-500" />,
    title: "HIPAA Compliance",
    description: "Our platform adheres to healthcare privacy standards, providing the same level of confidentiality as in-person therapy."
  },
  {
    icon: <EyeOff className="h-10 w-10 text-calmBlue-500" />,
    title: "Hidden App Feature",
    description: "Discreet app icon and name option on your device for additional privacy on shared or monitored devices."
  }
];

const complianceChecklist = [
  "Data encryption at rest and in transit",
  "Regular security audits and vulnerability testing",
  "Strict access controls for all staff members",
  "Secure data storage and backup systems",
  "Privacy-by-design approach to all features",
  "Transparent privacy policies and terms"
];

const Privacy = () => {
  return (
    <section id="privacy" className="py-20 bg-gray-50">
      <div className="container-custom">
        <h2 className="section-title text-center">Privacy & Security</h2>
        <p className="section-subtitle text-center">
          Your privacy is our priority. We implement comprehensive security measures to ensure your information and conversations remain confidential.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Our Privacy Commitment</h3>
            <div className="space-y-6">
              {privacyFeatures.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="shrink-0 bg-calmBlue-100 p-3 rounded-full h-16 w-16 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Data Protection Standards</h3>
              <ul className="space-y-3">
                {complianceChecklist.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-calmBlue-100 p-8 rounded-lg shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <Eye className="h-8 w-8 text-calmBlue-700" />
                <h3 className="text-2xl font-bold text-calmBlue-700">Your Data, Your Control</h3>
              </div>
              <p className="text-calmBlue-800 mb-4">
                We believe you should have complete control over your information. Access, download, or delete your data anytime through your account settings.
              </p>
              <button className="bg-white text-calmBlue-700 font-medium py-2 px-4 rounded-md hover:bg-calmBlue-50 transition-colors">
                Learn About Your Privacy Rights
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Privacy;
