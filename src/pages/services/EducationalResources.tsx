
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Search, Film, FileText, PanelLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const EducationalResources = () => {
  const { language, isRTL } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Sample resource data
  const resources = [
    {
      id: 1,
      title: "Understanding Anxiety: Causes, Symptoms, and Management",
      type: "article",
      category: "anxiety",
      summary: "A comprehensive overview of anxiety disorders and effective coping strategies.",
      readTime: "8 min read",
      icon: <FileText className="h-6 w-6" />
    },
    {
      id: 2,
      title: "Meditation Basics for Mental Wellbeing",
      type: "video",
      category: "mindfulness",
      summary: "Learn fundamental meditation techniques to reduce stress and improve focus.",
      readTime: "12 min video",
      icon: <Film className="h-6 w-6" />
    },
    {
      id: 3,
      title: "The Science Behind Depression",
      type: "article",
      category: "depression",
      summary: "Explore the biological, psychological, and social factors contributing to depression.",
      readTime: "10 min read",
      icon: <FileText className="h-6 w-6" />
    },
    {
      id: 4,
      title: "Building Healthy Relationship Dynamics",
      type: "article",
      category: "relationships",
      summary: "Learn communication skills and boundary-setting for healthier relationships.",
      readTime: "7 min read",
      icon: <FileText className="h-6 w-6" />
    },
    {
      id: 5,
      title: "Guided Relaxation for Better Sleep",
      type: "audio",
      category: "sleep",
      summary: "A calming audio session to help you unwind and prepare for restful sleep.",
      readTime: "15 min audio",
      icon: <Film className="h-6 w-6" />
    },
    {
      id: 6,
      title: "Cognitive Behavioral Therapy Techniques",
      type: "video",
      category: "therapy",
      summary: "Learn practical CBT exercises you can implement at home.",
      readTime: "18 min video",
      icon: <Film className="h-6 w-6" />
    },
    {
      id: 7,
      title: "Parenting Through Tough Times: A Guide",
      type: "article",
      category: "parenting",
      summary: "Supporting your children while managing your own mental wellbeing.",
      readTime: "12 min read",
      icon: <FileText className="h-6 w-6" />
    },
    {
      id: 8,
      title: "Understanding Trauma and Its Effects",
      type: "article",
      category: "trauma",
      summary: "Learn about trauma responses and the path to recovery.",
      readTime: "11 min read",
      icon: <FileText className="h-6 w-6" />
    }
  ];

  const categories = [
    "All", 
    "Anxiety",
    "Depression",
    "Mindfulness",
    "Relationships",
    "Therapy",
    "Trauma",
    "Sleep",
    "Parenting"
  ];

  // Filter resources based on search query and selected category
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          resource.summary.toLowerCase().includes(searchQuery.toLowerCase());
                          
    const matchesCategory = !selectedCategory || 
                           selectedCategory.toLowerCase() === 'all' ||
                           resource.category.toLowerCase() === selectedCategory.toLowerCase();
                            
    return matchesSearch && matchesCategory;
  });

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
          {translate('services', 'educationalTitle', language) || "Educational Resources Library"}
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          {translate('services', 'educationalDesc', language) || 
            "Access our collection of expert-created resources to deepen your understanding of mental health topics and develop self-help skills."}
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="flex items-center mb-4">
                <PanelLeft className="h-5 w-5 text-calmBlue-500 mr-2" />
                <h2 className="text-lg font-bold">Resource Types</h2>
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-calmBlue-500 focus:ring-calmBlue-500" />
                  <span className="ml-2">Articles</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-calmBlue-500 focus:ring-calmBlue-500" />
                  <span className="ml-2">Videos</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-calmBlue-500 focus:ring-calmBlue-500" />
                  <span className="ml-2">Audio</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-calmBlue-500 focus:ring-calmBlue-500" />
                  <span className="ml-2">Worksheets</span>
                </label>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <BookOpen className="h-5 w-5 text-calmBlue-500 mr-2" />
                <h2 className="text-lg font-bold">Categories</h2>
              </div>
              
              <div className="space-y-2">
                {categories.map((category) => (
                  <div 
                    key={category}
                    className={`px-3 py-1.5 rounded-md cursor-pointer transition-colors ${selectedCategory === category || (category === 'All' && !selectedCategory) ? 'bg-calmBlue-100 text-calmBlue-800' : 'hover:bg-gray-100'}`}
                    onClick={() => setSelectedCategory(category === 'All' ? null : category)}
                  >
                    {category}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search resources..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h2 className="font-medium">
                  {filteredResources.length} resources found {selectedCategory ? `in "${selectedCategory}"` : ''}
                </h2>
              </div>
              
              <div className="divide-y divide-gray-100">
                {filteredResources.length > 0 ? (
                  filteredResources.map((resource) => (
                    <div key={resource.id} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${resource.type === 'article' ? 'bg-blue-100 text-blue-600' : resource.type === 'video' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                          {resource.icon}
                        </div>
                        <div className="ml-4">
                          <h3 className="font-bold text-lg mb-1">{resource.title}</h3>
                          <p className="text-gray-600 mb-2">{resource.summary}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="capitalize">{resource.type}</span>
                            <span className="mx-2">•</span>
                            <span>{resource.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-1">No resources found</h3>
                    <p className="text-gray-500">Try adjusting your search or filters</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EducationalResources;
