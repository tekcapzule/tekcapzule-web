import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEventItem } from '@app/shared/models/event-item.model';

import { environment } from '@env/environment';
import { Observable } from 'rxjs';

const EVENT_API_PATH = `${environment.apiEndpointTemplate}/event`
  .replace('{{api-gateway}}', environment.eventApiGateway)
  .replace('{{aws-region}}', environment.awsRegion);

const EVENTS_GETALLEVENTS_CACHE_KEY = 'com.tekcapsule.events.allevents';
@Injectable({
  providedIn: 'root',
})
export class EventApiService {
  constructor(private httpClient: HttpClient) {}

  getEventApiPath(): string {
    return EVENT_API_PATH;
  }

  getAllEvents(): Observable<IEventItem[]> {
    return this.httpClient.post<IEventItem[]>(
      `${EVENT_API_PATH}/getAll`,
      {},
      {
        params: {
          cache: 'yes',
          ckey: EVENTS_GETALLEVENTS_CACHE_KEY,
        },
      }
    );
  }
}
