import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userId = request?.body?.userId ?? 'guest';

    request = request.clone({
      headers: request.headers.set('X-User-Login', userId).set('X-Channel-Code', 'WEB_CLIENT'),
    });

    return next.handle(request);
  }
}
