
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Save, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { 
  Assessment, 
  AssessmentQuestion, 
  AssessmentResponse 
} from "@/types/assessment";

// Sample questions for the GAD-7 assessment
const anxietyQuestions: AssessmentQuestion[] = [
  {
    id: "gad1",
    text: "Feeling nervous, anxious, or on edge",
    type: "scale",
    minValue: 0,
    maxValue: 3,
    required: true
  },
  {
    id: "gad2",
    text: "Not being able to stop or control worrying",
    type: "scale",
    minValue: 0,
    maxValue: 3,
    required: true
  },
  {
    id: "gad3",
    text: "Worrying too much about different things",
    type: "scale",
    minValue: 0,
    maxValue: 3,
    required: true
  },
  {
    id: "gad4",
    text: "Trouble relaxing",
    type: "scale",
    minValue: 0,
    maxValue: 3,
    required: true
  },
  {
    id: "gad5",
    text: "Being so restless that it's hard to sit still",
    type: "scale",
    minValue: 0,
    maxValue: 3,
    required: true
  },
  {
    id: "gad6",
    text: "Becoming easily annoyed or irritable",
    type: "scale",
    minValue: 0,
    maxValue: 3,
    required: true
  },
  {
    id: "gad7",
    text: "Feeling afraid as if something awful might happen",
    type: "scale",
    minValue: 0,
    maxValue: 3,
    required: true
  },
  {
    id: "gad8",
    text: "If you checked off any problems, how difficult have these made it for you to do your work, take care of things at home, or get along with other people?",
    type: "multipleChoice",
    options: ["Not difficult at all", "Somewhat difficult", "Very difficult", "Extremely difficult"],
    required: false
  },
  {
    id: "gad9",
    text: "Additional notes or context you'd like to share with your healthcare provider:",
    type: "openText",
    required: false
  }
];

// Sample depression questions (PHQ-9)
const depressionQuestions: AssessmentQuestion[] = [
  {
    id: "phq1",
    text: "Little interest or pleasure in doing things",
    type: "scale",
    minValue: 0,
    maxValue: 3,
    required: true
  },
  {
    id: "phq2",
    text: "Feeling down, depressed, or hopeless",
    type: "scale",
    minValue: 0,
    maxValue: 3,
    required: true
  },
  // More questions would be defined here
];

// Sample assessments with questions
const sampleAssessmentsWithQuestions: Record<string, Assessment> = {
  "anxiety-gad7": {
    id: "anxiety-gad7",
    title: "Generalized Anxiety Disorder Assessment (GAD-7)",
    description: "A clinically validated tool for screening and measuring anxiety severity",
    category: "anxiety",
    estimatedTime: "5-10 minutes",
    questions: anxietyQuestions,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isStandardized: true
  },
  "depression-phq9": {
    id: "depression-phq9",
    title: "Patient Health Questionnaire (PHQ-9)",
    description: "Depression screening and severity assessment",
    category: "depression",
    estimatedTime: "5-10 minutes",
    questions: depressionQuestions,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isStandardized: true
  }
};

