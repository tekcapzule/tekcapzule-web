import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '@app/shared/models/market.model';

import { environment } from '@env/environment';
import { Observable } from 'rxjs';

const MARKET_PLACE_API_PATH = `${environment.apiEndpointTemplate}/marketplace`
  .replace('{{api-gateway}}', environment.marketplaceApiGateway)
  .replace('{{aws-region}}', environment.awsRegion);

const MARKET_PLACE_GETALLEVENTS_CACHE_KEY = 'com.tekcapsule.market.allProducts';
@Injectable({
  providedIn: 'root',
})
export class MarketPlaceApiService {
  constructor(private httpClient: HttpClient) {}

  getEventApiPath(): string {
    return MARKET_PLACE_API_PATH;
  }

  getAllProducts(): Observable<IProduct[]> {
    return this.httpClient.post<IProduct[]>(
      `${MARKET_PLACE_API_PATH}/getAll`,
      {},
      {
        params: {
          cache: 'yes',
          ckey: MARKET_PLACE_GETALLEVENTS_CACHE_KEY,
        },
      }
    );
  }
}
