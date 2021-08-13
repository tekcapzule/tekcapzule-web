export enum AdminCapsuleStatus {
  Approved = 'Approved',
  Rejected = 'Rejected',
  Pending = 'Pending',
  Processing = 'Processing',
  Active = 'Active',
  Disabled = 'Disabled',
}

export interface AdminCapsuleDataItem {
  capsuleTitle: string;
  author: string;
  publishedDate: string;
  tags: string[];
  duration: string;
  category: string;
  description: string;
  keyHighlights: number;
  questions: string;
  status: AdminCapsuleStatus;
}

export interface AdminFeedbackDataItem {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
}

export interface AdminTopicDataItem {
  topicName: string;
  description: string;
  tags: string[];
  keyHighlights: number;
  status: AdminTopicStatus;
}

export enum AdminTopicStatus {
  Success = 'SUCCESS',
  Failure = 'FAILURE',
}