const AssessmentTaker = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [progress, setProgress] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (id && id in sampleAssessmentsWithQuestions) {
      setAssessment(sampleAssessmentsWithQuestions[id]);

      // Initialize empty responses
      const initialResponses = sampleAssessmentsWithQuestions[id].questions.map(q => ({
        questionId: q.id,
        value: q.type === "scale" ? 0 : q.type === "multipleChoice" ? "" : q.type === "boolean" ? false : "",
        timestamp: new Date().toISOString()
      }));
      
      setResponses(initialResponses);
    } else {
      // Assessment not found, redirect to library
      navigate("/assessments");
    }
  }, [id, navigate]);

  useEffect(() => {
    if (assessment) {
      const totalQuestions = assessment.questions.length;
      const completedQuestions = currentQuestionIndex;
      const calculatedProgress = (completedQuestions / (totalQuestions - 1)) * 100;
      setProgress(calculatedProgress);
    }
  }, [currentQuestionIndex, assessment]);

  const handleNextQuestion = () => {
    // Check if current question is required and has a response
    const currentQuestion = assessment?.questions[currentQuestionIndex];
    const currentResponse = responses.find(r => r.questionId === currentQuestion?.id);

    if (currentQuestion?.required && 
        (!currentResponse || 
         (typeof currentResponse.value === "string" && currentResponse.value.trim() === "") || 
         currentResponse.value === undefined)) {
      toast({
        title: "Required Question",
        description: "Please answer this question before continuing.",
        variant: "destructive"
      });
      return;
    }

    if (assessment && currentQuestionIndex < assessment.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Complete assessment
      handleSubmitAssessment();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      // Go back to assessment library
      if (confirm("Are you sure you want to exit this assessment? Your progress will be saved.")) {
        handleSaveProgress();
        navigate("/assessments");
      }
    }
  };

  const handleResponseChange = (questionId: string, value: string | number | boolean) => {
    setResponses(prev => {
      const newResponses = [...prev];
      const index = newResponses.findIndex(r => r.questionId === questionId);
      
      if (index !== -1) {
        newResponses[index] = {
          ...newResponses[index],
          value,
          timestamp: new Date().toISOString()
        };
      } else {
        newResponses.push({
          questionId,
          value,
          timestamp: new Date().toISOString()
        });
      }
      
      return newResponses;
    });
  };

  const handleSaveProgress = () => {
    setIsSaving(true);
    
    // In a real app, this would save to a database
    setTimeout(() => {
      toast({
        title: "Progress Saved",
        description: "Your assessment progress has been saved. You can continue later.",
      });
      setIsSaving(false);
    }, 1000);
  };

  const handleSubmitAssessment = () => {
    // Calculate total score for assessments like GAD-7 and PHQ-9
    let totalScore = 0;
    if (assessment?.category === "anxiety" || assessment?.category === "depression") {
      responses.forEach(response => {
        if (typeof response.value === "number" && !isNaN(response.value)) {
          totalScore += response.value;
        }
      });
    }

    // In a real app, this would send to a server
    toast({
      title: "Assessment Completed",
      description: "Your responses have been submitted for review.",
    });
    
    // Navigate to results page with assessment ID and calculated score
    navigate(`/assessments/results/${assessment?.id}?score=${totalScore}`);
  };

  const renderQuestion = () => {
    if (!assessment) return null;
    
    const currentQuestion = assessment.questions[currentQuestionIndex];
    if (!currentQuestion) return null;
    
    const currentResponse = responses.find(r => r.questionId === currentQuestion.id);
    const responseValue = currentResponse ? currentResponse.value : undefined;
    
    return (
      <Card className="mb-6">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">{currentQuestion.text}</h2>
          
          {currentQuestion.type === "scale" && (
            <div className="space-y-6">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Not at all</span>
                <span>Several days</span>
                <span>More than half the days</span>
                <span>Nearly every day</span>
              </div>
              <Slider
                defaultValue={[responseValue as number || 0]}
                max={3}
                step={1}
                onValueChange={(value) => handleResponseChange(currentQuestion.id, value[0])}
              />
              <div className="flex justify-between mt-2">
                {[0, 1, 2, 3].map(value => (
                  <Button
                    key={value}
                    variant={responseValue === value ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleResponseChange(currentQuestion.id, value)}
                  >
                    {value}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {currentQuestion.type === "multipleChoice" && (
            <RadioGroup
              value={responseValue as string}
              onValueChange={(value) => handleResponseChange(currentQuestion.id, value)}
              className="space-y-3"
            >
              {currentQuestion.options?.map((option, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`option-${i}`} />
                  <Label htmlFor={`option-${i}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          )}
          
          {currentQuestion.type === "openText" && (
            <Textarea
              placeholder="Type your answer here..."
              value={responseValue as string || ""}
              onChange={(e) => handleResponseChange(currentQuestion.id, e.target.value)}
              className="min-h-[120px]"
            />
          )}
          
          {currentQuestion.type === "boolean" && (
            <div className="flex space-x-4">
              <Button
                variant={responseValue === true ? "default" : "outline"}
                onClick={() => handleResponseChange(currentQuestion.id, true)}
              >
                Yes
              </Button>
              <Button
                variant={responseValue === false ? "default" : "outline"}
                onClick={() => handleResponseChange(currentQuestion.id, false)}
              >
                No
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  if (!assessment) {
    return (
      <>
        <Navbar />
        <div className="container-custom py-12">
          <h1 className="text-2xl font-bold">Loading assessment...</h1>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container-custom py-12 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" onClick={handlePreviousQuestion}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {currentQuestionIndex === 0 ? "Exit Assessment" : "Previous"}
          </Button>
          <Button variant="outline" onClick={handleSaveProgress} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Progress"}
            <Save className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">{assessment.title}</h1>
          <p className="text-gray-600 mb-4">{assessment.description}</p>
          <div className="mb-2 flex justify-between text-sm">
            <span>Question {currentQuestionIndex + 1} of {assessment.questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {renderQuestion()}

        <div className="flex justify-end">
          <Button onClick={handleNextQuestion}>
            {currentQuestionIndex < assessment.questions.length - 1 ? "Next Question" : "Complete Assessment"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AssessmentTaker;
