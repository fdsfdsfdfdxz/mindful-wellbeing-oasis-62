
export type VerificationStatus = 'verified' | 'pending' | 'unverified';
export type SpecialtyArea = 'anxiety' | 'depression' | 'trauma' | 'addiction' | 'relationships' | 'stress' | 'grief' | 'eating-disorders' | 'child-adolescent' | 'bipolar' | 'personality-disorders' | 'other';
export type TherapyApproach = 'cbt' | 'dbt' | 'psychodynamic' | 'humanistic' | 'mindfulness' | 'solution-focused' | 'emdr' | 'family-systems' | 'behavioral' | 'other';

export interface Qualification {
  id: string;
  title: string;
  institution: string;
  year: number;
  verified: boolean;
}

export interface PractitionerReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment?: string;
  date: string;
  verified: boolean;
  helpful: number;
  isAnonymous: boolean;
}

export interface Availability {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  slots: {
    startTime: string; // ISO time string
    endTime: string; // ISO time string
    available: boolean;
  }[];
}

export interface Practitioner {
  id: string;
  name: string;
  profileImage: string;
  title: string;
  verificationStatus: VerificationStatus;
  specialties: SpecialtyArea[];
  approaches: TherapyApproach[];
  yearsOfExperience: number;
  qualifications: Qualification[];
  languages: string[];
  about: string;
  ratings: {
    average: number;
    count: number;
  };
  reviews: PractitionerReview[];
  rate: {
    amount: number;
    currency: string;
    per: 'session' | 'hour';
  };
  availability: Availability[];
  insuranceAccepted: string[];
  contactInfo?: {
    email: string;
    phone: string;
    address?: string;
  };
}

export type PractitionerFilter = {
  specialties?: SpecialtyArea[];
  approaches?: TherapyApproach[];
  languages?: string[];
  minRating?: number;
  verificationStatus?: VerificationStatus;
  minExperience?: number;
  maxRate?: number;
  availableDay?: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  insuranceAccepted?: string[];
};
