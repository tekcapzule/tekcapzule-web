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

import { sessionCacheManager } from '@app/shared/utils';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = request.url;
    const cache = request.params.get('cache') === 'yes' ? true : false;
    const expiry = parseInt(request.params.get('expiry'), 10);
    const refresh = request.params.get('refresh') === 'yes' ? true : false;

    if (cache) {
      if (refresh) {
        return this.cacheApiResponse(request, next, expiry);
      }

      const cachedResponseBodyWithExpiry = sessionCacheManager.getItem(url);

      const cachedResponseBody = cachedResponseBodyWithExpiry
        ? cachedResponseBodyWithExpiry.body
        : null;

      if (cachedResponseBodyWithExpiry && Date.now() > +cachedResponseBodyWithExpiry.expiry) {
        return this.cacheApiResponse(request, next, expiry);
      }

      if (cachedResponseBody) {
        return of(
          new HttpResponse({
            body: cachedResponseBody,
            status: 200,
          })
        );
      } else {
        return this.cacheApiResponse(request, next, expiry);
      }
    }

    return next.handle(request);
  }

  private cacheApiResponse(
    request: HttpRequest<any>,
    next: HttpHandler,
    expiry: number
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(httpEvent => {
        if (httpEvent instanceof HttpResponse) {
          const current = new Date();
          current.setHours(current.getHours() + expiry);
          sessionCacheManager.setItem(request.url, {
            body: httpEvent.body,
            expiry: current.getTime(),
          });
        }
      }),
      share()
    );
  }
}
