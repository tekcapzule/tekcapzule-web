import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { TopicItem } from '@app/shared/models';
import { cacheManager, Constants } from '@app/shared/utils';
import { AuthService } from '@app/core/services/auth/auth.service';
import { UserApiService } from '@app/core/services/user-api/user-api.service';
import { TekByteItem } from '@app/shared/models/tekbyte-item.model';

const TEKBYTE_API_PATH = `${environment.apiEndpointTemplate}/tekbyte`
  .replace('{{api-gateway}}', environment.tekByteApiGateway)
  .replace('{{aws-region}}', environment.awsRegion);

const TEKBYTE_ALLTEKBYTE_CACHE_KEY = 'com.tekcapsule.tekbyte.alltekbyte';
const TEKBYTE_GETTEKBYTE_CACHE_KEY = 'com.tekcapsule.tekbyte.gettekbyte.<code>';

@Injectable({
  providedIn: 'root',
})
export class TekByteApiService {
  // userInfo: UserInfo = null;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private auth: AuthService,
    private userApi: UserApiService
  ) {
    // this.userInfo = this.userApi.getUserCache();
  }

  getTekByteApiPath(): string {
    return TEKBYTE_API_PATH;
  }

  createTekByte(tekByte: any): Observable<any> {
    const allTekByteCache = cacheManager.getItem(TEKBYTE_ALLTEKBYTE_CACHE_KEY);

    if (allTekByteCache) {
      const allTekBytes = allTekByteCache.body as TekByteItem[];
      allTekBytes.push(tekByte);
      cacheManager.setItem(TEKBYTE_ALLTEKBYTE_CACHE_KEY, {
        body: allTekBytes,
        expiry: allTekByteCache.expiry,
      });
    }

    return this.httpClient.post(`${TEKBYTE_API_PATH}/create`, tekByte);
  }

  updateTekByte(tekByte: any): Observable<any> {
    return this.httpClient.post(`${TEKBYTE_API_PATH}/update`, tekByte);
  }

  getAllTekByte(): Observable<TekByteItem[]> {
    return this.httpClient.post<TekByteItem[]>(
      `${TEKBYTE_API_PATH}/getAll`,
      {},
      {
        params: {
          cache: 'yes',
          ckey: TEKBYTE_ALLTEKBYTE_CACHE_KEY,
        },
      }
    );
  }

  getTekByte(code: string): Observable<TekByteItem> {
    return this.httpClient.post<TekByteItem>(`${TEKBYTE_API_PATH}/get`, code, {
      params: {
        cache: 'no',
      },
    });
  }

  disableTekByte(code: string): Observable<any> {
    const allTekByteCache = cacheManager.getItem(TEKBYTE_ALLTEKBYTE_CACHE_KEY);

    if (allTekByteCache) {
      const allTekByte = allTekByteCache.body as TekByteItem[];
      allTekByte.find(tekbyte => tekbyte.code === code).status = 'INACTIVE';
      cacheManager.setItem(TEKBYTE_ALLTEKBYTE_CACHE_KEY, {
        body: allTekByte,
        expiry: allTekByteCache.expiry,
      });
    }

    return this.httpClient.post(`${TEKBYTE_API_PATH}/disable`, { capsuleId: code });
  }
}
