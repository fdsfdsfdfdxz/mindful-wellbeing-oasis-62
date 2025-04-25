
import { 
  MessageSquare, PhoneCall, Video, Lock, FileText, 
  Brain, Users, Heart, BookOpen, Clock, Shield, 
  HeartHandshake, ShieldAlert
} from "lucide-react";
import { ServiceCategoryData } from "@/types/service";

export const servicesData: ServiceCategoryData[] = [
  {
    title: "Professional Consultations",
    description: "Connect with our mental health professionals through various consultation formats",
    services: [
      {
        id: "private",
        title: "Private Consultations",
        description: "One-on-one sessions with experienced therapists.",
        icon: <MessageSquare className="h-10 w-10 text-calmBlue-500" />,
        iconBg: "bg-calmBlue-100",
        link: "/services/book-session",
        badges: ["Secure Chat", "File Sharing"],
        benefits: ["Secure Chat", "File Sharing"]
      },
      {
        id: "anonymous",
        title: "Anonymous Consultations",
        description: "Get support without revealing your identity.",
        icon: <Lock className="h-10 w-10 text-calmBlue-500" />,
        iconBg: "bg-calmBlue-100",
        link: "/services/anonymous-consultation",
        badges: ["Anonymous", "No Registration"],
        benefits: ["Anonymous", "No Registration"]
      },
      {
        id: "audio",
        title: "Audio Consultations",
        description: "Voice-based therapy sessions for your comfort.",
        icon: <PhoneCall className="h-10 w-10 text-sageGreen-500" />,
        iconBg: "bg-sageGreen-100",
        link: "/doctor-chat?appointment=audio",
        badges: ["End-to-end encrypted", "Low bandwidth"],
        benefits: ["End-to-end encrypted", "Low bandwidth"]
      }
    ]
  },
  {
    title: "Specialized Care",
    description: "Targeted support for specific needs and situations",
    services: [
      {
        id: "promoCode",
        title: "Marriage Counseling",
        description: "Strengthen your relationship with expert guidance.",
        icon: <Heart className="h-10 w-10 text-red-500" />,
        iconBg: "bg-red-100",
        link: "/services/marriage-counseling",
        badges: ["Couples", "Family"],
        benefits: ["Couples", "Family"],
        isNew: true
      },
      {
        id: "promoCode",
        title: "Support Groups",
        description: "Join moderated group sessions for shared experiences.",
        icon: <Users className="h-10 w-10 text-indigo-500" />,
        iconBg: "bg-indigo-100",
        link: "/services/support-groups",
        badges: ["Anonymous", "Moderated"],
        benefits: ["Anonymous", "Moderated"],
        isNew: true
      },
      {
        id: "promoCode",
        title: "Crisis Support",
        description: "24/7 emergency mental health support.",
        icon: <ShieldAlert className="h-10 w-10 text-red-500" />,
        iconBg: "bg-red-100",
        link: "/services/crisis-intervention",
        badges: ["24/7", "Emergency"],
        benefits: ["24/7", "Emergency"],
        isNew: true
      }
    ]
  },
  {
    title: "Assessment & Resources",
    description: "Tools and resources for understanding and improving your mental health",
    services: [
      {
        id: "promoCode",
        title: "Psychological Assessments",
        description: "Understand your mental state with detailed evaluations.",
        icon: <FileText className="h-10 w-10 text-sageGreen-500" />,
        iconBg: "bg-sageGreen-100",
        link: "/services/psychological-assessment",
        badges: ["Evidence-based"],
        benefits: ["Evidence-based"]
      },
      {
        id: "promoCode",
        title: "Educational Resources",
        description: "Access articles, guides, and videos on mental health.",
        icon: <BookOpen className="h-10 w-10 text-calmBlue-500" />,
        iconBg: "bg-calmBlue-100",
        link: "/services/educational-resources",
        badges: ["Research-backed"],
        benefits: ["Research-backed"]
      },
      {
        id: "promoCode",
        title: "Follow-up Care",
        description: "Continued support to maintain your mental wellness.",
        icon: <Clock className="h-10 w-10 text-sageGreen-500" />,
        iconBg: "bg-sageGreen-100",
        link: "/services/followup-care",
        badges: ["Continuous Support"],
        benefits: ["Continuous Support"]
      }
    ]
  }
];
