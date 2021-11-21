import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AmplifyService } from 'aws-amplify-angular';
import { Hub } from 'aws-amplify';

import { Constants, sessionCacheManager } from '@app/shared/utils';
import { error } from 'console';

const idx = (p, o) => p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o);

// TODO: Need to verify this format and add additional info based on actual format.
export interface AwsUserInfo {
  username: string;
  attributes: {
    email: string;
    email_verified: boolean;
    sub: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;
  private userInfo: AwsUserInfo = null;
  private loggedInStatusChange = new BehaviorSubject(this.isLoggedIn);

  constructor(private amplify: AmplifyService) {
    this.authenticateUser();

    Hub.listen('auth', data => {
      const { payload } = data;
      this.authEventChanged(payload.event, payload.data);
    });
  }

  // TODO: Added only for dev purpose. To be removed once suser signin flow is fixed.
  private autoSigninUserForAppDevelopment(): void {
    this.isLoggedIn = true;
    this.userInfo = {
      username: 'linjith',
      attributes: {
        email: 'linjith.kunnon@gmail.com',
        email_verified: true,
        sub: 'qwerty1234567890qwerty',
      },
    };
    this.loggedInStatusChange.next(true);
  }

  private authEventChanged(authEvent: string, data: any): void {
    if (authEvent === 'signIn') {
      this.authenticateUser();
    } else if (authEvent === 'signOut') {
      this.invalidateUser();
    } else if (authEvent === 'signUp') {
      this.createUser(data);
    }
  }

  private createUser(data: any): void {
    // TODO: Create and user using userApiService.createUser() endpoint.
    // TODO: Implement userApiService.createUser().
    console.log('afterSignUp: ', data);
  }

  private invalidateUser(): void {
    this.userInfo = null;
    this.isLoggedIn = false;
    this.loggedInStatusChange.next(this.isLoggedIn);
    sessionCacheManager.removeAll();

    // TODO: Remove next line.
    this.autoSigninUserForAppDevelopment();
  }

  private authenticateUser(): void {
    this.amplify
      .auth()
      .currentAuthenticatedUser()
      .then((user: AwsUserInfo) => {
        this.userInfo = user;
        this.isLoggedIn = true;
        this.loggedInStatusChange.next(this.isLoggedIn);
      })
      .catch(e => {
        console.error('TekCapsuleAuthError: ', e);
        this.invalidateUser();
      });
  }

  private getUserGroups(): string[] {
    return idx(['signInUserSession', 'idToken', 'payload', 'cognito:groups'], this.userInfo) || [];
  }

  public onLoggedInStatusChange(): Observable<boolean> {
    return this.loggedInStatusChange.asObservable();
  }

  public getUserInfo(): AwsUserInfo {
    return this.userInfo;
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
