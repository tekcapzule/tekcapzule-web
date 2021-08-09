import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export enum ChannelEvent {
  SetActiveTab = 'SET_ACTIVE_TAB',
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
