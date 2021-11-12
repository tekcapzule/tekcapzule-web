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

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cacheKeys = new Set<string>();

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

      const cachedItemStr = window.sessionStorage.getItem(url);
      const cachedResponseBodyWithExpiry = cachedItemStr ? JSON.parse(cachedItemStr) : null;

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

  public clearCache(): void {
    this.cacheKeys.forEach(key => {
      window.sessionStorage.removeItem(key);
    });
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
            JSON.stringify({ body: httpEvent.body, expiry: current.getTime() })
          );
          this.cacheKeys.add(request.url);
        }
      }),
      share()
    );
  }
}
