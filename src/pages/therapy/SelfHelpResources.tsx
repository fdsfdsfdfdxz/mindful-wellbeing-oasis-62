
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, BookOpen, FileText, Play, Download, BookMarked, Bookmark, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SelfHelpResource, ContentType } from "@/types/therapy";
import { useToast } from "@/hooks/use-toast";

// Sample self-help resources
const sampleResources: SelfHelpResource[] = [
  {
    id: "managing-anxiety-guide",
    title: "Managing Anxiety: A Comprehensive Guide",
    description: "Learn practical strategies for understanding and managing anxiety symptoms in daily life.",
    category: ["anxiety", "stress", "self-help"],
    tags: ["beginners", "practical", "techniques"],
    type: "text",
    content: "# Managing Anxiety\n\nAnxiety is a natural response to stress...",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "breathing-techniques",
    title: "5-Minute Breathing Techniques for Stress Relief",
    description: "Quick breathing exercises you can practice anywhere to calm your mind and reduce stress.",
    category: ["stress", "mindfulness", "anxiety"],
    tags: ["quick", "exercises", "beginners"],
    type: "video",
    url: "#video-url",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "mood-journal-template",
    title: "Interactive Mood Journal Template",
    description: "Track your moods and identify patterns with this interactive journal template.",
    category: ["depression", "mood", "self-awareness"],
    tags: ["interactive", "worksheet", "tracking"],
    type: "worksheet",
    url: "#download-url",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "relationship-communication",
    title: "Effective Communication in Relationships",
    description: "Learn essential skills for healthy communication with partners, family, and friends.",
    category: ["relationships", "communication", "interpersonal"],
    tags: ["skills", "practical", "conflict-resolution"],
    type: "text",
    content: "# Effective Communication\n\nGood communication is the foundation of healthy relationships...",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "progressive-relaxation",
    title: "Progressive Muscle Relaxation Audio Guide",
    description: "A guided audio session for releasing tension throughout your body.",
    category: ["stress", "relaxation", "anxiety"],
    tags: ["audio", "guided", "technique"],
    type: "audio",
    url: "#audio-url",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "self-compassion-exercises",
    title: "Self-Compassion Practices for Inner Critic",
    description: "Exercises to develop a kinder relationship with yourself and quiet your inner critic.",
    category: ["self-compassion", "depression", "anxiety"],
    tags: ["exercises", "worksheet", "mindfulness"],
    type: "interactive",
    url: "#interactive-url",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "sleep-hygiene",
    title: "Sleep Hygiene: Habits for Better Rest",
    description: "Evidence-based practices to improve your sleep quality and overcome insomnia.",
    category: ["sleep", "habits", "health"],
    tags: ["guide", "practical", "health"],
    type: "text",
    content: "# Sleep Hygiene\n\nQuality sleep is essential for mental health...",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const categoryOptions = [
  "all",
  "anxiety",
  "stress",
  "depression",
  "relationships",
  "sleep",
  "mindfulness",
  "self-compassion"
];

const contentTypeLabels: Record<ContentType, string> = {
  video: "Video",
  audio: "Audio",
  text: "Article",
  interactive: "Interactive Tool",
  worksheet: "Worksheet",
  exercise: "Exercise"
};

const contentTypeIcons: Record<ContentType, React.ReactNode> = {
  video: <Play className="h-4 w-4" />,
  audio: <Play className="h-4 w-4" />,
  text: <FileText className="h-4 w-4" />,
  interactive: <BookOpen className="h-4 w-4" />,
  worksheet: <Download className="h-4 w-4" />,
  exercise: <BookMarked className="h-4 w-4" />
};

const contentTypeColors: Record<ContentType, string> = {
  video: "bg-blue-100 text-blue-800",
  audio: "bg-purple-100 text-purple-800",
  text: "bg-gray-100 text-gray-800",
  interactive: "bg-green-100 text-green-800",
  worksheet: "bg-amber-100 text-amber-800",
  exercise: "bg-pink-100 text-pink-800"
};

const SelfHelpResources = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [savedResources, setSavedResources] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("browse");
  const navigate = useNavigate();
  const { toast } = useToast();

  const filteredResources = sampleResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(search.toLowerCase()) || 
                         resource.description.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || resource.category.includes(selectedCategory);
    
    const matchesType = selectedType === "all" || resource.type === selectedType;
    
    const matchesSaved = activeTab === "saved" ? savedResources.includes(resource.id) : true;
    
    return matchesSearch && matchesCategory && matchesType && (activeTab === "browse" || matchesSaved);
  });

  const handleOpenResource = (resource: SelfHelpResource) => {
    // In a real app, this would navigate to a detailed view or open the resource
    toast({
      title: "Resource Opened",
      description: `Opening: ${resource.title}`,
    });
  };

  const handleSaveResource = (resourceId: string) => {
    if (savedResources.includes(resourceId)) {
      setSavedResources(savedResources.filter(id => id !== resourceId));
      toast({
        title: "Resource Removed",
        description: "Resource removed from your saved items.",
      });
    } else {
      setSavedResources([...savedResources, resourceId]);
      toast({
        title: "Resource Saved",
        description: "Resource saved to your library for later access.",
      });
    }
  };

  const handleDownloadResource = (resource: SelfHelpResource) => {
    toast({
      title: "Resource Downloaded",
      description: `${resource.title} has been downloaded to your device.`,
    });
  };

  return (
    <>
      <Navbar />
      <div className="container-custom py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Self-Help Resources</h1>
        <p className="text-lg text-gray-600 mb-8">
          Explore our library of self-help resources to support your mental wellness journey. 
          From articles and videos to interactive tools and worksheets, find the resources that work for you.
        </p>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
          <TabsList>
            <TabsTrigger value="browse">Browse Library</TabsTrigger>
            <TabsTrigger value="saved">Saved Resources</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search resources..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm">Category:</span>
            <select 
              className="border rounded px-2 py-1 text-sm" 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categoryOptions.map(category => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            
            <span className="text-sm ml-2">Type:</span>
            <select 
              className="border rounded px-2 py-1 text-sm"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">All Types</option>
              {Object.entries(contentTypeLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(resource => (
              <Card key={resource.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge className={contentTypeColors[resource.type]}>
                      <div className="flex items-center">
                        {contentTypeIcons[resource.type]}
                        <span className="ml-1">{contentTypeLabels[resource.type]}</span>
                      </div>
                    </Badge>
                    <button
                      onClick={() => handleSaveResource(resource.id)}
                      className="text-gray-400 hover:text-yellow-500 transition-colors"
                    >
                      <Bookmark className={`h-5 w-5 ${savedResources.includes(resource.id) ? "fill-yellow-500 text-yellow-500" : ""}`} />
                    </button>
                  </div>
                  <CardTitle className="text-xl mt-2">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {resource.category.map((cat, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex justify-between">
                  <Button 
                    variant="default" 
                    onClick={() => handleOpenResource(resource)}
                    className="w-3/4"
                  >
                    {resource.type === "video" || resource.type === "audio" 
                      ? "Play" 
                      : resource.type === "interactive" 
                      ? "Open Tool" 
                      : resource.type === "worksheet" 
                      ? "View" 
                      : "Read Article"}
                  </Button>
                  
                  {(resource.type === "worksheet" || resource.type === "text") && (
                    <Button 
                      variant="outline"
                      onClick={() => handleDownloadResource(resource)}
                      className="ml-2"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {activeTab === "saved" 
                ? "You haven't saved any resources yet." 
                : "No resources match your search criteria."}
            </p>
            {activeTab === "saved" && (
              <Button 
                variant="outline" 
                onClick={() => setActiveTab("browse")} 
                className="mt-4"
              >
                Browse Resources
              </Button>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SelfHelpResources;
