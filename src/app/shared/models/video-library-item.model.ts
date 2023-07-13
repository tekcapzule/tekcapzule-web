
export interface IVideoDetail {
  videoId: string;
  topicCode: string;
  title: string;
  summary: string;
  description: string;
  author: string;
  publisher: string;
  duration: string;
  videoUrl: string;
  imageUrl: string;
  promotion: IVideoPromotion;
  status: string;
}

export interface IVideoPromotion {
  promoted: boolean;
  endsOnUtc: string;
  imageUrl: string;
  campaignUrl: string;
}