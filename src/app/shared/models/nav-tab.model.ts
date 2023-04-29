export interface NavTab {
  uniqueId: string;
  displayName: string;
  index?: number;
  navUrl: string;
  children?: NavTab[];
  isHidden?: boolean;
  showOnMobile?: boolean;
}
