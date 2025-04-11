
import { z } from "zod";

export type GroupType = "text" | "video" | "hybrid";
export type GroupCategory = "mental-health" | "relationships" | "personal-growth" | "trauma" | "addiction" | "grief";

export interface GroupMessage {
  id: string;
  groupId: string;
  userId: string;
  userDisplayName: string;
  isAnonymous: boolean;
  content: string;
  timestamp: string;
  attachments?: string[];
  replyTo?: string;
  reactions?: {
    type: "support" | "thanks" | "relate" | "helpful";
    count: number;
    userReacted: boolean;
  }[];
}

export const groupMessageSchema = z.object({
  groupId: z.string(),
  content: z.string().min(1).max(2000),
  isAnonymous: z.boolean().default(true),
  attachments: z.array(z.string()).optional(),
  replyTo: z.string().optional()
});

export type GroupMessageInput = z.infer<typeof groupMessageSchema>;

export interface SupportGroup {
  id: string;
  name: string;
  description: string;
  category: GroupCategory;
  type: GroupType;
  isModerated: boolean;
  moderatorId?: string;
  participantCount: number;
  maxParticipants: number;
  schedule: {
    frequency: "daily" | "weekly" | "biweekly" | "monthly";
    dayOfWeek?: number;
    time?: string;
    timezone?: string;
    nextSession: string;
  };
  tags: string[];
  createdAt: string;
  isActive: boolean;
}

export interface GroupSession {
  id: string;
  groupId: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  type: GroupType;
  moderatorId: string;
  participantIds: string[];
  status: "scheduled" | "active" | "completed" | "cancelled";
  recordingUrl?: string;
  resources?: {
    title: string;
    url: string;
    type: "document" | "video" | "link";
  }[];
}
