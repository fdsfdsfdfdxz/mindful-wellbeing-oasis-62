
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Specialists from "@/components/Specialists";
import Privacy from "@/components/Privacy";
import Plans from "@/components/Plans";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import MobileApp from "@/components/MobileApp";
import Footer from "@/components/Footer";
import LiveChat from "@/components/LiveChat";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Services />
      <HowItWorks />
      <Specialists />
      <Privacy />
      <Plans />
      <Testimonials />
      <MobileApp />
      <CTA />
      <Footer />
      <LiveChat />
    </div>
  );
};

export default Index;
