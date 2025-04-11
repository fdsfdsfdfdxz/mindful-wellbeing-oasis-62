
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";
import { useToast } from "@/components/ui/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Users, 
  Heart, 
  CheckCircle2, 
  MessageSquare, 
  ArrowLeft,
  ClipboardList
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  goals: z.string().min(10, "Please describe your goals in at least 10 characters"),
  concerns: z.string().min(10, "Please describe your concerns in at least 10 characters"),
  previousTherapy: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const MarriageCounselingDetail = () => {
  const { language, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      goals: "",
      concerns: "",
      previousTherapy: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      toast({
        title: translate('services', 'requestSubmitted', language) || "Request Submitted",
        description: translate('services', 'counselorContact', language) || 
          "A relationship counselor will contact you within 24 hours to schedule your first session.",
      });
      
      setIsSubmitting(false);
      navigate('/services/marriage-counseling');
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <div className="container-custom py-16">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/services/marriage-counseling')}
          className="mb-8"
        >
          <ArrowLeft className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {translate('common', 'back', language) || "Back"}
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-6">
              {translate('services', 'relationshipConsultation', language) || "Relationship Consultation Intake"}
            </h1>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">What to Expect</h2>
              <p className="text-gray-600 mb-6">
                This consultation will help us understand your relationship needs and match you with the right specialist. 
                After submission, a counselor will contact you to schedule your first session.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-warmNeutral-100 rounded-full p-2 h-8 w-8 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="h-4 w-4 text-warmNeutral-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Initial Consultation</h3>
                    <p className="text-sm text-gray-600">Meet with a specialist to discuss your relationship needs and goals</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-warmNeutral-100 rounded-full p-2 h-8 w-8 flex items-center justify-center shrink-0 mt-1">
                    <Users className="h-4 w-4 text-warmNeutral-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Joint Sessions</h3>
                    <p className="text-sm text-gray-600">Schedule convenient multi-participant video counseling sessions</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-warmNeutral-100 rounded-full p-2 h-8 w-8 flex items-center justify-center shrink-0 mt-1">
                    <ClipboardList className="h-4 w-4 text-warmNeutral-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Progress Tracking</h3>
                    <p className="text-sm text-gray-600">Set and track relationship goals together</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-warmNeutral-100 rounded-full p-2 h-8 w-8 flex items-center justify-center shrink-0 mt-1">
                    <Heart className="h-4 w-4 text-warmNeutral-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Shared Exercises</h3>
                    <p className="text-sm text-gray-600">Complete relationship-building exercises and homework together</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="goals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What are your main goals for relationship counseling?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="E.g., Improve communication, resolve conflicts, rebuild trust..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="concerns"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What are your primary relationship concerns?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Please share the key challenges you're currently facing..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="previousTherapy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Previous therapy experience (optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Have you tried relationship counseling before? What worked or didn't work?"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end">
                  <Button type="submit" className="px-8" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Our Approach</h2>
              
              <p className="text-gray-600 mb-4">
                We use evidence-based methods including:
              </p>
              
              <div className="space-y-3 mb-6">
                <Badge variant="outline" className="bg-calmBlue-50 text-calmBlue-700 border-calmBlue-200 w-full justify-start py-1.5">
                  Gottman Method
                </Badge>
                <Badge variant="outline" className="bg-sageGreen-50 text-sageGreen-700 border-sageGreen-200 w-full justify-start py-1.5">
                  Emotionally Focused Therapy
                </Badge>
                <Badge variant="outline" className="bg-warmNeutral-50 text-warmNeutral-700 border-warmNeutral-200 w-full justify-start py-1.5">
                  Imago Relationship Therapy
                </Badge>
                <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200 w-full justify-start py-1.5">
                  Narrative Therapy
                </Badge>
              </div>
              
              <Separator className="my-5" />
              
              <div className="mb-5">
                <h3 className="font-medium mb-2">Session Format Options</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Joint video sessions</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Family group sessions</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Flexible scheduling</span>
                  </div>
                </div>
              </div>
              
              <Separator className="my-5" />
              
              <p className="text-sm text-gray-500 italic">
                All communications and sessions are 100% confidential and secure.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MarriageCounselingDetail;
