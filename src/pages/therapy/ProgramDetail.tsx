
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Award, BookOpen, CheckCircle, LockIcon, PlayCircle, FileText, Download, CheckCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  TherapyProgram, 
  ProgramModule, 
  ProgramContentItem, 
  HomeworkItem, 
  TherapyType 
} from "@/types/therapy";

// Sample therapy programs data - in a real app, this would come from an API
const samplePrograms: Record<string, TherapyProgram> = {
  "cbt-anxiety": {
    id: "cbt-anxiety",
    title: "Overcoming Anxiety with CBT",
    description: "A structured cognitive-behavioral therapy program for managing anxiety symptoms",
    type: "cbt",
    targetConditions: ["anxiety", "stress", "phobias"],
    durationWeeks: 8,
    sessionsPerWeek: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    featured: true,
    authorName: "Dr. Sarah Johnson",
    imageUrl: "/placeholder.svg"
  },
  "act-flexibility": {
    id: "act-flexibility",
    title: "Psychological Flexibility with ACT",
    description: "Acceptance and commitment therapy for developing psychological flexibility and living with purpose",
    type: "act",
    targetConditions: ["depression", "anxiety", "stress"],
    durationWeeks: 6,
    sessionsPerWeek: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    featured: true,
    authorName: "Dr. Michael Chen",
    imageUrl: "/placeholder.svg"
  }
};

// Sample modules data
const sampleModules: Record<string, ProgramModule[]> = {
  "cbt-anxiety": [
    {
      id: "cbt-anxiety-module-1",
      programId: "cbt-anxiety",
      title: "Understanding Anxiety",
      description: "Learn about the cognitive and physiological aspects of anxiety",
      order: 1,
      contentItems: [
        {
          id: "cbt-anxiety-m1-c1",
          moduleId: "cbt-anxiety-module-1",
          title: "Introduction to Anxiety",
          description: "Overview of anxiety, its symptoms, and how CBT can help",
          type: "video",
          url: "#",
          duration: 15,
          order: 1
        },
        {
          id: "cbt-anxiety-m1-c2",
          moduleId: "cbt-anxiety-module-1",
          title: "The Cognitive Model of Anxiety",
          description: "How thoughts influence emotions and behaviors",
          type: "text",
          content: "# The Cognitive Model\n\nAnxiety is maintained by a cycle of thoughts, feelings, and behaviors...",
          order: 2
        },
        {
          id: "cbt-anxiety-m1-c3",
          moduleId: "cbt-anxiety-module-1",
          title: "Common Anxiety Triggers",
          description: "Identifying situations that trigger anxiety",
          type: "interactive",
          url: "#",
          duration: 10,
          order: 3
        }
      ],
      homeworkItems: [
        {
          id: "cbt-anxiety-m1-h1",
          moduleId: "cbt-anxiety-module-1",
          title: "Anxiety Diary",
          description: "Track your anxiety symptoms and triggers",
          instructions: "Complete the anxiety diary for at least 5 days this week.",
          type: "worksheet",
          template: "anxiety-diary-template"
        }
      ]
    },
    {
      id: "cbt-anxiety-module-2",
      programId: "cbt-anxiety",
      title: "Challenging Negative Thoughts",
      description: "Learn to identify and challenge anxiety-provoking thoughts",
      order: 2,
      contentItems: [
        {
          id: "cbt-anxiety-m2-c1",
          moduleId: "cbt-anxiety-module-2",
          title: "Cognitive Distortions",
          description: "Common thinking errors that contribute to anxiety",
          type: "video",
          url: "#",
          duration: 20,
          order: 1
        },
        {
          id: "cbt-anxiety-m2-c2",
          moduleId: "cbt-anxiety-module-2",
          title: "Thought Records",
          description: "How to use thought records to challenge anxious thinking",
          type: "interactive",
          url: "#",
          duration: 15,
          order: 2
        }
      ],
      homeworkItems: [
        {
          id: "cbt-anxiety-m2-h1",
          moduleId: "cbt-anxiety-module-2",
          title: "Thought Record Practice",
          description: "Complete thought records for anxious situations",
          instructions: "Fill out at least 3 thought records this week.",
          type: "worksheet",
          template: "thought-record-template"
        }
      ]
    },
    {
      id: "cbt-anxiety-module-3",
      programId: "cbt-anxiety",
      title: "Relaxation Techniques",
      description: "Learn and practice relaxation skills to manage anxiety",
      order: 3,
      contentItems: [
        {
          id: "cbt-anxiety-m3-c1",
          moduleId: "cbt-anxiety-module-3",
          title: "Deep Breathing",
          description: "Techniques for calming breathing",
          type: "video",
          url: "#",
          duration: 10,
          order: 1
        },
        {
          id: "cbt-anxiety-m3-c2",
          moduleId: "cbt-anxiety-module-3",
          title: "Progressive Muscle Relaxation",
          description: "How to release physical tension",
          type: "audio",
          url: "#",
          duration: 15,
          order: 2
        }
      ],
      homeworkItems: [
        {
          id: "cbt-anxiety-m3-h1",
          moduleId: "cbt-anxiety-module-3",
          title: "Daily Relaxation Practice",
          description: "Practice relaxation techniques daily",
          instructions: "Practice for at least 10 minutes each day.",
          type: "exercise"
        }
      ]
    }
  ]
};

