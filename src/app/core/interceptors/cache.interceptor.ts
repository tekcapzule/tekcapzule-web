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

const EXPIRY_SEPARATOR = '###';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = request.url;
    const cache = request.params.get('cache') === 'true' ? true : false;
    const expiry = parseInt(request.params.get('expiry'), 10);

    if (cache) {
      const cachedItemStr = window.sessionStorage.getItem(url);

      const cachedResponseBodyWithExpiry: string[] = cachedItemStr
        ? cachedItemStr.split(EXPIRY_SEPARATOR)
        : null;

      const cachedResponseBody = cachedResponseBodyWithExpiry
        ? JSON.parse(cachedResponseBodyWithExpiry[0])
        : null;

      if (cachedResponseBodyWithExpiry && Date.now() > +cachedResponseBodyWithExpiry[1]) {
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
          window.sessionStorage.setItem(
            request.url,
            JSON.stringify(httpEvent.body) + EXPIRY_SEPARATOR + current.getTime()
          );
        }
      }),
      share()
    );
  }
}
