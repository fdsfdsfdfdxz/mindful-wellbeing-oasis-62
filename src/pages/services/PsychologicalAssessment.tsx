
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, ArrowRight, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Progress } from "@/components/ui/progress";

const PsychologicalAssessment = () => {
  const { language, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [progress, setProgress] = useState(0);

  const sampleQuestions = [
    "Over the last 2 weeks, how often have you felt down, depressed, or hopeless?",
    "How often have you been bothered by trouble falling or staying asleep, or sleeping too much?",
    "How often do you find yourself feeling nervous, anxious, or on edge?",
    "How much do these feelings interfere with your daily activities?",
    "How often do you have trouble concentrating on things such as reading or watching TV?"
  ];

  const handleStartAssessment = () => {
    setAssessmentStarted(true);
    setProgress(0);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setProgress(((currentQuestion + 1) / (sampleQuestions.length - 1)) * 100);
    } else {
      // Assessment complete
      toast({
        title: translate('services', 'assessmentComplete', language) || "Assessment Complete",
        description: translate('services', 'assessmentResults', language) || 
          "Thank you for completing the assessment. A therapist will review your results and contact you soon.",
        duration: 3000,
      });
      setAssessmentStarted(false);
      setCurrentQuestion(0);
      setProgress(0);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-custom py-16">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/#services')}
          className="mb-8"
        >
          <ArrowLeft className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {translate('common', 'backToServices', language) || "Back to Services"}
        </Button>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          {translate('services', 'assessmentTitle', language) || "Psychological Assessments"}
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          {translate('services', 'assessmentDesc', language) || 
            "Get a comprehensive understanding of your mental health with our professional psychological assessments. Our evaluations provide insights that help guide your treatment."}
        </p>
        
        {!assessmentStarted ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Available Assessments</h2>
              
              <div className="space-y-4">
                <div className="border border-gray-200 hover:border-calmBlue-500 p-4 rounded-lg transition-colors cursor-pointer" onClick={handleStartAssessment}>
                  <h3 className="font-bold flex items-center justify-between">
                    <span>General Mental Health Assessment</span>
                    <ArrowRight className="h-5 w-5 text-calmBlue-500" />
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">A comprehensive screening for common mental health concerns.</p>
                  <div className="mt-2 text-xs bg-green-100 text-green-800 py-1 px-2 rounded inline-block">
                    15-20 minutes
                  </div>
                </div>
                
                <div className="border border-gray-200 hover:border-calmBlue-500 p-4 rounded-lg transition-colors cursor-pointer">
                  <h3 className="font-bold flex items-center justify-between">
                    <span>Anxiety Assessment</span>
                    <ArrowRight className="h-5 w-5 text-calmBlue-500" />
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">Focused evaluation of anxiety symptoms and severity.</p>
                  <div className="mt-2 text-xs bg-green-100 text-green-800 py-1 px-2 rounded inline-block">
                    10-15 minutes
                  </div>
                </div>
                
                <div className="border border-gray-200 hover:border-calmBlue-500 p-4 rounded-lg transition-colors cursor-pointer">
                  <h3 className="font-bold flex items-center justify-between">
                    <span>Depression Screening</span>
                    <ArrowRight className="h-5 w-5 text-calmBlue-500" />
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">Evaluate symptoms and indicators of depression.</p>
                  <div className="mt-2 text-xs bg-green-100 text-green-800 py-1 px-2 rounded inline-block">
                    10-15 minutes
                  </div>
                </div>
                
                <div className="border border-gray-200 hover:border-calmBlue-500 p-4 rounded-lg transition-colors cursor-pointer">
                  <h3 className="font-bold flex items-center justify-between">
                    <span>Stress Management Evaluation</span>
                    <ArrowRight className="h-5 w-5 text-calmBlue-500" />
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">Assess your stress levels and coping mechanisms.</p>
                  <div className="mt-2 text-xs bg-green-100 text-green-800 py-1 px-2 rounded inline-block">
                    15 minutes
                  </div>
                </div>
                
                <div className="border border-gray-200 hover:border-calmBlue-500 p-4 rounded-lg transition-colors cursor-pointer">
                  <h3 className="font-bold flex items-center justify-between">
                    <span>Relationship Health Check</span>
                    <ArrowRight className="h-5 w-5 text-calmBlue-500" />
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">Evaluate the health of your intimate relationships.</p>
                  <div className="mt-2 text-xs bg-green-100 text-green-800 py-1 px-2 rounded inline-block">
                    20-25 minutes
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-calmBlue-50 p-8 rounded-lg mb-8">
                <h2 className="text-xl font-bold mb-4">
                  Why Take an Assessment?
                </h2>
                
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-calmBlue-500 shrink-0 mt-0.5 mr-3" />
                    <span>Gain insights into your mental and emotional state</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-calmBlue-500 shrink-0 mt-0.5 mr-3" />
                    <span>Identify potential issues that may need attention</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-calmBlue-500 shrink-0 mt-0.5 mr-3" />
                    <span>Get personalized recommendations for next steps</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-calmBlue-500 shrink-0 mt-0.5 mr-3" />
                    <span>Track your progress over time with follow-up assessments</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-6">
                  <div className="bg-sageGreen-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mr-4">
                    <FileText className="h-6 w-6 text-sageGreen-500" />
                  </div>
                  <div>
                    <h3 className="font-bold">Professional Review</h3>
                    <p className="text-sm text-gray-600">All assessments are reviewed by licensed professionals</p>
                  </div>
                </div>
                
                <Button className="w-full" onClick={handleStartAssessment}>
                  {translate('services', 'startAssessment', language) || "Take Assessment Now"}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Question {currentQuestion + 1} of {sampleQuestions.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            <h2 className="text-xl font-bold mb-6">{sampleQuestions[currentQuestion]}</h2>
            
            <div className="space-y-3 mb-8">
              {["Not at all", "Several days", "More than half the days", "Nearly every day"].map((option, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 hover:border-calmBlue-500 p-4 rounded-lg transition-colors cursor-pointer"
                  onClick={handleNextQuestion}
                >
                  {option}
                </div>
              ))}
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => {
                  if (currentQuestion > 0) {
                    setCurrentQuestion(currentQuestion - 1);
                    setProgress(((currentQuestion - 1) / (sampleQuestions.length - 1)) * 100);
                  } else {
                    setAssessmentStarted(false);
                  }
                }}
              >
                {currentQuestion === 0 ? "Cancel" : "Previous"}
              </Button>
              
              <Button onClick={handleNextQuestion}>
                {currentQuestion < sampleQuestions.length - 1 ? "Next Question" : "Complete Assessment"}
              </Button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default PsychologicalAssessment;
