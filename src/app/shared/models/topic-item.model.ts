export interface TopicItem {
  code: string;
  title: string;
  imageUrl: string;
  summary: string;
  description: string;
  categories: TopicCategoryItem[];
  status: string;
}

export interface TopicCategoryItem {
  title: string;
  summary: string;
  imageURL: string;
}
