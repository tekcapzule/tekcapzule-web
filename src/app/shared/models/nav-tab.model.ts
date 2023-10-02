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
  enablePostLogin?: boolean;
  available?: string;
}

export interface SelectedMenu {
  selectedMenuItem: NavTab;
  selectedChildMenuItem: NavTab;
}
