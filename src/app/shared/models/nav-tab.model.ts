export interface NavTab {
  uniqueId: string;
  displayName: string;
  index?: number;
  navUrl: string;
  icon?: string;
  children?: NavTab[];
  isHidden?: boolean;
  showOnMobile?: boolean;
}

export interface SelectedMenu {
  selectedMenuItem: NavTab;
  selectedChildMenuItem: NavTab;
}
