import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthStateService } from '../services/app-state/auth-state.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private authState: AuthStateService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isUserLoggedIn = this.authState.isUserLoggedIn();
    const awsUserInfo = this.authState.getAwsUserInfo();
    const accessToken = this.authState.getAccessToken();

    const userInfo = isUserLoggedIn ? awsUserInfo : null;
    const loggedInUserName = userInfo ? userInfo.username || userInfo.email : 'guest';

    request = request.clone({
      headers: request.headers
        .set('x-user-login', loggedInUserName)
        .set('x-channel-code', 'WEB_CLIENT'),
    });

    if (isUserLoggedIn && accessToken) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${accessToken}`),
      });
    }

    return next.handle(request);
  }
}
