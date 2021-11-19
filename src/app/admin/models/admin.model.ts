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

export enum AdminTopicStatus {
  Success = 'SUCCESS',
  Failure = 'FAILURE',
}

export interface AdminTopicDataItem {
  topicName: string;
  description: string;
  tags: string[];
  keyHighlights: number;
  status: AdminTopicStatus;
}

export class AdminTopicDataItemImpl implements AdminTopicDataItem {
  topicName: string;
  description: string;
  tags: string[];
  keyHighlights: number;
  status: AdminTopicStatus;
  constructor(
    topicName: string,
    description: string,
    tags: string[],
    keyHighlights: string[],
    status: string
  ) {
    this.description = description;
    this.tags = tags;
    this.topicName = topicName;
    this.keyHighlights = keyHighlights.length;
    if (status === 'INACTIVE') {
      this.status = AdminTopicStatus.Failure;
    } else if (status === 'ACTIVE') {
      this.status = AdminTopicStatus.Success;
    }
  }
}
