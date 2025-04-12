
import { useEffect, useState } from "react";
import { Star, ThumbsUp, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface Review {
  id: number;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
  isAnonymous: boolean;
  helpful: number;
  isVerified: boolean;
  treatmentType?: string;
}

// Sample reviews data
const reviewsData: { [key: number]: Review[] } = {
  1: [
    {
      id: 1,
      patientName: "John D.",
      rating: 5,
      comment: "Dr. Johnson was very professional and helped me overcome my anxiety. I highly recommend her to anyone struggling with similar issues.",
      date: "2025-03-15",
      isAnonymous: false,
      helpful: 12,
      isVerified: true,
      treatmentType: "Anxiety"
    },
    {
      id: 2,
      patientName: "Anonymous",
      rating: 4,
      comment: "Very knowledgeable doctor. The treatment plan has been effective so far. The only reason for 4 stars is that sometimes appointments felt a bit rushed.",
      date: "2025-02-22",
      isAnonymous: true,
      helpful: 7,
      isVerified: true,
      treatmentType: "Depression"
    },
    {
      id: 3,
      patientName: "Sarah M.",
      rating: 5,
      comment: "Dr. Johnson provided me with excellent care and practical techniques to manage my trauma. She's patient, understanding, and very skilled.",
      date: "2025-01-30",
      isAnonymous: false,
      helpful: 15,
      isVerified: true,
      treatmentType: "Trauma"
    },
  ],
  2: [
    {
      id: 1,
      patientName: "David L.",
      rating: 5,
      comment: "Dr. Chen has been tremendously helpful with my work-related stress. His practical approach and mindfulness techniques have made a real difference in my life.",
      date: "2025-03-20",
      isAnonymous: false,
      helpful: 24,
      isVerified: true,
      treatmentType: "Stress Management"
    },
    {
      id: 2,
      patientName: "Anonymous",
      rating: 5,
      comment: "My partner and I were struggling with communication issues. Dr. Chen helped us develop better skills for listening and expressing our needs. Our relationship has improved significantly.",
      date: "2025-03-05",
      isAnonymous: true,
      helpful: 18,
      isVerified: true,
      treatmentType: "Relationship Issues"
    },
    {
      id: 3,
      patientName: "Michelle W.",
      rating: 4,
      comment: "Dr. Chen provided great insights and strategies for balancing my work and personal life. I'm giving 4 stars because it took a few sessions to find the approach that worked for me.",
      date: "2025-02-10",
      isAnonymous: false,
      helpful: 9,
      isVerified: true,
      treatmentType: "Work-Life Balance"
    },
    {
      id: 4,
      patientName: "Anonymous",
      rating: 5,
      comment: "Excellent therapist who really listens. Dr. Chen helped me identify unhealthy patterns and develop strategies to create more balance in my life.",
      date: "2025-01-25",
      isAnonymous: true,
      helpful: 14,
      isVerified: true,
      treatmentType: "Stress Management"
    },
  ],
  3: [
    {
      id: 1,
      patientName: "Anonymous",
      rating: 5,
      comment: "Dr. Rahman has been instrumental in helping me manage my bipolar disorder. The combination of medication and therapy has stabilized my mood significantly.",
      date: "2025-03-18",
      isAnonymous: true,
      helpful: 21,
      isVerified: true,
      treatmentType: "Bipolar Disorder"
    },
    {
      id: 2,
      patientName: "Taylor K.",
      rating: 5,
      comment: "I've struggled with anxiety for years, and Dr. Rahman is the first doctor who really understood my symptoms. Her treatment approach is thorough and effective.",
      date: "2025-02-27",
      isAnonymous: false,
      helpful: 16,
      isVerified: true,
      treatmentType: "Anxiety"
    },
  ],
  4: [
    {
      id: 1,
      patientName: "Anonymous",
      rating: 4,
      comment: "Dr. Wilson helped our family navigate a difficult transition. His approach is practical and compassionate. The only reason for 4 stars is that we sometimes had to wait for appointments.",
      date: "2025-03-12",
      isAnonymous: true,
      helpful: 11,
      isVerified: true,
      treatmentType: "Family Conflicts"
    },
    {
      id: 2,
      patientName: "Jennifer A.",
      rating: 5,
      comment: "My husband and I were on the verge of divorce when we started seeing Dr. Wilson. His couples therapy techniques have transformed our relationship for the better.",
      date: "2025-02-19",
      isAnonymous: false,
      helpful: 19,
      isVerified: true,
      treatmentType: "Couples Therapy"
    },
  ]
};

interface DoctorReviewsProps {
  doctorId: number;
}

const DoctorReviews = ({ doctorId }: DoctorReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [helpfulClicked, setHelpfulClicked] = useState<number[]>([]);

  useEffect(() => {
    // Simulate fetching reviews from API
    const fetchReviews = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const doctorReviews = reviewsData[doctorId] || [];
      setReviews(doctorReviews);
      setLoading(false);
    };
    
    fetchReviews();
  }, [doctorId]);

  const handleHelpfulClick = (reviewId: number) => {
    if (helpfulClicked.includes(reviewId)) return;
    
    setHelpfulClicked(prev => [...prev, reviewId]);
    setReviews(prev => 
      prev.map(review => 
        review.id === reviewId 
          ? { ...review, helpful: review.helpful + 1 } 
          : review
      )
    );
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${
          i < rating 
            ? 'text-yellow-400 fill-yellow-400' 
            : 'text-gray-300'
        }`} 
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Patient Reviews</h2>
      
      {loading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-b border-gray-100 pb-6 mb-6 last:border-0 last:pb-0 last:mb-0">
              <div className="flex items-center mb-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="ml-3">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20 mt-1" />
                </div>
              </div>
              <div className="mt-2">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No reviews yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-6 mb-6 last:border-0 last:pb-0 last:mb-0">
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <div className="bg-gray-100 rounded-full p-2 mr-3">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <h3 className="font-medium mr-2">
                        {review.isAnonymous ? "Anonymous" : review.patientName}
                      </h3>
                      {review.isVerified && (
                        <span className="text-xs bg-green-100 text-green-800 rounded-full px-2 py-0.5">
                          Verified Patient
                        </span>
                      )}
                    </div>
                    <div className="flex items-center mb-1">
                      {renderStars(review.rating)}
                      <span className="ml-2 text-sm text-gray-500">
                        {formatDate(review.date)}
                      </span>
                    </div>
                    {review.treatmentType && (
                      <span className="inline-block bg-calmBlue-100 text-calmBlue-800 text-xs rounded-full px-2 py-0.5 mb-2">
                        {review.treatmentType}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <p className="mt-3 text-gray-700">{review.comment}</p>
              
              <div className="mt-3 flex items-center">
                <Button 
                  variant="ghost"
                  size="sm"
                  className={`text-gray-500 text-xs ${helpfulClicked.includes(review.id) ? 'text-blue-600' : ''}`}
                  onClick={() => handleHelpfulClick(review.id)}
                  disabled={helpfulClicked.includes(review.id)}
                >
                  <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                  Helpful {review.helpful > 0 && `(${review.helpful})`}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorReviews;
