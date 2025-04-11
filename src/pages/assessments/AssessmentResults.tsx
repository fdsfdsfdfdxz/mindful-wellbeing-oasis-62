
import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Download, Share2, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

type ResultCategory = "minimal" | "mild" | "moderate" | "severe";

interface ResultInterpretation {
  category: ResultCategory;
  title: string;
  description: string;
  recommendations: string[];
  color: string;
}

const anxietyInterpretations: Record<ResultCategory, ResultInterpretation> = {
  minimal: {
    category: "minimal",
    title: "Minimal Anxiety",
    description: "Your responses suggest minimal symptoms of anxiety.",
    recommendations: [
      "Continue practicing self-care",
      "Maintain healthy lifestyle habits",
      "Practice mindfulness occasionally"
    ],
    color: "bg-green-100 text-green-800"
  },
  mild: {
    category: "mild",
    title: "Mild Anxiety",
    description: "Your responses suggest mild symptoms of anxiety.",
    recommendations: [
      "Regular mindfulness practice",
      "Breathing exercises when feeling stressed",
      "Maintain regular sleep schedule",
      "Consider using self-help resources"
    ],
    color: "bg-blue-100 text-blue-800"
  },
  moderate: {
    category: "moderate",
    title: "Moderate Anxiety",
    description: "Your responses suggest moderate symptoms of anxiety that may benefit from professional support.",
    recommendations: [
      "Consider scheduling a consultation with a mental health professional",
      "Daily mindfulness and relaxation practice",
      "Regular physical activity",
      "Identify and manage stress triggers",
      "Explore our CBT-based anxiety program"
    ],
    color: "bg-yellow-100 text-yellow-800"
  },
  severe: {
    category: "severe",
    title: "Severe Anxiety",
    description: "Your responses suggest severe anxiety symptoms. Professional support is recommended.",
    recommendations: [
      "Schedule an appointment with a mental health professional soon",
      "Consider our 'Managing Severe Anxiety' program",
      "Practice grounding techniques for immediate relief",
      "Establish a consistent self-care routine",
      "Maintain social connections and support"
    ],
    color: "bg-red-100 text-red-800"
  }
};

const depressionInterpretations: Record<ResultCategory, ResultInterpretation> = {
  minimal: {
    category: "minimal",
    title: "Minimal Depression",
    description: "Your responses suggest minimal symptoms of depression.",
    recommendations: [
      "Continue practicing self-care",
      "Maintain social connections",
      "Engage in enjoyable activities"
    ],
    color: "bg-green-100 text-green-800"
  },
  mild: {
    category: "mild",
    title: "Mild Depression",
    description: "Your responses suggest mild symptoms of depression.",
    recommendations: [
      "Regular physical activity",
      "Maintain social connections",
      "Practice gratitude journaling",
      "Consider using self-help resources"
    ],
    color: "bg-blue-100 text-blue-800"
  },
  moderate: {
    category: "moderate",
    title: "Moderate Depression",
    description: "Your responses suggest moderate symptoms of depression that may benefit from professional support.",
    recommendations: [
      "Consider scheduling a consultation with a mental health professional",
      "Regular physical activity",
      "Establish daily routines",
      "Practice self-compassion",
      "Explore our mood management program"
    ],
    color: "bg-yellow-100 text-yellow-800"
  },
  severe: {
    category: "severe",
    title: "Severe Depression",
    description: "Your responses suggest severe depression symptoms. Professional support is recommended.",
    recommendations: [
      "Schedule an appointment with a mental health professional soon",
      "Consider our 'Depression Recovery' program",
      "Establish daily structure and routines",
      "Engage support from trusted friends or family",
      "Practice small acts of self-care daily"
    ],
    color: "bg-red-100 text-red-800"
  }
};

