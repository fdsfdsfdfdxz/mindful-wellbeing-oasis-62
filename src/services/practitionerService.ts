
import { Practitioner, PractitionerFilter, SpecialtyArea, TherapyApproach } from "@/types/practitioner";

// Mock practitioners data
const practitioners: Practitioner[] = [
  {
    id: "p1",
    name: "Dr. Sarah Johnson",
    profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    title: "Clinical Psychologist",
    verificationStatus: "verified",
    specialties: ["anxiety", "depression", "trauma"],
    approaches: ["cbt", "mindfulness", "solution-focused"],
    yearsOfExperience: 12,
    qualifications: [
      {
        id: "q1",
        title: "Ph.D. in Clinical Psychology",
        institution: "Stanford University",
        year: 2010,
        verified: true
      },
      {
        id: "q2",
        title: "Licensed Clinical Psychologist",
        institution: "California Board of Psychology",
        year: 2012,
        verified: true
      }
    ],
    languages: ["English", "Spanish"],
    about: "Dr. Johnson specializes in treating anxiety, depression, and trauma using evidence-based approaches. With over 12 years of experience, she provides compassionate and effective therapy tailored to each individual's needs.",
    ratings: {
      average: 4.9,
      count: 142
    },
    reviews: [
      {
        id: "r1",
        userId: "user1",
        userName: "Anonymous Client",
        rating: 5,
        comment: "Dr. Johnson helped me manage my anxiety with practical techniques that I use daily. Highly recommend!",
        date: "2023-11-15",
        verified: true,
        helpful: 24,
        isAnonymous: true
      }
    ],
    rate: {
      amount: 150,
      currency: "USD",
      per: "session"
    },
    availability: [
      {
        day: "monday",
        slots: [
          {
            startTime: "2023-01-01T09:00:00",
            endTime: "2023-01-01T10:00:00",
            available: true
          },
          {
            startTime: "2023-01-01T10:00:00",
            endTime: "2023-01-01T11:00:00",
            available: false
          }
        ]
      },
      {
        day: "wednesday",
        slots: [
          {
            startTime: "2023-01-03T14:00:00",
            endTime: "2023-01-03T15:00:00",
            available: true
          },
          {
            startTime: "2023-01-03T15:00:00",
            endTime: "2023-01-03T16:00:00",
            available: true
          }
        ]
      }
    ],
    insuranceAccepted: ["Blue Cross", "Aetna", "UnitedHealthcare"]
  },
  {
    id: "p2",
    name: "Dr. Michael Chen",
    profileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    title: "Licensed Psychotherapist",
    verificationStatus: "verified",
    specialties: ["relationships", "stress", "addiction"],
    approaches: ["psychodynamic", "humanistic", "family-systems"],
    yearsOfExperience: 15,
    qualifications: [
      {
        id: "q1",
        title: "Psy.D. in Clinical Psychology",
        institution: "Columbia University",
        year: 2007,
        verified: true
      }
    ],
    languages: ["English", "Mandarin"],
    about: "Dr. Chen specializes in relationship issues and stress management. His integrative approach draws from psychodynamic, humanistic, and family systems theories to help clients achieve their therapeutic goals.",
    ratings: {
      average: 4.7,
      count: 98
    },
    reviews: [
      {
        id: "r1",
        userId: "user2",
        userName: "J.D.",
        rating: 5,
        comment: "Dr. Chen helped my partner and I navigate some difficult communication issues. We're doing much better now.",
        date: "2023-10-05",
        verified: true,
        helpful: 17,
        isAnonymous: false
      }
    ],
    rate: {
      amount: 180,
      currency: "USD",
      per: "hour"
    },
    availability: [
      {
        day: "tuesday",
        slots: [
          {
            startTime: "2023-01-02T13:00:00",
            endTime: "2023-01-02T14:00:00",
            available: true
          }
        ]
      },
      {
        day: "thursday",
        slots: [
          {
            startTime: "2023-01-04T17:00:00",
            endTime: "2023-01-04T18:00:00",
            available: true
          }
        ]
      }
    ],
    insuranceAccepted: ["Blue Cross", "Cigna"]
  },
  {
    id: "p3",
    name: "Dr. Aisha Patel",
    profileImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    title: "Psychiatrist",
    verificationStatus: "verified",
    specialties: ["bipolar", "depression", "anxiety"],
    approaches: ["behavioral", "cbt", "psychodynamic"],
    yearsOfExperience: 10,
    qualifications: [
      {
        id: "q1",
        title: "M.D., Psychiatry",
        institution: "Johns Hopkins University",
        year: 2012,
        verified: true
      }
    ],
    languages: ["English", "Hindi", "Gujarati"],
    about: "Dr. Patel is a board-certified psychiatrist specializing in mood disorders and anxiety. She provides medication management alongside evidence-based therapeutic approaches.",
    ratings: {
      average: 4.8,
      count: 112
    },
    reviews: [],
    rate: {
      amount: 200,
      currency: "USD",
      per: "session"
    },
    availability: [
      {
        day: "monday",
        slots: [
          {
            startTime: "2023-01-01T15:00:00",
            endTime: "2023-01-01T16:00:00",
            available: true
          }
        ]
      },
      {
        day: "friday",
        slots: [
          {
            startTime: "2023-01-05T09:00:00",
            endTime: "2023-01-05T10:00:00",
            available: true
          }
        ]
      }
    ],
    insuranceAccepted: ["UnitedHealthcare", "Aetna", "Humana"]
  },
  {
    id: "p4",
    name: "Robert Johnson",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    title: "Licensed Marriage and Family Therapist",
    verificationStatus: "pending",
    specialties: ["relationships", "child-adolescent", "grief"],
    approaches: ["family-systems", "solution-focused", "cbt"],
    yearsOfExperience: 7,
    qualifications: [
      {
        id: "q1",
        title: "M.S. in Marriage and Family Therapy",
        institution: "University of Southern California",
        year: 2015,
        verified: true
      }
    ],
    languages: ["English"],
    about: "Robert specializes in helping couples and families navigate relationship difficulties, transitions, and grief. His approach focuses on building on strengths and finding practical solutions to relationship challenges.",
    ratings: {
      average: 4.6,
      count: 76
    },
    reviews: [],
    rate: {
      amount: 130,
      currency: "USD",
      per: "hour"
    },
    availability: [
      {
        day: "wednesday",
        slots: [
          {
            startTime: "2023-01-03T09:00:00",
            endTime: "2023-01-03T10:00:00",
            available: true
          }
        ]
      },
      {
        day: "saturday",
        slots: [
          {
            startTime: "2023-01-06T10:00:00",
            endTime: "2023-01-06T11:00:00",
            available: true
          }
        ]
      }
    ],
    insuranceAccepted: ["Blue Cross", "Cigna", "Aetna"]
  }
];

