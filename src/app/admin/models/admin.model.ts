import { CapsuleStatus, Quiz } from "@app/shared/models/capsule-item.model";


export interface AdminCapsuleDataItem {
  capsuleTitle: string;
  author: string;
  publishedDate: string;
  tags: string[];
  duration: number;
  category: string;
  description: string;
  questions: number;
  status: CapsuleStatus;
  capsuleId : string;
}

export class AdminCapsuleDataItemImpl implements AdminCapsuleDataItem {
  capsuleTitle: string;
  author: string;
  publishedDate: string;
  tags: string[];
  duration: number;
  category: string;
  description: string;
  questions: number;
  status: CapsuleStatus;
  capsuleId : string;
  constructor(
    capsuleTitle: string,
    author: string,
    publishedDate: string,
    tags: string[],
    duration: number,
    category: string,
    description: string,
    questions: number,
    status: CapsuleStatus,
    capsuleId : string
  ) {
    this.author = author;
    this.capsuleTitle = capsuleTitle;
    this.category = category;
    this.description = description;
    this.duration = duration;
    this.publishedDate = publishedDate;
    this.questions = questions;
    this.status = status;
    this.tags = tags;
    this.capsuleId = capsuleId;
  }
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
  code: string;
}

export class AdminTopicDataItemImpl implements AdminTopicDataItem {
  topicName: string;
  description: string;
  tags: string[];
  keyHighlights: number;
  status: AdminTopicStatus;
  code: string;
  constructor(
    topicName: string,
    description: string,
    tags: string[],
    keyHighlights: string[],
    status: string,
    code: string
  ) {
    this.code = code;
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
