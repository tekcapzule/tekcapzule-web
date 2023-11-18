import { EventEmitter, Injectable } from '@angular/core';
import { EventChannelOutput } from '@app/shared/models/channel-item.model';
import { Observable } from 'rxjs';

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
