
import { z } from "zod";

export type AssessmentCategory = 
  | "anxiety" 
  | "depression" 
  | "stress" 
  | "relationship" 
  | "general" 
  | "custom";

export type QuestionType = 
  | "scale" 
  | "multipleChoice" 
  | "openText" 
  | "boolean";

export interface AssessmentQuestion {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
  minValue?: number;
  maxValue?: number;
  required?: boolean;
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  category: AssessmentCategory;
  estimatedTime: string;
  questions: AssessmentQuestion[];
  createdAt: string;
  updatedAt: string;
  isStandardized: boolean;
}

export const assessmentResponseSchema = z.object({
  questionId: z.string(),
  value: z.union([z.string(), z.number(), z.boolean()]),
  notes: z.string().optional(),
  timestamp: z.string()
});

export type AssessmentResponse = z.infer<typeof assessmentResponseSchema>;

export interface AssessmentResult {
  id: string;
  assessmentId: string;
  userId: string;
  responses: AssessmentResponse[];
  completedAt: string;
  score?: number;
  interpretation?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  recommendations?: string;
}

export interface AssessmentProgress {
  assessmentId: string;
  userId: string;
  responses: AssessmentResponse[];
  lastQuestionId: string;
  startedAt: string;
  lastUpdatedAt: string;
}