const therapyTypeLabels: Record<TherapyType, string> = {
  cbt: "Cognitive Behavioral Therapy",
  dbt: "Dialectical Behavior Therapy",
  act: "Acceptance & Commitment Therapy",
  mindfulness: "Mindfulness-Based Therapy",
  interpersonal: "Interpersonal Therapy",
  psychodynamic: "Psychodynamic Therapy",
  other: "Other Therapy Approach"
};

const contentTypeIcons: Record<string, React.ReactNode> = {
  video: <PlayCircle className="h-5 w-5" />,
  audio: <PlayCircle className="h-5 w-5" />,
  text: <FileText className="h-5 w-5" />,
  interactive: <FileText className="h-5 w-5" />,
  worksheet: <Download className="h-5 w-5" />,
  exercise: <CheckCheck className="h-5 w-5" />
};

const ProgramDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [program, setProgram] = useState<TherapyProgram | null>(null);
  const [modules, setModules] = useState<ProgramModule[]>([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

  useEffect(() => {
    if (id && id in samplePrograms) {
      setProgram(samplePrograms[id]);
      if (id in sampleModules) {
        setModules(sampleModules[id]);
        if (sampleModules[id].length > 0) {
          setActiveModuleId(sampleModules[id][0].id);
        }
      }
    } else {
      navigate("/therapy/programs");
    }
  }, [id, navigate]);

  const handleEnroll = () => {
    setIsEnrolled(true);
    setProgress(0);
    toast({
      title: "Successfully Enrolled",
      description: `You've enrolled in "${program?.title}". Start your first module now.`,
    });
    setActiveTab("modules");
  };

  const handleStartModule = (moduleId: string) => {
    setActiveModuleId(moduleId);
    toast({
      title: "Module Unlocked",
      description: "You can now access this module's content.",
    });
  };

  const handleCompleteContent = (contentId: string) => {
    // In a real app, this would update completion status in a database
    toast({
      title: "Content Completed",
      description: "Your progress has been updated.",
    });
    
    // Update progress - in a real app, this would be more sophisticated
    setProgress(prev => {
      const newProgress = Math.min(prev + 10, 100);
      return newProgress;
    });
  };

  const handleSubmitHomework = (homeworkId: string) => {
    toast({
      title: "Homework Submitted",
      description: "Your submission has been received.",
    });
    
    // Update progress
    setProgress(prev => {
      const newProgress = Math.min(prev + 15, 100);
      return newProgress;
    });
  };

  if (!program) {
    return (
      <>
        <Navbar />
        <div className="container-custom py-12">
          <h1 className="text-2xl font-bold">Loading program...</h1>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container-custom py-12 max-w-5xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/therapy/programs")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Programs
        </Button>
        
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold mb-3">{program.title}</h1>
            <Badge className="mb-4">{therapyTypeLabels[program.type]}</Badge>
            <p className="text-gray-600 mb-4">{program.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {program.targetConditions.map((condition, i) => (
                <Badge key={i} variant="outline">{condition}</Badge>
              ))}
            </div>
            
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <Clock className="h-4 w-4 mr-2" />
              {program.durationWeeks} weeks, {program.sessionsPerWeek} session{program.sessionsPerWeek > 1 ? 's' : ''} per week
            </div>
            
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <BookOpen className="h-4 w-4 mr-2" />
              {program.durationWeeks * program.sessionsPerWeek} total sessions
            </div>
            
            {program.authorName && (
              <div className="text-sm text-gray-500 mb-4">
                Created by: <span className="font-medium">{program.authorName}</span>
              </div>
            )}
          </div>
          
          <div className="md:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>Program Status</CardTitle>
              </CardHeader>
              <CardContent>
                {isEnrolled ? (
                  <>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      You're enrolled in this program. Continue your progress by completing modules and exercises.
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-gray-600 mb-4">
                    Enroll in this program to start your therapeutic journey with guided modules and exercises.
                  </p>
                )}
                
                {isEnrolled ? (
                  <Button className="w-full" onClick={() => setActiveTab("modules")}>
                    Continue Program
                  </Button>
                ) : (
                  <Button className="w-full" onClick={handleEnroll}>
                    Start This Program
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="modules">Modules & Content</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Program Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">What You'll Learn</h3>
                  <ul className="space-y-2">
                    {program.type === "cbt" && (
                      <>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>Identify and challenge unhelpful thought patterns</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>Practice effective relaxation and coping strategies</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>Develop behavioral techniques to overcome avoidance</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>Create personalized strategies for managing specific triggers</span>
                        </li>
                      </>
                    )}
                    {program.type === "act" && (
                      <>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>Develop psychological flexibility in facing challenges</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>Practice mindfulness and present-moment awareness</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>Clarify personal values and align actions with them</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>Learn acceptance strategies for difficult thoughts and feelings</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Program Structure</h3>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      This program is structured into {modules.length} modules, delivered over {program.durationWeeks} weeks. 
                      Each module contains a mix of educational content, interactive exercises, and homework assignments.
                    </p>
                    
                    <div className="rounded-lg border overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50 border-b">
                            <th className="py-3 px-4 text-left">Module</th>
                            <th className="py-3 px-4 text-left">Focus Area</th>
                          </tr>
                        </thead>
                        <tbody>
                          {modules.map((module) => (
                            <tr key={module.id} className="border-b">
                              <td className="py-3 px-4 font-medium">Module {module.order}</td>
                              <td className="py-3 px-4">{module.title}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Evidence Base</h3>
                  <p className="text-gray-600 mb-3">
                    {program.type === "cbt" && "Cognitive Behavioral Therapy (CBT) is one of the most extensively researched forms of psychotherapy. Multiple meta-analyses have shown it to be effective for anxiety disorders, with success rates of 60-80% for various anxiety conditions."}
                    {program.type === "act" && "Acceptance and Commitment Therapy (ACT) has been shown in numerous studies to be effective for a range of conditions including anxiety, depression, and chronic pain. Research demonstrates its effectiveness in improving psychological flexibility and quality of life."}
                  </p>
                </div>
                
                <div className="pt-4">
                  {!isEnrolled && (
                    <Button onClick={handleEnroll}>Enroll in This Program</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="modules">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Program Modules</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {modules.map((module, index) => {
                        const isActive = module.id === activeModuleId;
                        const isLocked = !isEnrolled && index > 0;
                        
                        return (
                          <div
                            key={module.id}
                            className={`p-4 cursor-pointer transition-colors ${
                              isActive ? "bg-gray-100" : "hover:bg-gray-50"
                            }`}
                            onClick={() => isLocked ? null : handleStartModule(module.id)}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-sm font-medium">Module {module.order}</p>
                                <p className={`font-semibold ${isLocked ? "text-gray-400" : ""}`}>
                                  {module.title}
                                </p>
                              </div>
                              {isLocked ? (
                                <LockIcon className="h-5 w-5 text-gray-400" />
                              ) : (
                                <Badge variant={isActive ? "default" : "outline"} className="ml-2">
                                  {isActive ? "Current" : "Available"}
                                </Badge>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:col-span-2">
                {activeModuleId ? (
                  <div>
                    {modules
                      .filter(module => module.id === activeModuleId)
                      .map(module => (
                        <Card key={module.id}>
                          <CardHeader>
                            <CardTitle>Module {module.order}: {module.title}</CardTitle>
                            <CardDescription>{module.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div>
                              <h3 className="text-lg font-semibold mb-3">Content</h3>
                              <div className="space-y-3">
                                {module.contentItems.map((content, index) => (
                                  <Card key={content.id} className="shadow-sm">
                                    <CardHeader className="py-3 px-4">
                                      <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                          {contentTypeIcons[content.type]}
                                          <span className="ml-2 font-medium">{content.title}</span>
                                        </div>
                                        {content.duration && (
                                          <Badge variant="outline">
                                            {content.duration} min
                                          </Badge>
                                        )}
                                      </div>
                                    </CardHeader>
                                    <CardContent className="py-2 px-4">
                                      <p className="text-sm text-gray-600">
                                        {content.description}
                                      </p>
                                    </CardContent>
                                    <CardFooter className="py-2 px-4">
                                      <Button 
                                        size="sm"
                                        onClick={() => handleCompleteContent(content.id)}
                                      >
                                        {content.type === "video" || content.type === "audio" 
                                          ? "Play" 
                                          : content.type === "interactive" 
                                          ? "Start Activity" 
                                          : "View Content"}
                                      </Button>
                                    </CardFooter>
                                  </Card>
                                ))}
                              </div>
                            </div>
                            
                            <Separator />
                            
                            <div>
                              <h3 className="text-lg font-semibold mb-3">Homework</h3>
                              <div className="space-y-3">
                                {module.homeworkItems.map((homework) => (
                                  <Card key={homework.id} className="shadow-sm">
                                    <CardHeader className="py-3 px-4">
                                      <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                          {contentTypeIcons[homework.type]}
                                          <span className="ml-2 font-medium">{homework.title}</span>
                                        </div>
                                      </div>
                                    </CardHeader>
                                    <CardContent className="py-2 px-4">
                                      <p className="text-sm text-gray-600 mb-2">
                                        {homework.description}
                                      </p>
                                      <p className="text-sm font-medium">
                                        Instructions: <span className="font-normal">{homework.instructions}</span>
                                      </p>
                                    </CardContent>
                                    <CardFooter className="py-2 px-4">
                                      <Button 
                                        size="sm"
                                        variant="outline"
                                        className="mr-2"
                                        onClick={() => {
                                          toast({
                                            title: "Worksheet Downloaded",
                                            description: "The worksheet has been downloaded to your device.",
                                          });
                                        }}
                                      >
                                        Download Worksheet
                                      </Button>
                                      <Button 
                                        size="sm"
                                        onClick={() => handleSubmitHomework(homework.id)}
                                      >
                                        Submit Homework
                                      </Button>
                                    </CardFooter>
                                  </Card>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Select a Module</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Please select a module from the list to view its content.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Additional Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Downloadable Materials</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="shadow-sm">
                      <CardHeader className="py-3">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 mr-2" />
                          <CardTitle className="text-base">Program Workbook</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="py-2">
                        <p className="text-sm text-gray-600">
                          Complete workbook with all worksheets and exercises.
                        </p>
                      </CardContent>
                      <CardFooter className="py-2">
                        <Button size="sm" variant="outline">Download PDF</Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="shadow-sm">
                      <CardHeader className="py-3">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 mr-2" />
                          <CardTitle className="text-base">Quick Reference Guide</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="py-2">
                        <p className="text-sm text-gray-600">
                          Key concepts and techniques in a printable format.
                        </p>
                      </CardContent>
                      <CardFooter className="py-2">
                        <Button size="sm" variant="outline">Download PDF</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Supplementary Reading</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <BookOpen className="h-5 w-5 mt-0.5 mr-2 text-gray-500" />
                      <div>
                        <h4 className="font-medium">
                          {program.type === "cbt" ? "The Anxiety and Worry Workbook" : "Get Out of Your Mind and Into Your Life"}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {program.type === "cbt" 
                            ? "By David Clark and Aaron Beck" 
                            : "By Steven Hayes and Spencer Smith"}
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <BookOpen className="h-5 w-5 mt-0.5 mr-2 text-gray-500" />
                      <div>
                        <h4 className="font-medium">
                          {program.type === "cbt" ? "Mind Over Mood" : "The Happiness Trap"}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {program.type === "cbt" 
                            ? "By Dennis Greenberger and Christine Padesky" 
                            : "By Russ Harris"}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Mobile Resources</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Access program content on-the-go with our mobile companion app.
                  </p>
                  <Button variant="outline">Download Mobile Guide</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </>
  );
};

export default ProgramDetail;
