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
    const doCache = request.body?.cache;

    // if (doCache) {
    //   const cachedResponseStr = window.sessionStorage.getItem(url);
    //   const cachedResponse = JSON.parse(cachedResponseStr);

    //   if (cachedResponse) {
    //     return of(cachedResponse);
    //   } else {
    //     return next.handle(request).pipe(
    //       tap(httpEvent => {
    //         if (httpEvent instanceof HttpResponse) {
    //           window.sessionStorage.setItem(url, JSON.stringify(httpEvent));
    //         }
    //       }),
    //       share()
    //     );
    //   }
    // }

    return next.handle(request);
  }
}
