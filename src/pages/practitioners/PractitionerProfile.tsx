
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  MessageSquare,
  Star,
  ShieldCheck,
  Clock,
  AlertTriangle,
  Check,
  Bookmark,
  Share,
  ThumbsUp,
  Calendar as CalendarIcon,
  FileText,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { getPractitionerById, getSpecialtyLabel, getApproachLabel } from "@/services/practitionerService";
import { PractitionerReview } from "@/types/practitioner";

const ReviewCard: React.FC<{ review: PractitionerReview }> = ({ review }) => {
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center">
            <div className="font-medium">
              {review.isAnonymous ? "Anonymous Client" : review.userName}
            </div>
            {review.verified && (
              <Badge variant="outline" className="ml-2 text-xs flex items-center">
                <Check className="h-3 w-3 mr-1" /> Verified Client
              </Badge>
            )}
          </div>
          <div className="text-sm text-gray-500">
            {new Date(review.date).toLocaleDateString()}
          </div>
        </div>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
            />
          ))}
        </div>
      </div>
      
      {review.comment && (
        <div className="mt-3 text-gray-700">
          "{review.comment}"
        </div>
      )}
      
      <div className="mt-3 flex justify-between items-center">
        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
          <ThumbsUp className="h-4 w-4 mr-2" />
          Helpful ({review.helpful})
        </Button>
      </div>
    </div>
  );
};

