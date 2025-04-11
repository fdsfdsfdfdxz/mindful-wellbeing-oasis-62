
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, BookOpen, Clock, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TherapyProgram, TherapyType } from "@/types/therapy";

// Sample therapy programs data
const samplePrograms: TherapyProgram[] = [
  {
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
    imageUrl: "/placeholder.svg"
  },
  {
    id: "dbt-emotions",
    title: "Emotional Regulation with DBT",
    description: "Learn dialectical behavior therapy skills to manage intense emotions and improve relationships",
    type: "dbt",
    targetConditions: ["emotional dysregulation", "borderline personality", "mood swings"],
    durationWeeks: 12,
    sessionsPerWeek: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    featured: false,
    imageUrl: "/placeholder.svg"
  },
  {
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
    imageUrl: "/placeholder.svg"
  },
  {
    id: "mindfulness-basics",
    title: "Mindfulness Fundamentals",
    description: "An introduction to mindfulness practices for stress reduction and present-moment awareness",
    type: "mindfulness",
    targetConditions: ["stress", "anxiety", "burnout"],
    durationWeeks: 4,
    sessionsPerWeek: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    featured: false,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "interpersonal-relationships",
    title: "Better Relationships through IPT",
    description: "Interpersonal therapy program focused on improving communication and relationship patterns",
    type: "interpersonal",
    targetConditions: ["relationship issues", "depression", "social anxiety"],
    durationWeeks: 10,
    sessionsPerWeek: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    featured: false,
    imageUrl: "/placeholder.svg"
  }
];

const therapyTypeLabels: Record<TherapyType, string> = {
  cbt: "Cognitive Behavioral Therapy",
  dbt: "Dialectical Behavior Therapy",
  act: "Acceptance & Commitment Therapy",
  mindfulness: "Mindfulness-Based Therapy",
  interpersonal: "Interpersonal Therapy",
  psychodynamic: "Psychodynamic Therapy",
  other: "Other Therapy Approach"
};

const therapyTypeColors: Record<TherapyType, string> = {
  cbt: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  dbt: "bg-purple-100 text-purple-800 hover:bg-purple-200",
  act: "bg-green-100 text-green-800 hover:bg-green-200",
  mindfulness: "bg-amber-100 text-amber-800 hover:bg-amber-200",
  interpersonal: "bg-pink-100 text-pink-800 hover:bg-pink-200",
  psychodynamic: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
  other: "bg-gray-100 text-gray-800 hover:bg-gray-200"
};

const TherapyPrograms = () => {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<TherapyType | "all">("all");
  const navigate = useNavigate();

  const filteredPrograms = samplePrograms.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(search.toLowerCase()) || 
                         program.description.toLowerCase().includes(search.toLowerCase()) ||
                         program.targetConditions.some(condition => 
                           condition.toLowerCase().includes(search.toLowerCase())
                         );
    
    const matchesType = selectedType === "all" || program.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const handleViewProgram = (programId: string) => {
    navigate(`/therapy/programs/${programId}`);
  };

  return (
    <>
      <Navbar />
      <div className="container-custom py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Therapeutic Programs</h1>
        <p className="text-lg text-gray-600 mb-8">
          Structured, evidence-based therapy programs to help you develop skills and strategies for better mental health.
        </p>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search programs by name or condition..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={selectedType === "all" ? "default" : "outline"} 
              onClick={() => setSelectedType("all")}
              size="sm"
            >
              All Types
            </Button>
            {Object.entries(therapyTypeLabels).map(([key, label]) => (
              <Button 
                key={key}
                variant={selectedType === key ? "default" : "outline"}
                onClick={() => setSelectedType(key as TherapyType)}
                size="sm"
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Programs */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Featured Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPrograms
              .filter(program => program.featured)
              .map(program => (
                <Card key={program.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 bg-gray-100">
                    <img 
                      src={program.imageUrl} 
                      alt={program.title} 
                      className="w-full h-full object-cover"
                    />
                    <Badge className={`absolute top-3 left-3 ${therapyTypeColors[program.type]}`}>
                      {therapyTypeLabels[program.type]}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle>{program.title}</CardTitle>
                    <CardDescription>{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {program.targetConditions.map((condition, i) => (
                        <Badge key={i} variant="outline">{condition}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Clock className="h-4 w-4 mr-2" />
                      {program.durationWeeks} weeks, {program.sessionsPerWeek} session{program.sessionsPerWeek > 1 ? 's' : ''} per week
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <BookOpen className="h-4 w-4 mr-2" />
                      {program.durationWeeks * program.sessionsPerWeek} total sessions
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      onClick={() => handleViewProgram(program.id)}
                    >
                      View Program
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>

        {/* All Programs */}
        <h2 className="text-2xl font-bold mb-6">All Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPrograms
            .filter(program => !program.featured)
            .map(program => (
              <Card key={program.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader>
                  <Badge className={therapyTypeColors[program.type]}>
                    {therapyTypeLabels[program.type]}
                  </Badge>
                  <CardTitle className="mt-2">{program.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
                    {program.durationWeeks} weeks
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => handleViewProgram(program.id)}
                  >
                    View Details
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

export default TherapyPrograms;
