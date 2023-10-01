export interface NavTab {
  uniqueId: string;
  displayName: string;
  index?: number;
  navUrl: string;
  children?: NavTab[];
  isHidden?: boolean;
  showOnMobile?: boolean;
  desc?: string;
  isPageReady?: boolean;
  viewType?: string;
  disablePreLogin?: boolean;
  displayOnLogin?: boolean;
}

export interface SelectedMenu {
  selectedMenuItem: NavTab;
  selectedChildMenuItem: NavTab;
}
