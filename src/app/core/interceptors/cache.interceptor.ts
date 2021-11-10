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
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = request.url;
    const doCache = !!request.params.get('cache');
    const expiry = parseInt(request.params.get('expiry'), 10);

    if (doCache) {
      const cachedResponseBodyStr = window.sessionStorage.getItem(url);
      const cachedResponseBody = cachedResponseBodyStr
        ? JSON.parse(cachedResponseBodyStr.split('$#$')[0])
        : null;

      if (cachedResponseBodyStr && Date.now() > +cachedResponseBodyStr.split('$#$')[1]) {
        return next.handle(request);
      }

      if (cachedResponseBody) {
        return of(
          new HttpResponse({
            body: cachedResponseBody,
            status: 200,
          })
        );
      } else {
        return next.handle(request).pipe(
          tap(httpEvent => {
            if (httpEvent instanceof HttpResponse) {
              const current = new Date();
              current.setHours(current.getHours() + expiry);
              window.sessionStorage.setItem(
                url,
                JSON.stringify(httpEvent.body) + '$#$' + current.getTime()
              );
            }
          }),
          share()
        );
      }
    }

    return next.handle(request);
  }
}
