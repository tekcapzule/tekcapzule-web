export interface IProduct {
  code: string;
  title: string;
  category: string;
  productType: string;
  prizingModel: string;
  summary: string;
  description: string;
  vendor: string;
  tags: string[];
  website: string;
  recommendations: number;
  imageUrl: string;
  productDemo: IProductDetails;
  userGuides: IProductDetails;
  status: string;
}

export interface IProductDetails {
  title: string;
  durationInMinutes: string;
  summary: string;
  description: string;
  videoUrl: string;
  imageUrl: string;
}
