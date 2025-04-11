
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Assessment, AssessmentCategory } from "@/types/assessment";

// Sample assessments data
const sampleAssessments: Assessment[] = [
  {
    id: "anxiety-gad7",
    title: "Generalized Anxiety Disorder Assessment (GAD-7)",
    description: "A clinically validated tool for screening and measuring anxiety severity",
    category: "anxiety",
    estimatedTime: "5-10 minutes",
    questions: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isStandardized: true
  },
  {
    id: "depression-phq9",
    title: "Patient Health Questionnaire (PHQ-9)",
    description: "Depression screening and severity assessment",
    category: "depression",
    estimatedTime: "5-10 minutes",
    questions: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isStandardized: true
  },
  {
    id: "stress-pss",
    title: "Perceived Stress Scale (PSS)",
    description: "Measures the perception of stress in your life",
    category: "stress",
    estimatedTime: "10 minutes",
    questions: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isStandardized: true
  },
  {
    id: "relationship-rcq",
    title: "Relationship Compatibility Questionnaire",
    description: "Evaluate the health of your intimate relationships",
    category: "relationship",
    estimatedTime: "15-20 minutes",
    questions: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isStandardized: true
  },
  {
    id: "general-wellbeing",
    title: "Comprehensive Wellbeing Assessment",
    description: "A holistic evaluation of your mental and emotional wellbeing",
    category: "general",
    estimatedTime: "20-25 minutes",
    questions: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isStandardized: true
  }
];

const categoryLabels: Record<AssessmentCategory, string> = {
  anxiety: "Anxiety",
  depression: "Depression",
  stress: "Stress",
  relationship: "Relationship",
  general: "General Wellbeing",
  custom: "Custom Assessment"
};

const categoryColors: Record<AssessmentCategory, string> = {
  anxiety: "bg-amber-100 text-amber-800 hover:bg-amber-200",
  depression: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  stress: "bg-purple-100 text-purple-800 hover:bg-purple-200",
  relationship: "bg-pink-100 text-pink-800 hover:bg-pink-200",
  general: "bg-green-100 text-green-800 hover:bg-green-200",
  custom: "bg-gray-100 text-gray-800 hover:bg-gray-200",
};

const AssessmentLibrary = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<AssessmentCategory | "all">("all");
  const navigate = useNavigate();

  const filteredAssessments = sampleAssessments.filter(assessment => {
    const matchesSearch = assessment.title.toLowerCase().includes(search.toLowerCase()) || 
                         assessment.description.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || assessment.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleStartAssessment = (assessmentId: string) => {
    navigate(`/assessments/${assessmentId}`);
  };

  return (
    <>
      <Navbar />
      <div className="container-custom py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Assessment Library</h1>
        <p className="text-lg text-gray-600 mb-8">
          Explore our collection of psychological assessments and questionnaires to gain insights into your mental wellbeing.
        </p>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search assessments..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={selectedCategory === "all" ? "default" : "outline"} 
              onClick={() => setSelectedCategory("all")}
              size="sm"
            >
              All
            </Button>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <Button 
                key={key}
                variant={selectedCategory === key ? "default" : "outline"}
                onClick={() => setSelectedCategory(key as AssessmentCategory)}
                size="sm"
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Assessments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssessments.map(assessment => (
            <Card key={assessment.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="bg-gray-50">
                <Badge className={categoryColors[assessment.category]}>
                  {categoryLabels[assessment.category]}
                </Badge>
                <CardTitle className="mt-2">{assessment.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-gray-600 mb-4">{assessment.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Tag className="h-4 w-4 mr-2" />
                  {assessment.isStandardized ? "Standardized Tool" : "Custom Assessment"}
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  Estimated time: {assessment.estimatedTime}
                </div>
              </CardContent>
              <CardFooter className="border-t bg-gray-50">
                <Button 
                  className="w-full" 
                  onClick={() => handleStartAssessment(assessment.id)}
                >
                  Start Assessment
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AssessmentLibrary;
