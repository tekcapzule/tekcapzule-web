import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      headers: request.headers
        .set('X-User-Login', 'linjith.kunnon@gmail.com')
        .set('X-Channel-Code', 'WEB_CLIENT'),
    });

    return next.handle(request);
  }
}
