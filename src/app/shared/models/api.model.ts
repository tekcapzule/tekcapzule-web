export interface ApiSuccess {
  code: string;
  message?: string;
}

export interface ErrorModel {
  key: string;
  severity: string;
  // summary: string;
  detail: string;
}
