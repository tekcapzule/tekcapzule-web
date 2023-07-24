export interface NavTab {
  uniqueId: string;
  displayName: string;
  index?: number;
  navUrl: string;
  children?: NavTab[];
  isHidden?: boolean;
  showOnMobile?: boolean;
  desc?: string;
  viewType?: string;
}

export interface SelectedMenu {
  selectedMenuItem: NavTab;
  selectedChildMenuItem: NavTab;
}
