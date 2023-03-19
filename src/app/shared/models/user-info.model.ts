export interface TekUserInfo {
  userId: string;
  active: boolean;
  firstName: string;
  lastName: string;
  bookmarks: string[];
  subscribedTopics: string[];
  emailId: string;
  contactNumber: string;
  activeSince: string;
}

export class TekUserInfoImpl implements TekUserInfo {
  userId: string;
  active: boolean;
  firstName: string;
  lastName: string;
  bookmarks: string[];
  subscribedTopics: string[];
  emailId: string;
  contactNumber: string;
  activeSince: string;

  constructor(userId: string, email: string, contact: string) {
    this.userId = userId;
    this.active = true;
    this.firstName = userId;
    this.lastName = null;
    this.bookmarks = null;
    this.subscribedTopics = null;
    this.emailId = email;
    this.contactNumber = contact;
    this.activeSince = new Date().toISOString();
  }
}
