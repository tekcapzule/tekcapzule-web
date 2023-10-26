export interface CapsuleItem {
  author: string;
  bookmarks?: number;
  capsuleId?: string;
  description: string;
  duration?: number;
  editorsPick?: number;
  expiryDate?: string;
  imageUrl?: string;
  level?: string;
  publishedDate?: string;
  publisher?: string;
  recommendations?: number;
  resourceUrl: string;
  keyPoints?: string[]; 
  tags?: string[];
  title: string;
  topicCode: string;
  type: string;
  views?: number;
  quizzes?: Quiz[];
  badge?: CapsuleBadge;
  status?: CapsuleStatus;
  audience?: TargetAudience;
}

export class Quiz {
  id: string;
  question: string;
  hint: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  optionE: string;
  answerKeys: string[];
}

export enum TargetAudience {
  DEVELOPER = 'DEVELOPER',
  ENGINEERING_MANAGER = 'ENGINEERING_MANAGER',
  EXECUTIVE = 'EXECUTIVE',
  ARCHITECT = 'ARCHITECT',
  ALL = 'ALL',
}

export enum CapsuleBadge {
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  NONE = 'NONE',
}

export enum CapsuleStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  EXPIRED = 'EXPIRED',
  SUBMITTED = 'SUBMITTED',
}

export interface CapsuleCreation {
  topicCode: string;
  publishedDate: string;
  title: string;
  imageUrl: string;
  duration: number;
  author: string;
  description: string;
  publisher: string;
  resourceUrl: string;
  type: string;
  audience: string;
  level: string;
  expiryDate: string;
  editorsPick: number;
  tags: string[];
}

export interface MetadataItem {
  expiryInterval: string[];
  publisher: string[];
  targetAudience: string[];
  topicLevel: string[];
  capsuleType: string[];
}