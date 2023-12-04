import { AwsUserInfo } from '@app/core/services/auth/auth.service';

export interface TekUserInfo {
  userId: string;
  emailId: string;
  firstName: string;
  lastName: string;
  bookmarks: IBookmarkItem[];
  subscribedTopics: string[];
  phoneNumber: string;
  activeSince: string;
  status: string;
}

export interface IBookmarkItem {
  resourceType: string;
  resourceContentType: string;
  resourceId: string;
  title: string;
  resourceUrl: string;
  publisher: string;
}

export class TekUserInfoImpl implements TekUserInfo {
  userId: string;
  emailId: string;
  firstName: string;
  lastName: string;
  bookmarks: IBookmarkItem[];
  subscribedTopics: string[];
  phoneNumber: string;
  activeSince: string;
  status: string;

  constructor(awsUserInfo: AwsUserInfo) {
    this.userId = awsUserInfo.email;
    this.emailId = awsUserInfo.email;
    this.firstName = awsUserInfo.given_name;
    this.lastName = awsUserInfo.family_name;
    this.phoneNumber = awsUserInfo.phone_number;
    this.bookmarks = null;
    this.subscribedTopics = null;
    this.activeSince = new Date().toISOString();
    this.status = UserStatus.Active;
  }
}

export enum UserStatus {
  Active = 'Active',
  Inactive = 'Inactive',
}
