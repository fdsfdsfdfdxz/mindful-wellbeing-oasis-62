
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
import MarriageCounselingDetail from "./pages/services/MarriageCounselingDetail";
import SupportGroups from "./pages/services/SupportGroups";
import CrisisIntervention from "./pages/services/CrisisIntervention";
import SelfDevelopment from "./pages/services/SelfDevelopment";
import EducationalResources from "./pages/services/EducationalResources";
import FollowupCare from "./pages/services/FollowupCare";

// Assessment & Therapeutic Programs Routes
import AssessmentLibrary from "./pages/assessments/AssessmentLibrary";
import AssessmentTaker from "./pages/assessments/AssessmentTaker";
import AssessmentResults from "./pages/assessments/AssessmentResults";
import TherapyPrograms from "./pages/therapy/TherapyPrograms";
import ProgramDetail from "./pages/therapy/ProgramDetail";
import SelfHelpResources from "./pages/therapy/SelfHelpResources";

// Practitioner Directory
import PractitionerDirectory from "./pages/practitioners/PractitionerDirectory";
import PractitionerProfile from "./pages/practitioners/PractitionerProfile";

// Admin Routes
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import PractitionersPage from "./pages/admin/PractitionersPage";
import ServicesPage from "./pages/admin/ServicesPage";
import AdminNotFound from "./pages/admin/NotFound";

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
                  <Route path="/services/marriage-counseling/detail" element={<MarriageCounselingDetail />} />
                  <Route path="/services/support-groups" element={<SupportGroups />} />
                  <Route path="/services/crisis-intervention" element={<CrisisIntervention />} />
                  <Route path="/services/self-development" element={<SelfDevelopment />} />
                  <Route path="/services/educational-resources" element={<EducationalResources />} />
                  <Route path="/services/followup-care" element={<FollowupCare />} />
                  
                  {/* Assessment Routes */}
                  <Route path="/assessments" element={<AssessmentLibrary />} />
                  <Route path="/assessments/:id" element={<AssessmentTaker />} />
                  <Route path="/assessments/results/:id" element={<AssessmentResults />} />
                  
                  {/* Therapy Program Routes */}
                  <Route path="/therapy/programs" element={<TherapyPrograms />} />
                  <Route path="/therapy/programs/:id" element={<ProgramDetail />} />
                  <Route path="/therapy/self-help" element={<SelfHelpResources />} />
                  
                  {/* Practitioner Directory Routes */}
                  <Route path="/practitioners" element={<PractitionerDirectory />} />
                  <Route path="/practitioners/:practitionerId" element={<PractitionerProfile />} />

                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="practitioners" element={<PractitionersPage />} />
                    <Route path="clients" element={<AdminNotFound />} />
                    <Route path="services" element={<ServicesPage />} />
                    <Route path="services/add" element={<AdminNotFound />} />
                    <Route path="services/categories" element={<AdminNotFound />} />
                    <Route path="appointments" element={<AdminNotFound />} />
                    <Route path="assessments" element={<AdminNotFound />} />
                    <Route path="communications" element={<AdminNotFound />} />
                    <Route path="content" element={<AdminNotFound />} />
                    <Route path="settings" element={<AdminNotFound />} />
                    <Route path="*" element={<AdminNotFound />} />
                  </Route>
                  
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </QueryClientProvider>
        </ServiceProvider>
      </AuthProvider>
    </LanguageProvider>
  </ThemeProvider>
);

export default App;