const AssessmentResults = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("summary");
  
  const score = parseInt(searchParams.get("score") || "0");
  const assessmentType = id?.includes("anxiety") ? "anxiety" : id?.includes("depression") ? "depression" : "general";
  
  // Determine result category based on score and assessment type
  const getResultInterpretation = (): ResultInterpretation => {
    const interpretations = 
      assessmentType === "anxiety" ? anxietyInterpretations : 
      assessmentType === "depression" ? depressionInterpretations : 
      anxietyInterpretations;
      
    if (score <= 4) return interpretations.minimal;
    if (score <= 9) return interpretations.mild;
    if (score <= 14) return interpretations.moderate;
    return interpretations.severe;
  };
  
  const resultInterpretation = getResultInterpretation();

  const handleExportReport = () => {
    toast({
      title: "Report Exported",
      description: "Assessment results have been downloaded as a PDF.",
    });
    // In a real app, this would generate and download a PDF
  };
  
  const handleShareResults = () => {
    toast({
      title: "Share Options",
      description: "You can share these results with your healthcare provider.",
    });
    // In a real app, this would open a share dialog
  };
  
  const handleBookAppointment = () => {
    navigate("/doctor-chat?appointment=appointment");
  };
  
  const handleViewPrograms = () => {
    navigate("/therapy/programs");
  };

  return (
    <>
      <Navbar />
      <div className="container-custom py-12 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/assessments")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Assessment Library
        </Button>
        
        <Card className="mb-8">
          <CardHeader className={resultInterpretation.color}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium mb-1">Assessment Result</p>
                <CardTitle className="text-2xl">{resultInterpretation.title}</CardTitle>
              </div>
              <div className="bg-white rounded-full p-3 h-16 w-16 flex items-center justify-center text-2xl font-bold border shadow-sm">
                {score}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-6">{resultInterpretation.description}</p>
            
            <h3 className="font-semibold mb-3">Recommendations:</h3>
            <ul className="list-disc pl-5 space-y-1 mb-6">
              {resultInterpretation.recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
            
            <p className="text-sm text-gray-500 italic">
              Note: This assessment provides an initial indication only and is not a clinical diagnosis. 
              Please consult with a healthcare professional for a complete evaluation.
            </p>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-3 border-t pt-4">
            <Button variant="outline" onClick={handleExportReport}>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button variant="outline" onClick={handleShareResults}>
              <Share2 className="mr-2 h-4 w-4" />
              Share Results
            </Button>
            <Button onClick={handleBookAppointment}>
              <Calendar className="mr-2 h-4 w-4" />
              Book Appointment
            </Button>
          </CardFooter>
        </Card>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="resources">Recommended Resources</TabsTrigger>
            <TabsTrigger value="history">Assessment History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary">
            <Card>
              <CardHeader>
                <CardTitle>Assessment Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">About This Assessment</h3>
                    {assessmentType === "anxiety" && (
                      <p className="text-gray-600">
                        The Generalized Anxiety Disorder Assessment (GAD-7) is a validated clinical tool used to screen for and 
                        assess the severity of anxiety. Scores range from 0 to 21, with higher scores indicating more severe anxiety symptoms.
                      </p>
                    )}
                    {assessmentType === "depression" && (
                      <p className="text-gray-600">
                        The Patient Health Questionnaire (PHQ-9) is a validated clinical tool used to screen for and 
                        assess the severity of depression. Scores range from 0 to 27, with higher scores indicating more severe depression symptoms.
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">Score Interpretation</h3>
                    <ul className="text-sm space-y-2 mt-2">
                      <li className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                        <span>0-4: Minimal symptoms</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                        <span>5-9: Mild symptoms</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                        <span>10-14: Moderate symptoms</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                        <span>15-21: Severe symptoms</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">Next Steps</h3>
                    <p className="text-gray-600">
                      Based on your assessment results, we recommend exploring our personalized therapy programs 
                      designed to address your specific needs. Our programs combine evidence-based techniques with 
                      practical exercises to help you develop skills for managing your mental health.
                    </p>
                    <Button onClick={handleViewPrograms} className="mt-4">
                      Explore Recommended Programs
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Therapy Programs</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {assessmentType === "anxiety" && (
                        <>
                          <Card className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">Managing Anxiety</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm">8-week program based on CBT principles</p>
                            </CardContent>
                            <CardFooter>
                              <Button size="sm" className="w-full">View Program</Button>
                            </CardFooter>
                          </Card>
                          <Card className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">Mindfulness for Anxiety</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm">6-week mindfulness-based program</p>
                            </CardContent>
                            <CardFooter>
                              <Button size="sm" className="w-full">View Program</Button>
                            </CardFooter>
                          </Card>
                        </>
                      )}
                      {assessmentType === "depression" && (
                        <>
                          <Card className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">Depression Recovery</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm">10-week comprehensive program</p>
                            </CardContent>
                            <CardFooter>
                              <Button size="sm" className="w-full">View Program</Button>
                            </CardFooter>
                          </Card>
                          <Card className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">Mood Boost</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm">4-week behavioral activation program</p>
                            </CardContent>
                            <CardFooter>
                              <Button size="sm" className="w-full">View Program</Button>
                            </CardFooter>
                          </Card>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Self-Help Resources</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <FileText className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                        <div>
                          <h4 className="font-medium">Understanding {assessmentType === "anxiety" ? "Anxiety" : "Depression"}</h4>
                          <p className="text-sm text-gray-600">Educational article with practical insights</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <FileText className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                        <div>
                          <h4 className="font-medium">Daily Coping Strategies</h4>
                          <p className="text-sm text-gray-600">Practical techniques for everyday challenges</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <FileText className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                        <div>
                          <h4 className="font-medium">Sleep Improvement Guide</h4>
                          <p className="text-sm text-gray-600">Tips for better sleep quality</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Assessment History</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 italic mb-4">
                  Tracking your assessment results over time helps identify patterns and measure progress.
                </p>
                <div className="rounded-lg border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="py-3 px-4 text-left">Date</th>
                        <th className="py-3 px-4 text-left">Assessment</th>
                        <th className="py-3 px-4 text-center">Score</th>
                        <th className="py-3 px-4 text-left">Severity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4">{new Date().toLocaleDateString()}</td>
                        <td className="py-3 px-4">
                          {assessmentType === "anxiety" ? "GAD-7" : "PHQ-9"}
                        </td>
                        <td className="py-3 px-4 text-center font-medium">{score}</td>
                        <td className="py-3 px-4">{resultInterpretation.title}</td>
                      </tr>
                      {/* In a real app, this would show previous assessment results */}
                    </tbody>
                  </table>
                </div>
                <p className="text-center text-sm text-gray-500 mt-4">
                  This is your first time taking this assessment. 
                  Complete it again in 2-4 weeks to track your progress.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </>
  );
};

export default AssessmentResults;
