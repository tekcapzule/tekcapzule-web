import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export enum ChannelEvent {
  SetActiveFeedsTab = 'SET_ACTIVE_FEEDS_TAB',
  SetActiveTrendingTab = 'SET_ACTIVE_TRENDING_TAB',
  SetActiveEditorsTab = 'SET_ACTIVE_EDITORS_TAB',
  SetAdminCapsulesNavTab = 'SET_ADMIN_CAPSULES_NAV_TAB',
  LoadDataForActiveCapsuleTab = 'LOAD_DATA_FOR_ACTIVE_CAPSULE_TAB',
  HideAdminNavTabs = 'HIDE_ADMIN_NAV_TABS',
  ShowAdminNavTabs = 'SHOW_ADMIN_NAV_TABS',
  HideCapsuleNavTabs = 'HIDE_CAPSULE_NAV_TABS',
}

export interface EventChannelOutput {
  event: ChannelEvent;
  data?: any;
}

@Injectable({
  providedIn: 'root',
})
export class EventChannelService {
  private channel: EventEmitter<EventChannelOutput>;
  private observable: Observable<EventChannelOutput>;

  constructor() {
    this.channel = new EventEmitter<EventChannelOutput>();
    this.observable = this.channel.asObservable();
  }

  getChannel(): Observable<EventChannelOutput> {
    return this.observable;
  }

  publish(eventData: EventChannelOutput): void {
    this.channel.emit(eventData);
  }
}
