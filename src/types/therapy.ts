
export type TherapyType = 
  | "cbt" 
  | "dbt" 
  | "act" 
  | "mindfulness"
  | "interpersonal"
  | "psychodynamic"
  | "other";

export type ContentType = 
  | "video" 
  | "audio" 
  | "text" 
  | "interactive" 
  | "worksheet" 
  | "exercise";

export interface TherapyProgram {
  id: string;
  title: string;
  description: string;
  type: TherapyType;
  targetConditions: string[];
  durationWeeks: number;
  sessionsPerWeek: number;
  createdAt: string;
  updatedAt: string;
  authorId?: string;
  authorName?: string;
  featured: boolean;
  imageUrl?: string;
}

export interface ProgramModule {
  id: string;
  programId: string;
  title: string;
  description: string;
  order: number;
  contentItems: ProgramContentItem[];
  homeworkItems: HomeworkItem[];
}

export interface ProgramContentItem {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  type: ContentType;
  url?: string;
  content?: string;
  duration?: number;
  order: number;
}

export interface HomeworkItem {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  instructions: string;
  dueDate?: string;
  type: ContentType;
  template?: string;
}

export interface UserProgramProgress {
  userId: string;
  programId: string;
  startDate: string;
  currentModuleId: string;
  completedModules: string[];
  completedContent: string[];
  completedHomework: string[];
  lastActivityDate: string;
}

export interface SelfHelpResource {
  id: string;
  title: string;
  description: string;
  category: string[];
  tags: string[];
  type: ContentType;
  url?: string;
  content?: string;
  createdAt: string;
  updatedAt: string;
}
