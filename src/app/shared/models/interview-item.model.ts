
export interface IInterviewDetail {
  courseId: string;
  topicCode: string;
  title: string;
  summary: string;
  description: string;
  author: string;
  publisher: string;
  duration: string;
  courseUrl: string;
  prizingModel: string;
  imageUrl: string;
  promotion: IInterviewPromotion;
  status: string;
  resourceUrl: string;
}

export interface IInterviewPromotion {
  promoted: boolean;
  endsOnUtc: string;
  imageUrl: string;
  campaignUrl: string;
}