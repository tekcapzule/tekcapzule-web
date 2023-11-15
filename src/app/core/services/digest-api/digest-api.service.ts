import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IDigestItem } from '@app/shared/models/digest-item.model';
import { environment } from '@env/environment';
import { ApiSuccess } from '@app/shared/models';

const DIGEST_API_PATH = `${environment.apiEndpointTemplate}/news-digest`
  .replace('{{api-gateway}}', environment.digestApiGateway)
  .replace('{{aws-region}}', environment.awsRegion);

const DIGEST_ALLDIGEST_CACHE_KEY = 'com.tekcapzule.digest.alldigest';

@Injectable({
  providedIn: 'root',
})
export class DigestApiService {

  constructor( private httpClient: HttpClient ) {}

  getDigestApiPath(): string {
    return DIGEST_API_PATH;
  }

  getAllDigest(): Observable<IDigestItem[]> {
    return this.httpClient.post<IDigestItem[]>(
      `${DIGEST_API_PATH}/getAll`,
      {},
      {
        params: {
          cache: 'yes',
          ckey: DIGEST_ALLDIGEST_CACHE_KEY,
        },
      }
    );
  }

  updateRecommendCount(code: string): Observable<ApiSuccess> {
    return this.httpClient
      .post<ApiSuccess>(`${DIGEST_API_PATH}/recommend`, { code });
  }
}
