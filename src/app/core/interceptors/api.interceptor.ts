import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userInfo = this.auth.isUserLoggedIn() ? this.auth.getAwsUserInfo() : null;
    const loggedInUserName = userInfo ? userInfo.username : 'linjith.kunnon@gmail.com';
    const authToken = userInfo ? userInfo?.signInUserSession?.accessToken?.jwtToken : null;
    //console.log(' --------------   ', loggedInUserName, authToken);

    request = request.clone({
      headers: request.headers
        .set('X-User-Login', loggedInUserName)
        .set('X-Channel-Code', 'WEB_CLIENT'),
    });

    if (this.auth.isUserLoggedIn() && authToken) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${authToken}`),
      });
    }

    return next.handle(request);
  }
}
