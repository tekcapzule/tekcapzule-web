export interface CapsuleItem {
  audience: string;
  author: string;
  badge: CapsuleBadge;
  bookmarks: number;
  capsuleId: string;
  description: string;
  duration: number;
  editorsPick: number;
  expiryDate: string;
  imageUrl: string;
  level: string;
  publishedDate: string;
  publisher: string;
  recommendations: number;
  resourceUrl: string;
  status: CapsuleStatus;
  tags: string[];
  title: string;
  topicCode: string;
  type: string;
  views: number;
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
}
