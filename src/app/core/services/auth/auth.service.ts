import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Amplify, Auth, I18n } from 'aws-amplify';
import { Hub } from 'aws-amplify';

import { Constants } from '@app/shared/utils';
import { UserApiService } from '@app/core/services/user-api/user-api.service';
import { TekUserInfoImpl } from '@app/shared/models';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Router } from '@angular/router';

const idx = (p, o) => p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o);

export interface AwsUserInfo {
  username: string;
  attributes: {
    email: string;
    email_verified: boolean;
    phone_number: string;
    phone_number_verified: boolean;
    sub: string;
  };
  signInUserSession: {
    accessToken: {
      jwtToken: string;
      payload: {
        'cognito:groups': string[];
      };
    };
    idToken: {
      jwtToken: string;
      payload: {
        'cognito:groups': string[];
      };
    };
    refreshToken: {
      token: string;
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;
  private awsUserInfo: AwsUserInfo = null;
  private loggedInStatusChange$ = new BehaviorSubject<boolean>(this.isLoggedIn);
  private signInErrorChange$ = new BehaviorSubject<string>('');

  constructor(
    private amplify: AuthenticatorService,
    private userApi: UserApiService,
    private router: Router
  ) {
    this.authenticateUser();
    Hub.listen('auth', data => {
      const { payload } = data;
      this.authEventChanged(payload.event, payload.data);
    });
  }

  private authEventChanged(authEvent: string, authData: any): void {
    console.log('authEventChanged --->> ', authEvent, authData);
    if (authEvent === 'signIn') {
      this.authenticateUser();
      this.router.navigate(['/']);
    } else if (authEvent === 'signOut') {
      this.invalidateUser();
    } else if (authEvent === 'signIn_failure') {
      this.handleSignInFailure(authData);
    }
  }

  private handleSignInFailure(data: any): void {
    this.signInErrorChange$.next(data.message || 'Signin failed');
  }

  private createUserIfDoesNotExist(user: AwsUserInfo): void {
    if (!this.userApi.isTekUserInfoCacheExists()) {
      const newUserInfo = new TekUserInfoImpl(
        user.username,
        user.attributes.email,
        user.attributes.phone_number
      );

      this.userApi.updateTekUserInfoCache(newUserInfo);
      this.userApi.createTekUserInfo(newUserInfo).subscribe();
      // this.userApi
      //   .getTekUserInfo(user.username, true)
      //   .pipe(catchError(() => this.userApi.createTekUserInfo(newUserInfo)))
      //   .subscribe();
    }
    // else {
    //   this.userApi.getTekUserInfo(user.username, true).subscribe();
    // }
  }

  private invalidateUser(): void {
    this.awsUserInfo = null;
    this.isLoggedIn = false;
    this.loggedInStatusChange$.next(this.isLoggedIn);
    this.signInErrorChange$.next('');
    this.userApi.deleteTekUserInfoCache();
  }

  private authenticateUser(): void {
    Auth.currentAuthenticatedUser()
      .then((user: any) => {
        this.awsUserInfo = user;
        this.isLoggedIn = true;
        this.loggedInStatusChange$.next(this.isLoggedIn);
        this.signInErrorChange$.next('');
        this.createUserIfDoesNotExist(user);
        if (this.router.url.includes('auth')) {
          this.router.navigate(['/']);
        }
      })
      .catch(error => {
        console.log('error --- ', error);
        this.invalidateUser();
      });
  }

  private getUserGroups(): string[] {
    return (
      idx(['signInUserSession', 'idToken', 'payload', 'cognito:groups'], this.awsUserInfo) || []
    );
  }

  public onLoggedInStatusChange(): Observable<boolean> {
    return this.loggedInStatusChange$.asObservable();
  }

  public onSignInErrorChange(): Observable<string> {
    return this.signInErrorChange$.asObservable();
  }

  public getAwsUserInfo(): AwsUserInfo {
    return this.awsUserInfo;
  }

  public isUserLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  public signOutUser(): void {
    Auth.signOut()
      .then(data => {
        this.routeToSingIn();
      })
      .catch(error => {
        console.log('signOutUser error ------', error);
        this.routeToSingIn();
      });
  }

  public isAdminUser(): boolean {
    return this.getUserGroups().includes(Constants.AdminUserGroup);
  }

  private routeToSingIn() {
    if (!this.router.url.includes('auth')) {
      this.router.navigate(['auth/signin']);
    }
  }
}
