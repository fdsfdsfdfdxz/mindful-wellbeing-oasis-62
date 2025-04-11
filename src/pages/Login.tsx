
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { translate } from "@/utils/translations";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Lock, ArrowRight } from "lucide-react";

const Login = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: translate('auth', 'error', language),
        description: translate('auth', 'allFieldsRequired', language),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      try {
        // Login with the auth context
        login(email);
        
        toast({
          title: translate('auth', 'loginSuccess', language),
          description: translate('auth', 'welcomeBack', language),
        });
        
        navigate("/");
      } catch (error) {
        console.error("Login error:", error);
        toast({
          title: translate('auth', 'error', language),
          description: translate('auth', 'invalidCredentials', language),
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {translate('auth', 'login', language)}
          </CardTitle>
          <CardDescription className="text-center">
            {translate('auth', 'enterCredentials', language)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{translate('auth', 'email', language)}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder={translate('auth', 'emailPlaceholder', language)}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">{translate('auth', 'password', language)}</Label>
                <a href="#" className="text-sm text-calmBlue-600 hover:text-calmBlue-700">
                  {translate('auth', 'forgotPassword', language)}
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder={translate('auth', 'passwordPlaceholder', language)}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-calmBlue-500 hover:bg-calmBlue-600"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                  {translate('auth', 'loggingIn', language)}
                </>
              ) : (
                <>
                  {translate('auth', 'login', language)}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            {translate('auth', 'noAccount', language)}{" "}
            <a href="#" className="font-medium text-calmBlue-600 hover:text-calmBlue-700">
              {translate('auth', 'registerNow', language)}
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
