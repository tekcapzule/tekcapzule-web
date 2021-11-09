import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@env/environment';

const CAPSULE_API_PATH = `${environment.apiEndpointTemplate}/capsule`.replace(
  '{{gateway}}',
  environment.capsuleApiGateway
);

@Injectable({
  providedIn: 'root',
})
export class CapsuleApiService {
  constructor(private httpClient: HttpClient) {}

  getCapsuleApiPath(): string {
    return CAPSULE_API_PATH;
  }
}
