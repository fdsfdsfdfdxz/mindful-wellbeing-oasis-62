
import { 
  MessageSquare, 
  PhoneCall, 
  Video, 
  Lock, 
  FileText, 
  Brain, 
  Users, 
  Heart, 
  BookOpen, 
  Clock 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const serviceData = [
  {
    title: "Private Online Consultations",
    description: "Connect with therapists through text chat, voice calls, or video sessions based on your comfort level.",
    icon: <MessageSquare className="h-10 w-10 text-calmBlue-500" />,
    iconBg: "bg-calmBlue-100",
    cta: "Book Session"
  },
  {
    title: "Anonymous Consultations",
    description: "Speak freely without revealing your identity. Our platform ensures complete privacy and confidentiality.",
    icon: <Lock className="h-10 w-10 text-calmBlue-500" />,
    iconBg: "bg-calmBlue-100",
    cta: "Start Anonymously"
  },
  {
    title: "Psychological Assessments",
    description: "Take standardized tests to better understand your mental health needs and get personalized recommendations.",
    icon: <FileText className="h-10 w-10 text-sageGreen-500" />,
    iconBg: "bg-sageGreen-100",
    cta: "Take Assessment"
  },
  {
    title: "Specialized Therapy Programs",
    description: "Targeted programs for depression, anxiety, stress, trauma, and other specific mental health concerns.",
    icon: <Brain className="h-10 w-10 text-sageGreen-500" />,
    iconBg: "bg-sageGreen-100",
    cta: "Explore Programs"
  },
  {
    title: "Marriage & Family Counseling",
    description: "Improve communication and resolve conflicts with your partner or family members through guided therapy.",
    icon: <Users className="h-10 w-10 text-warmNeutral-500" />,
    iconBg: "bg-warmNeutral-100",
    cta: "Family Solutions"
  },
  {
    title: "Self-Development Programs",
    description: "Build resilience, confidence, and emotional intelligence with structured development programs.",
    icon: <Heart className="h-10 w-10 text-warmNeutral-500" />,
    iconBg: "bg-warmNeutral-100",
    cta: "Start Growing"
  },
  {
    title: "Educational Resources",
    description: "Access a wealth of articles, videos, podcasts, and workshops on various mental health topics.",
    icon: <BookOpen className="h-10 w-10 text-calmBlue-500" />,
    iconBg: "bg-calmBlue-100",
    cta: "Browse Library"
  },
  {
    title: "Follow-up Care Plans",
    description: "Receive ongoing support with personalized care plans to track your progress and maintain well-being.",
    icon: <Clock className="h-10 w-10 text-sageGreen-500" />,
    iconBg: "bg-sageGreen-100",
    cta: "Learn More"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container-custom">
        <h2 className="section-title text-center">Our Mental Health Services</h2>
        <p className="section-subtitle text-center">
          Comprehensive support for your mental wellbeing, delivered by licensed professionals through our secure platform.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {serviceData.map((service, index) => (
            <Card key={index} className="card-hover border border-gray-100 h-full">
              <CardHeader className="pb-2">
                <div className={`${service.iconBg} p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4`}>
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 min-h-[80px]">
                  {service.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  {service.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
