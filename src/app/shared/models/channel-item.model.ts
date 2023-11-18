export interface EventChannelOutput {
  event: ChannelEvent;
  data?: any;
}
export enum ChannelEvent {
  SetActiveFeedsTab = 'SET_ACTIVE_FEEDS_TAB',
  SetActiveTrendingTab = 'SET_ACTIVE_TRENDING_TAB',
  SetActiveEditorsTab = 'SET_ACTIVE_EDITORS_TAB',
  SetAdminCapsulesNavTab = 'SET_ADMIN_CAPSULES_NAV_TAB',
  LoadDataForActiveCapsuleTab = 'LOAD_DATA_FOR_ACTIVE_CAPSULE_TAB',
  HideAdminNavTabs = 'HIDE_ADMIN_NAV_TABS',
  ShowAdminNavTabs = 'SHOW_ADMIN_NAV_TABS',
  HideCapsuleNavTabs = 'HIDE_CAPSULE_NAV_TABS',
  ShowBrowseByTopic = 'SHOW_BROWSE_BY_TOPIC',
  ShowHideFilter = 'SHOW_HIDE_FILTER',
  MenuClick = 'MENU_CLICK',
  ShowHideSort = 'SHOW_HIDE_SORT'
}
