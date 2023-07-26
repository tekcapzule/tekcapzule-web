
export interface IInterviewDetail {
  courseId: string;
  topicCode: string;
  title: string;
  summary: string;
  description: string;
  author: string;
  publisher: string;
  duration: string;
  resourceUrl: string;
  prizingModel: string;
  imageUrl: string;
  promotion: IInterviewPromotion;
  status: string;
}

export interface IInterviewPromotion {
  promoted: boolean;
  endsOnUtc: string;
  imageUrl: string;
  campaignUrl: string;
}