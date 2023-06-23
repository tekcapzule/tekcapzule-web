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
  productDemo: IProductDet;
  userGuides: IProductDet;
  status: string;
}

export interface IProductDet {
  title: string;
  durationInMinutes: string;
  summary: string;
  description: string;
  videoUrl: string;
  imageUrl: string;
}
