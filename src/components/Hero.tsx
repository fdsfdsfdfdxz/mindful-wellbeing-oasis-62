
import { Button } from "@/components/ui/button";
import { CalendarDays, MessageSquare } from "lucide-react";

const Hero = () => {
  return (
    <section className="hero-gradient py-20 md:py-28">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight animate-fade-in">
              Professional Mental Health Support at Your Fingertips
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Connect with licensed therapists and counselors online, from the comfort of your home. 
              Get the support you need, when you need it, with complete privacy and confidentiality.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Button className="button-primary w-full sm:w-auto" size="lg">
                <CalendarDays className="mr-2 h-5 w-5" /> Book Consultation
              </Button>
              <Button className="button-secondary w-full sm:w-auto" size="lg">
                <MessageSquare className="mr-2 h-5 w-5" /> Free Assessment
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Online therapy session" 
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
