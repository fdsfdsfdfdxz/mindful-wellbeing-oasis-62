
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface Practitioner {
  id: string;
  name: string;
  photo: string;
  rate: string;
}

export function usePractitionerData(practitionerId: string | null) {
  const [practitioner, setPractitioner] = useState<Practitioner | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchPractitioner = async () => {
      // In a real app, this would be an API call
      // For now, we'll use mock data
      const mockPractitioners = {
        "p1": { 
          id: "p1", 
          name: "Dr. Sarah Johnson",
          photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          rate: "$150/session"
        },
        "p2": {
          id: "p2",
          name: "Dr. Michael Chen",
          photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          rate: "$175/session"
        }
      };
      
      if (practitionerId && practitionerId in mockPractitioners) {
        setPractitioner(mockPractitioners[practitionerId as keyof typeof mockPractitioners]);
      } else {
        // Handle case where practitioner is not found
        toast({
          title: "Practitioner not found",
          description: "The requested practitioner could not be found.",
          variant: "destructive"
        });
        navigate("/practitioners");
      }
    };
    
    fetchPractitioner();
  }, [practitionerId, navigate, toast]);
  
  return { practitioner, isLoading };
}
