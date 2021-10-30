import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Gateway FQDN needs to be taken from env file (will do this at the end).
// TODO: Fill in correct {{user-gateway}}.
const USER_API_GATEWAY_FQDN = 'https://{{user-gateway}}.execute-api.us-east-2.amazonaws.com';
const USER_API_PATH = `${USER_API_GATEWAY_FQDN}/dev/user`;

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private httpClient: HttpClient) {}

  getUser(): Observable<any> {
    return this.httpClient.post(`${USER_API_PATH}/get`, null);
  }
}
