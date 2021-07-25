import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export enum ChannelEvent {
  CreateCapsule = 'CREATE_CAPSULE',
  EditCapsule = 'EDIT_CAPSULE',
  Search = 'SEARCH',
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

  get eventChannel(): Observable<EventChannelOutput> {
    return this.observable;
  }

  publish(data?: any): void {
    this.channel.emit(data);
  }
}
