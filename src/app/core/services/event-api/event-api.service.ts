import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '@app/shared/utils';

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

  getAllEvents(): Observable<any> {
    return this.httpClient.post(
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
