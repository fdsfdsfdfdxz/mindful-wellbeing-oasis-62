
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonialData = [
  {
    id: 1,
    content: "I was hesitant about online therapy, but this platform changed my mind. The therapist I matched with understood my anxiety issues perfectly, and I've made incredible progress in just a few months.",
    issue: "Anxiety",
    rating: 5,
    author: "Anonymous, 32"
  },
  {
    id: 2,
    content: "The convenience of accessing therapy from home has been life-changing for me as a busy parent. My therapist has helped me develop effective strategies for managing stress and finding work-life balance.",
    issue: "Stress Management",
    rating: 5,
    author: "Anonymous, 41"
  },
  {
    id: 3,
    content: "As someone who has struggled with depression for years, I appreciate the consistent support I receive through this platform. The weekly sessions and in-between messaging have been crucial during difficult times.",
    issue: "Depression",
    rating: 5,
    author: "Anonymous, 29"
  },
  {
    id: 4,
    content: "My partner and I were on the verge of separation when we decided to try couple's therapy here. The therapist's guidance helped us improve our communication and rebuild our relationship.",
    issue: "Relationship Issues",
    rating: 4,
    author: "Anonymous Couple"
  },
  {
    id: 5,
    content: "As someone dealing with social anxiety, the option to start with text therapy before moving to video sessions was perfect. It helped me build confidence gradually.",
    issue: "Social Anxiety",
    rating: 5,
    author: "Anonymous, 26"
  },
  {
    id: 6,
    content: "The anonymous consultation feature allowed me to discuss issues I've never felt comfortable sharing before. This has been a breakthrough in my healing journey.",
    issue: "Trauma Recovery",
    rating: 5,
    author: "Anonymous, 35"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [animateSlide, setAnimateSlide] = useState(false);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimateSlide(true);
        }
      },
      { threshold: 0.2 }
    );
    
    if (testimonialsRef.current) {
      observer.observe(testimonialsRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);

  // For larger screens, show 3 testimonials at a time
  // For medium screens, show 2
  // For small screens, show 1
  const getVisibleCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
    }
    return 1;
  };

  const visibleCount = getVisibleCount();
  const maxIndex = testimonialData.length - visibleCount;

  const nextSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex <= 0 ? maxIndex : prevIndex - 1
    );
  };

  // Auto advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Touch handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      // Swipe left
      nextSlide();
    } else if (touchEndX - touchStartX > 50) {
      // Swipe right
      prevSlide();
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index} 
        className={`h-4 w-4 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <section className="py-24 bg-gray-50 overflow-hidden" ref={testimonialsRef}>
      <div className="container-custom">
        <h2 className="section-title text-center animate-fade-in">What Our Clients Say</h2>
        <p className="section-subtitle text-center animate-fade-in animation-delay-200">
          Read about the experiences of people who have found support and healing through our platform.
        </p>
        
        <div className="relative mt-16">
          <div 
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className={`flex transition-all duration-700 ease-in-out ${animateSlide ? 'opacity-100' : 'opacity-0'}`}
              style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
            >
              {testimonialData.map((testimonial, index) => (
                <div 
                  key={testimonial.id} 
                  className="min-w-full md:min-w-[50%] lg:min-w-[33.333%] px-4"
                >
                  <div className={`bg-white p-6 rounded-xl shadow-smooth h-full flex flex-col relative transform transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${index === currentIndex ? 'ring-1 ring-calmBlue-200' : ''}`}>
                    <Quote className="text-calmBlue-100 h-10 w-10 absolute top-4 right-4" />
                    <div className="flex items-center mb-4">
                      {renderStars(testimonial.rating)}
                    </div>
                    <p className="text-gray-700 italic mb-4 flex-grow relative z-10">{testimonial.content}</p>
                    <div className="mt-auto">
                      <div className="inline-block bg-calmBlue-100 text-calmBlue-800 text-sm py-1 px-3 rounded-full mb-2">
                        {testimonial.issue}
                      </div>
                      <p className="text-gray-500 text-sm">{testimonial.author}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={prevSlide} 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm shadow-md z-10 rounded-full hidden md:flex hover:bg-calmBlue-50 border-calmBlue-200 transition-transform hover:scale-110"
          >
            <ChevronLeft className="h-4 w-4 text-calmBlue-600" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={nextSlide} 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-white/90 backdrop-blur-sm shadow-md z-10 rounded-full hidden md:flex hover:bg-calmBlue-50 border-calmBlue-200 transition-transform hover:scale-110"
          >
            <ChevronRight className="h-4 w-4 text-calmBlue-600" />
          </Button>
        </div>
        
        <div className="flex justify-center mt-8 space-x-2 md:hidden">
          {Array.from({ length: testimonialData.length - visibleCount + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-8 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'bg-calmBlue-500 w-10' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
