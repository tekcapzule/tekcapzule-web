import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@env/environment';

const EVENT_API_PATH = `${environment.apiEndpointTemplate}/event`.replace(
  '{{gateway}}',
  environment.eventApiGateway
);

@Injectable({
  providedIn: 'root',
})
export class EventApiService {
  constructor(private httpClient: HttpClient) {}

  getEventApiPath(): string {
    return EVENT_API_PATH;
  }
}
