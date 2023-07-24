
export interface IEventItem {
  code: string;
  eventDate: string;
  schedule: ISchedule;
  title: string;
  venue: string;
  summary: string;
  imageUrl: string;
  description: string;
  registrationUrl: string;
  eventRecordingUrl: string;
  promotion: IPromotion;
  pastPopularEvent: boolean;
  region: string;
  status: string;
}

export interface IPromotion {
  promoted: boolean;
  endsOnUtc: string;
  imageUrl: string;
  campaignUrl: string;
}
export interface ISchedule {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}