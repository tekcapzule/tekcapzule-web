import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userId = this.auth.isUserLoggedIn() ? this.auth.getUserInfo().username : 'guest';

    request = request.clone({
      headers: request.headers.set('X-User-Login', userId).set('X-Channel-Code', 'WEB_CLIENT'),
    });

    return next.handle(request);
  }
}
