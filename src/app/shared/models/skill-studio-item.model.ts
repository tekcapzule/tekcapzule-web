
export interface ILearningMaterial {
  learningMaterialId: string;
  learningMaterialType: string;
  topicCode: string;
  topicName: string;
  subTopicCode: string;
  title: string;
  summary: string;
  description: string;
  publisher: string;
  publishedOn: string;
  authors: string[];
  tags: string[];
  duration: any;
  resourceUrl: string;
  imageUrl: string;
  modules: Imodule[];
  deliveryMode: string;
  learningMode: string;
  overview: string;
  level: string;
  targetAudience: string;
  schedule: any;
  region: string;
  venue: ICoursePromotion;
  registrationUrl: number;
  prizingModel: string;
  promotion: any;
  isRecommended: boolean;
  recommendations: string;
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