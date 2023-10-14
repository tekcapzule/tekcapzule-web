export interface TekUserInfo {
  userId: string;
  emailId: string;
  firstName: string;
  lastName: string;
  bookmarks: string[];
  subscribedTopics: string[];
  phoneNumber: string;
  activeSince: string;
  status: string;
}

export class TekUserInfoImpl implements TekUserInfo {
  userId: string;
  emailId: string;
  firstName: string;
  lastName: string;
  bookmarks: string[];
  subscribedTopics: string[];
  phoneNumber: string;
  activeSince: string;
  status: string;

  constructor(userId: string, email: string, phone: string, firstName: string, lastName: string) {
    this.userId = userId;
    this.emailId = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phone;
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
