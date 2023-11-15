import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { share, tap } from 'rxjs/operators';

import { cacheManager, Constants } from '@app/shared/utils';
import { environment } from '@env/environment';

const API_CACHE_EXPIRY_HOURS: number =
  environment.apiCacheExpiryHours || Constants.DefaultApiCacheExpiryHours;

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cache = request.params.get('cache') === 'yes' ? true : false;
    const refresh = request.params.get('refresh') === 'yes' ? true : false;
    const cacheKey = request.params.get('ckey') || 'com.tekcapzule.unknown';

    // Removing cache releated request params, as it is used only for response caching purpose.
    request = request.clone({
      params: request.params.delete('cache').delete('refresh').delete('ckey'),
    });

    if (cache) {
      if (refresh) {
        return this.cacheApiResponse(request, next, cacheKey, API_CACHE_EXPIRY_HOURS);
      }

      const cachedResponseBodyWithExpiry = cacheManager.getItem(cacheKey);

      const cachedResponseBody = cachedResponseBodyWithExpiry
        ? cachedResponseBodyWithExpiry.body
        : null;

      if (cachedResponseBodyWithExpiry && Date.now() > +cachedResponseBodyWithExpiry.expiry) {
        return this.cacheApiResponse(request, next, cacheKey, API_CACHE_EXPIRY_HOURS);
      }

      if (cachedResponseBody) {
        return of(
          new HttpResponse({
            body: cachedResponseBody,
            status: 200,
          })
        );
      } else {
        return this.cacheApiResponse(request, next, cacheKey, API_CACHE_EXPIRY_HOURS);
      }
    }

    return next.handle(request);
  }

  private cacheApiResponse(
    request: HttpRequest<any>,
    next: HttpHandler,
    cacheKey: string,
    expiry: number
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(httpEvent => {
        if (httpEvent instanceof HttpResponse) {
          const current = new Date();
          current.setHours(current.getHours() + expiry);
          cacheManager.setItem(cacheKey, {
            body: httpEvent.body,
            expiry: current.getTime(),
          });
        }
      }),
      share()
    );
  }
}
