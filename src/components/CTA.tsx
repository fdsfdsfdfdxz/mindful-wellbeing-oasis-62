
import { CalendarDays, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="py-20 bg-calmBlue-600 text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Your Mental Health Journey Today
          </h2>
          <p className="text-calmBlue-100 text-lg mb-10 max-w-2xl mx-auto">
            Take the first step toward better mental wellbeing. Our specialists are ready to support you through secure, confidential consultations tailored to your unique needs.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button 
              size="lg" 
              className="bg-white text-calmBlue-600 hover:bg-calmBlue-50 w-full sm:w-auto"
            >
              <CalendarDays className="mr-2 h-5 w-5" /> Book a Consultation
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-transparent border-white text-white hover:bg-calmBlue-700 w-full sm:w-auto"
            >
              <MessageSquare className="mr-2 h-5 w-5" /> Try Free Assessment
            </Button>
          </div>
          
          <p className="mt-8 text-calmBlue-200 text-sm">
            Need help choosing the right service? Contact our support team for guidance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
