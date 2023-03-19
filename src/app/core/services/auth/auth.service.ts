import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AmplifyService } from 'aws-amplify-angular';
import { Hub } from 'aws-amplify';
import { catchError } from 'rxjs/operators';

import { Constants } from '@app/shared/utils';
import { UserApiService } from '@app/core/services/user-api/user-api.service';
import { TekUserInfoImpl } from '@app/shared/models';

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

  constructor(private amplify: AmplifyService, private userApi: UserApiService) {
    this.authenticateUser();

    Hub.listen('auth', data => {
      const { payload } = data;
      this.authEventChanged(payload.event, payload.data);
    });
  }

  private authEventChanged(authEvent: string, authData: any): void {
    if (authEvent === 'signIn') {
      this.authenticateUser();
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
    this.amplify
      .auth()
      .currentAuthenticatedUser()
      .then((user: AwsUserInfo) => {
        this.awsUserInfo = user;
        this.isLoggedIn = true;
        this.loggedInStatusChange$.next(this.isLoggedIn);
        this.signInErrorChange$.next('');
        this.createUserIfDoesNotExist(user);
      })
      .catch(() => {
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
    this.amplify.auth().signOut();
  }

  public isAdminUser(): boolean {
    return this.getUserGroups().includes(Constants.AdminUserGroup);
  }
}
