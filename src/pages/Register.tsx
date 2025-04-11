
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { translate } from "@/utils/translations";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UserPlus, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Register = () => {
  const { language, isRTL } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form validation schema
  const formSchema = z.object({
    email: z.string().email({
      message: translate("auth", "invalidEmail", language) || "Invalid email address",
    }),
    password: z.string().min(8, {
      message: translate("auth", "passwordLength", language) || "Password must be at least 8 characters",
    }),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: translate("auth", "passwordsDoNotMatch", language) || "Passwords do not match",
    path: ["confirmPassword"],
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      
      // Simulate registration process delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful registration
      login(values.email);
      
      toast({
        title: translate("auth", "registrationSuccess", language) || "Registration Successful",
        description: translate("auth", "accountCreated", language) || "Your account has been created successfully.",
      });
      
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: translate("auth", "error", language) || "Error",
        description: translate("auth", "registrationFailed", language) || "Registration failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="container-custom py-8 flex-grow flex flex-col justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-sm max-w-md w-full">
          <div className="flex items-center mb-6">
            <Link to="/" className="text-gray-500 hover:text-gray-700 mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold">
              {translate("auth", "register", language) || "Register"}
            </h1>
          </div>
          
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-full bg-calmBlue-100">
              <UserPlus className="h-6 w-6 text-calmBlue-500" />
            </div>
          </div>
          
          <p className="text-gray-600 mb-6 text-center">
            {translate("auth", "createAccount", language) || "Create your account to access all features"}
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translate("auth", "email", language) || "Email"}</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={translate("auth", "emailPlaceholder", language) || "Enter your email"} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translate("auth", "password", language) || "Password"}</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder={translate("auth", "passwordPlaceholder", language) || "Enter your password"} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translate("auth", "confirmPassword", language) || "Confirm Password"}</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder={translate("auth", "confirmPasswordPlaceholder", language) || "Confirm your password"} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-calmBlue-500 hover:bg-calmBlue-600" disabled={isSubmitting}>
                {isSubmitting ? 
                  (translate("auth", "registering", language) || "Registering...") : 
                  (translate("auth", "register", language) || "Register")}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">
              {translate("auth", "alreadyHaveAccount", language) || "Already have an account?"}
            </span>{" "}
            <Link to="/login" className="text-calmBlue-600 hover:underline font-medium">
              {translate("auth", "login", language) || "Login"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