export const getSpecialtyLabel = (specialty: SpecialtyArea): string => {
  const labels: Record<SpecialtyArea, string> = {
    'anxiety': 'Anxiety',
    'depression': 'Depression',
    'trauma': 'Trauma',
    'addiction': 'Addiction',
    'relationships': 'Relationships',
    'stress': 'Stress Management',
    'grief': 'Grief and Loss',
    'eating-disorders': 'Eating Disorders',
    'child-adolescent': 'Child & Adolescent',
    'bipolar': 'Bipolar Disorder',
    'personality-disorders': 'Personality Disorders',
    'other': 'Other'
  };
  return labels[specialty];
};

export const getApproachLabel = (approach: TherapyApproach): string => {
  const labels: Record<TherapyApproach, string> = {
    'cbt': 'Cognitive Behavioral Therapy (CBT)',
    'dbt': 'Dialectical Behavior Therapy (DBT)',
    'psychodynamic': 'Psychodynamic',
    'humanistic': 'Humanistic',
    'mindfulness': 'Mindfulness-Based',
    'solution-focused': 'Solution-Focused',
    'emdr': 'EMDR',
    'family-systems': 'Family Systems',
    'behavioral': 'Behavioral',
    'other': 'Other'
  };
  return labels[approach];
};

export const getAllSpecialties = (): { value: SpecialtyArea, label: string }[] => {
  return [
    { value: 'anxiety', label: 'Anxiety' },
    { value: 'depression', label: 'Depression' },
    { value: 'trauma', label: 'Trauma' },
    { value: 'addiction', label: 'Addiction' },
    { value: 'relationships', label: 'Relationships' },
    { value: 'stress', label: 'Stress Management' },
    { value: 'grief', label: 'Grief and Loss' },
    { value: 'eating-disorders', label: 'Eating Disorders' },
    { value: 'child-adolescent', label: 'Child & Adolescent' },
    { value: 'bipolar', label: 'Bipolar Disorder' },
    { value: 'personality-disorders', label: 'Personality Disorders' },
    { value: 'other', label: 'Other' }
  ];
};

