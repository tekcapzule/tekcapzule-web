
export interface ICourseDetail {
  courseId: string;
  topicCode: string;
  title: ISchedule;
  summary: string;
  description: string;
  author: string;
  publisher: string;
  duration: string;
  courseUrl: string;
  modules: Imodule[];
  prizingModel: string;
  deliveryMode: string;
  learningMode: string;
  imageUrl: string;
  promotion: ICoursePromotion;
  status: string;
}

export interface ICoursePromotion {
  promoted: boolean;
  endsOnUtc: string;
  imageUrl: string;
  campaignUrl: string;
}
export interface Imodule {
  title: ISchedule;
  duration: string;
  description: string;
}
export interface ISchedule {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}