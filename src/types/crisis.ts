
import { z } from "zod";

export type CrisisSeverity = "none" | "low" | "medium" | "high";

export interface CrisisAssessment {
  id: string;
  userId: string;
  timestamp: string;
  responses: CrisisQuestion[];
  severityRating: CrisisSeverity;
  riskFactors: string[];
  recommendedActions: string[];
  specialistNotes?: string;
  followUpDate?: string;
  isResolved: boolean;
}

export interface CrisisQuestion {
  id: string;
  question: string;
  response: string | number | boolean;
  weight: number; // Used in severity calculation
}

export const safetyPlanSchema = z.object({
  userId: z.string(),
  warningSignsPersonal: z.string(),
  copingStrategies: z.array(z.string()),
  socialSupports: z.array(z.object({
    name: z.string(),
    relationship: z.string(),
    phone: z.string(),
    available: z.boolean()
  })),
  professionalContacts: z.array(z.object({
    name: z.string(),
    role: z.string(),
    phone: z.string(),
    email: z.string().optional(),
    hours: z.string().optional()
  })),
  emergencyContacts: z.array(z.object({
    service: z.string(),
    phone: z.string(),
    address: z.string().optional()
  })),
  environmentSafety: z.object({
    removedDangerousItems: z.boolean(),
    safeEnvironment: z.boolean(),
    supportPersonAware: z.boolean()
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
  isActive: z.boolean()
});

export type SafetyPlan = z.infer<typeof safetyPlanSchema>;

export interface CrisisProtocol {
  id: string;
  title: string;
  description: string;
  steps: {
    order: number;
    action: string;
    details: string;
    escalationTrigger?: string;
  }[];
  escalationLevels: {
    level: number;
    description: string;
    actions: string[];
  }[];
  requiredInformation: string[];
  emergencyContactInfo: {
    service: string;
    number: string;
    when: string;
  }[];
}