export const getAllApproaches = (): { value: TherapyApproach, label: string }[] => {
  return [
    { value: 'cbt', label: 'Cognitive Behavioral Therapy (CBT)' },
    { value: 'dbt', label: 'Dialectical Behavior Therapy (DBT)' },
    { value: 'psychodynamic', label: 'Psychodynamic' },
    { value: 'humanistic', label: 'Humanistic' },
    { value: 'mindfulness', label: 'Mindfulness-Based' },
    { value: 'solution-focused', label: 'Solution-Focused' },
    { value: 'emdr', label: 'EMDR' },
    { value: 'family-systems', label: 'Family Systems' },
    { value: 'behavioral', label: 'Behavioral' },
    { value: 'other', label: 'Other' }
  ];
};

export const getAllLanguages = (): string[] => {
  return ["English", "Spanish", "Mandarin", "French", "German", "Hindi", "Arabic", "Portuguese", "Russian", "Japanese", "Gujarati"];
};

export const getAllInsurances = (): string[] => {
  return ["Blue Cross", "Aetna", "UnitedHealthcare", "Cigna", "Humana", "Kaiser", "Medicare", "Medicaid"];
};

export const getPractitioners = async (): Promise<Practitioner[]> => {
  // Simulating API call latency
  await new Promise(resolve => setTimeout(resolve, 500));
  return practitioners;
};

export const searchPractitioners = async (
  query: string,
  filters?: PractitionerFilter
): Promise<Practitioner[]> => {
  // Simulating API call latency
  await new Promise(resolve => setTimeout(resolve, 800));
  
  let results = [...practitioners];
  
  // Apply search query
  if (query) {
    const lowercaseQuery = query.toLowerCase();
    results = results.filter(p => 
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.title.toLowerCase().includes(lowercaseQuery) ||
      p.about.toLowerCase().includes(lowercaseQuery) ||
      p.specialties.some(s => getSpecialtyLabel(s).toLowerCase().includes(lowercaseQuery)) ||
      p.approaches.some(a => getApproachLabel(a).toLowerCase().includes(lowercaseQuery))
    );
  }
  
  // Apply filters
  if (filters) {
    if (filters.specialties?.length) {
      results = results.filter(p => 
        filters.specialties?.some(s => p.specialties.includes(s))
      );
    }
    
    if (filters.approaches?.length) {
      results = results.filter(p => 
        filters.approaches?.some(a => p.approaches.includes(a))
      );
    }
    
    if (filters.languages?.length) {
      results = results.filter(p => 
        filters.languages?.some(l => p.languages.includes(l))
      );
    }
    
    if (filters.minRating !== undefined) {
      results = results.filter(p => p.ratings.average >= filters.minRating!);
    }
    
    if (filters.verificationStatus) {
      results = results.filter(p => p.verificationStatus === filters.verificationStatus);
    }
    
    if (filters.minExperience !== undefined) {
      results = results.filter(p => p.yearsOfExperience >= filters.minExperience!);
    }
    
    if (filters.maxRate !== undefined) {
      results = results.filter(p => p.rate.amount <= filters.maxRate!);
    }
    
    if (filters.availableDay) {
      results = results.filter(p => 
        p.availability.some(a => 
          a.day === filters.availableDay && a.slots.some(s => s.available)
        )
      );
    }

    if (filters.insuranceAccepted?.length) {
      results = results.filter(p => 
        filters.insuranceAccepted?.some(i => p.insuranceAccepted.includes(i))
      );
    }
  }
  
  return results;
};

export const getPractitionerById = async (id: string): Promise<Practitioner | null> => {
  // Simulating API call latency
  await new Promise(resolve => setTimeout(resolve, 300));
  return practitioners.find(p => p.id === id) || null;
};
