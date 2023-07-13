
export interface IResearchPaperDetail {
  researchPaperId: string;
  topicCode: string;
  title: string;
  summary: string;
  description: string;
  authors: string[];
  tags: string[];
  recommendations: number;
  publisher: string;
  publishedOn: string;
  duration: string;
  researchPaperUrl: string;
  imageUrl: string;
  promotion: IPromotion;
  status: string;
}

export interface IPromotion {
  promoted: boolean;
  endsOnUtc: string;
  imageUrl: string;
  campaignUrl: string;
}