const PractitionerProfile: React.FC = () => {
  const { practitionerId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("about");
  
  const {
    data: practitioner,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["practitioner", practitionerId],
    queryFn: () => getPractitionerById(practitionerId || ""),
    enabled: !!practitionerId,
  });
  
  if (isLoading) {
    return (
      <div className="container max-w-6xl mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <Skeleton className="h-80 w-full mb-4 rounded-lg" />
            <Skeleton className="h-10 w-full mb-2" />
            <Skeleton className="h-6 w-2/3 mb-6" />
            <Skeleton className="h-10 w-full mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="w-full md:w-2/3">
            <Skeleton className="h-12 w-3/4 mb-6" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-full mb-6" />
            <Skeleton className="h-8 w-32 mb-4" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </div>
    );
  }
  
  if (isError || !practitioner) {
    toast({
      title: "Error",
      description: `Failed to load practitioner profile: ${(error as Error)?.message || "Practitioner not found"}`,
      variant: "destructive",
    });
    return (
      <div className="container max-w-6xl mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Practitioner Not Found</h1>
        <p className="mb-6">The practitioner you're looking for does not exist or there was an error loading their profile.</p>
        <Button onClick={() => navigate("/practitioners")}>
          Back to Directory
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/3">
          <div className="sticky top-24">
            <div className="rounded-lg overflow-hidden mb-6">
              <img
                src={practitioner.profileImage}
                alt={practitioner.name}
                className="w-full h-80 object-cover object-center"
              />
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <h2 className="text-2xl font-bold">{practitioner.name}</h2>
                {practitioner.verificationStatus === "verified" && (
                  <div className="flex items-center text-green-600">
                    <ShieldCheck className="h-5 w-5 mr-1" />
                    <span className="text-sm font-medium">Verified</span>
                  </div>
                )}
                {practitioner.verificationStatus === "pending" && (
                  <div className="flex items-center text-yellow-600">
                    <Clock className="h-5 w-5 mr-1" />
                    <span className="text-sm font-medium">Pending</span>
                  </div>
                )}
                {practitioner.verificationStatus === "unverified" && (
                  <div className="flex items-center text-gray-600">
                    <AlertTriangle className="h-5 w-5 mr-1" />
                    <span className="text-sm font-medium">Unverified</span>
                  </div>
                )}
              </div>
              <p className="text-gray-600 mb-2">{practitioner.title}</p>
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold ml-1">{practitioner.ratings.average}</span>
                </div>
                <span className="text-gray-500 ml-1">
                  ({practitioner.ratings.count} reviews)
                </span>
              </div>
              <p className="text-lg font-semibold mb-2">
                ${practitioner.rate.amount}/{practitioner.rate.per}
              </p>
            </div>
            
            <div className="space-y-3 mb-6">
              <Button className="w-full flex items-center justify-center">
                <Calendar className="mr-2 h-5 w-5" />
                Book Appointment
              </Button>
              <Button variant="outline" className="w-full flex items-center justify-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Send Message
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">At a Glance</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start">
                    <CalendarIcon className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                    <div>
                      <span className="font-medium">Experience</span>
                      <p>{practitioner.yearsOfExperience} years</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FileText className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                    <div>
                      <span className="font-medium">Languages</span>
                      <p>{practitioner.languages.join(', ')}</p>
                    </div>
                  </div>
                  {practitioner.contactInfo?.address && (
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                      <div>
                        <span className="font-medium">Location</span>
                        <p>{practitioner.contactInfo.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="w-full md:w-2/3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="specialties">Specialties</TabsTrigger>
              <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
              <TabsTrigger value="reviews">
                Reviews ({practitioner.reviews.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="mt-6">
              <h3 className="text-xl font-bold mb-4">About {practitioner.name}</h3>
              <p className="text-gray-700 mb-6 whitespace-pre-line">
                {practitioner.about}
              </p>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" className="flex items-center">
                  <Bookmark className="mr-2 h-4 w-4" />
                  Save
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Share className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="specialties" className="mt-6">
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3">Areas of Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {practitioner.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="px-3 py-1 text-sm">
                      {getSpecialtyLabel(specialty)}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3">Therapeutic Approaches</h3>
                <div className="flex flex-wrap gap-2">
                  {practitioner.approaches.map((approach) => (
                    <Badge key={approach} variant="outline" className="px-3 py-1 text-sm">
                      {getApproachLabel(approach)}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {practitioner.insuranceAccepted.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold mb-3">Insurance Accepted</h3>
                  <div className="flex flex-wrap gap-2">
                    {practitioner.insuranceAccepted.map((insurance) => (
                      <Badge key={insurance} variant="outline" className="px-3 py-1 text-sm">
                        {insurance}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="qualifications" className="mt-6">
              <h3 className="text-lg font-bold mb-4">Education & Certifications</h3>
              <div className="space-y-6">
                {practitioner.qualifications.map((qualification) => (
                  <div key={qualification.id} className="flex items-start">
                    {qualification.verified ? (
                      <ShieldCheck className="h-5 w-5 mr-3 text-green-500 flex-shrink-0" />
                    ) : (
                      <Clock className="h-5 w-5 mr-3 text-yellow-500 flex-shrink-0" />
                    )}
                    <div>
                      <h4 className="font-semibold">{qualification.title}</h4>
                      <p className="text-gray-600">{qualification.institution}</p>
                      <p className="text-gray-500 text-sm">{qualification.year}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-8" />
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Verification Process</h3>
                <p className="text-gray-700 text-sm">
                  We verify all practitioner credentials through a rigorous process that includes
                  checking educational qualifications, licensure status, and professional standing.
                  A verified badge indicates that we've confirmed the practitioner's credentials.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Client Reviews</h3>
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(practitioner.ratings.average)
                            ? "text-yellow-500 fill-yellow-500"
                            : i < practitioner.ratings.average
                            ? "text-yellow-500 fill-yellow-500 half-filled"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold ml-2">{practitioner.ratings.average}</span>
                  <span className="text-gray-500 ml-1">
                    ({practitioner.ratings.count} reviews)
                  </span>
                </div>
              </div>
              
              {practitioner.reviews.length > 0 ? (
                <div className="space-y-4">
                  {practitioner.reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">No reviews yet</h3>
                  <p className="text-gray-500">
                    This practitioner doesn't have any reviews yet.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PractitionerProfile;
