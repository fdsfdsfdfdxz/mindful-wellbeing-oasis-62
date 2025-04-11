
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ServiceProvider } from "./contexts/ServiceContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { SkipToContent } from "./components/accessibility/SkipToContent";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import DoctorChat from "./pages/DoctorChat";
import DoctorProfile from "./pages/DoctorProfile";
import BookSession from "./pages/services/BookSession";
import AnonymousConsultation from "./pages/services/AnonymousConsultation";
import PsychologicalAssessment from "./pages/services/PsychologicalAssessment";
import SpecializedTherapy from "./pages/services/SpecializedTherapy";
import MarriageCounseling from "./pages/services/MarriageCounseling";
import SelfDevelopment from "./pages/services/SelfDevelopment";
import EducationalResources from "./pages/services/EducationalResources";
import FollowupCare from "./pages/services/FollowupCare";
import LiveChat from "./components/LiveChat";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="system">
    <LanguageProvider>
      <AuthProvider>
        <ServiceProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <SkipToContent />
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/doctor-chat" element={<DoctorChat />} />
                  <Route path="/doctor/:doctorId" element={<DoctorProfile />} />
                  
                  {/* Service Routes */}
                  <Route path="/services/book-session" element={<BookSession />} />
                  <Route path="/services/anonymous-consultation" element={<AnonymousConsultation />} />
                  <Route path="/services/psychological-assessment" element={<PsychologicalAssessment />} />
                  <Route path="/services/specialized-therapy" element={<SpecializedTherapy />} />
                  <Route path="/services/marriage-counseling" element={<MarriageCounseling />} />
                  <Route path="/services/self-development" element={<SelfDevelopment />} />
                  <Route path="/services/educational-resources" element={<EducationalResources />} />
                  <Route path="/services/followup-care" element={<FollowupCare />} />
                  
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <LiveChat />
              </BrowserRouter>
            </TooltipProvider>
          </QueryClientProvider>
        </ServiceProvider>
      </AuthProvider>
    </LanguageProvider>
  </ThemeProvider>
);

export default App;
